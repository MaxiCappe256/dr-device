import { User } from "../models/User.js";
import { RoleUser } from "../models/RoleUser.js";
import { Role } from "../models/Role.js";
import AppError from "../utils/appError.js";
import { createToken } from "../utils/jwt.js";
import { comparePassword, hashedPassword } from "../utils/bcrypt.js";
import { removeDeletedAtUserSrv, updateUserSrv } from "./users.service.js";

export const registerSrv = async (body) => {
  const validRoles = ["technician", "user"];

  const {
    full_name,
    email,
    password: passwordBody,
    phone,
    role_id,
  } = body;

  const userExists = await User.findOne({ where: { email } });

  if (userExists)
    throw new AppError("El correo electrónico ya está registrado.", 400);

  const role = await Role.findOne({ where: { id: role_id } });

  if (!role) throw new AppError("El rol ingresado no es válido.", 404);

  // le hacemos la psicologica! ingenieria inversa. LA DOBLE NELSON EN EL 92'
  if (!validRoles.includes(role.dataValues.title))
    throw new AppError("El rol ingresado no es válido.", 404);

  const { password: _, ...user } = (
    await User.create({
      full_name,
      email,
      password: await hashedPassword(passwordBody),
      phone,
    })
  ).dataValues;

  await RoleUser.create({ user_id: user.id, role_id: role.dataValues.id });

  const valueRoles = await RoleUser.findAll({
    where: { user_id: user.id },
    include: [
      {
        model: Role,
        attributes: ["title"],
      },
    ],
  });

  const rolesTitle = await Promise.all(
    valueRoles.map(async (rol) => {
      const data = await rol.dataValues.Role;
      return data.dataValues.title;
    }),
  );

  const payload = {
    id: user.id,
    roles: rolesTitle,
  };

  const token = await createToken(payload, "1d");

  return {
    ...user,
    roles: rolesTitle,
    token,
  };
};

export const changePasswordSrv = async (user_id, current_password, new_password) => {
  const user = await User.findByPk(user_id);
  if (!user) throw new AppError("Usuario no encontrado.", 404);

  const isValid = comparePassword(current_password, user.password);
  if (!isValid) throw new AppError("La contraseña actual no es correcta.", 400);

  const isSame = comparePassword(new_password, user.password);
  if (isSame) throw new AppError("La nueva contraseña no puede ser igual a la actual.", 400);

  await User.update(
    { password: await hashedPassword(new_password) },
    { where: { id: user_id } }
  );
};

export const loginSrv = async (body) => {
  const { email, password: originalPassword } = body;

  const userExists = await User.findOne({ where: { email } });

  if (!userExists) throw new AppError("Las crendenciales no coinciden.", 401);

  if (userExists.dataValues.deleted_at !== null) await removeDeletedAtUserSrv(userExists.dataValues.id);
 
  // verificar que la contraseña es valida, comparando la encriptada con la ingresada
  const isValidPassword = comparePassword(
    originalPassword,
    userExists.password,
  );

  if (!isValidPassword)
    throw new AppError("Las crendenciales no coinciden.", 401);

  const { password: _, ...userWithoutPassword } = userExists.dataValues;
  const valueRoles = await RoleUser.findAll({
    where: { user_id: userWithoutPassword.id },
    include: [
      {
        model: Role,
        attributes: ["title"],
      },
    ],
  });
  const rolesTitle = await Promise.all(
    valueRoles.map(async (rol) => {
      const data = await rol.dataValues.Role;
      return data.dataValues.title;
    }),
  );
  const payload = {
    id: userWithoutPassword.id,
    roles: rolesTitle,
  };

  const token = await createToken(payload, "1d");

  return {
    ...userWithoutPassword,
    roles: rolesTitle,
    token,
  };
};
