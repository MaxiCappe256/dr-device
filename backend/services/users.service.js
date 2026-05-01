import { User } from "../models/User.js";
import AppError from "../utils/appError.js";
import { Op, Sequelize } from "sequelize";
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
export const removeDeletedAtUserSrv = async (id) => {
  const [affectedRows] = await User.update({ deleted_at: null }, { where: { id, deleted_at: { [Op.ne]: null } } });
  if (!affectedRows) throw new AppError("El usuario ya se encuentra activo")
  return affectedRows;
};

export const addDeletedAtUserSrv = async (id) => {

  const [affectedRows] = await User.update(
    { deleted_at: Sequelize.fn('NOW') },
    { where: { id, deleted_at: { [Op.eq]: null } } },
  );
  if (!affectedRows) throw new AppError("El usuario ya se elimino")
  return affectedRows

};
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
export const massiveDeleteUserSrv = async (batchSize, dayElapsed) => {
  // a la fecha actual le restamos 30 dias
  const currentDate = new Date();
  const dateLimit = new Date(currentDate.getTime() - (1440 * dayElapsed) * 60 * 1000);

  let deleted=0;
  do {
    deleted = await User.destroy({
      where: {
        deleted_at: {
          [Op.lte]: dateLimit
        }
      },
      limit: batchSize
    });
    await sleep(200)
  } while (deleted === batchSize);

}
