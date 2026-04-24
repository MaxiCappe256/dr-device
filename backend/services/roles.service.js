import sequelize from '../db/index.js';
import { Permission } from '../models/Permision.js';
import { Role } from '../models/Role.js';
import AppError from '../utils/appError.js';

export const getRolesSrv = async () => {
  const roles = await Role.findAll();
  if (!roles) throw new AppError('No se han encontrado roles', 404);
  return roles;
};

export const getRoleSrv = async (id) => {
  const role = await Role.findByPk(id);
  if (!role) throw new AppError('No se ha encontrado el rol', 404);
  return role;
};

export const deleteRoleSrv = async (id) => {
  const role = await Role.destroy({ where: { id } });
  if (!role) throw new AppError('No se ha podido eliminar el rol', 400);
  return role;
};

export const updateRoleSrv = async (id, title) => {
  const role = await Role.update({ title }, { where: { id } });
  if (!role) throw new AppError('No se ha podido actualizar el rol', 400);
  return role;
};

export const createRoleSrv = async (title, actions) => {
  // action = crear y eliminar = [create, eliminar]
  const transaction = await sequelize.transaction();

  try {
    const role = await Role.create({ title }, { transaction });

    if (!role) throw new AppError('No se ha podido crear', 400);

    const permissions = await Permission.findAll({
      where: { action: actions },
      transaction,
    });

    if (!permissions.length)
      throw new AppError('No se encontraron permisos', 404);

    if (permissions.length !== actions.length)
      throw new AppError('Alguno de los permisos no existe', 400);

    await role.addPermissions(permissions, { transaction });

    // revisar
    const roleWithPermissions = await Role.findByPk(role.id, {
      include: {
        model: Permission,
        as: 'permissions',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
      transaction: t,
    });

    await transaction.commit();

    return roleWithPermissions;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
  }
};
