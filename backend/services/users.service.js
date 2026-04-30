import { User } from "../models/User.js";
import AppError from "../utils/appError.js";
import { comparePassword, hashedPassword } from "../utils/bcrypt.js";

export const getUsersSrv = async (offset, limit) => {
  const { count: total, rows: usersDB } = await User.findAndCountAll({
    offset,
    limit,
  });

  if (!total || !usersDB)
    throw new AppError("No se encontraron usuarios.", 404);

  return {
    total,
    users: usersDB.map((user) => {
      const { password, ...userWithoutPassword } = user.dataValues;
      return userWithoutPassword;
    }),
  };
};

export const updateUserSrv = async (id, data) => {
  const { full_name, email, phone, avatar, password: passwordBody } = data;

  const user = await User.findOne({ where: { id } });

  let updatedUser = {};

  if (passwordBody) {
    const isEqual = await comparePassword(passwordBody, user.dataValues.password);

    if (isEqual) throw new AppError("La contrasenia es igual a la que tenias");

    updatedUser = User.update(
      {
        full_name,
        email,
        phone,
        avatar,
        password: await hashedPassword(passwordBody),
      },
      { where: { id } },
    );
  } else {
    updatedUser = User.update(
      {
        full_name,
        email,
        phone,
        avatar,
      },
      { where: { id } },
    );
  }

  if (!updatedUser) throw new AppError("No se pudo actualizar el usuario");

  return updatedUser;
};

// activar al usuario
export const updateDeletedAtUserSrv = async (id) => {
  return await User.update({ deleted_at: null }, { where: { id } });
};
