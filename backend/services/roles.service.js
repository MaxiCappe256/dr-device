import { Op } from 'sequelize';
import sequelize from '../db/index.js';
import { Permission } from '../models/Permision.js';
import { Role } from '../models/Role.js';
import AppError from '../utils/appError.js';

export const getRolesSrv = async (idList, titleList) => {
  let roles;

  if (idList && idList.length) {
    roles = await Role.findAll({
      include: {
        model: Permission,
        as: 'permissions',
        attributes: ['id'],
        through: { attributes: [] },
        required: true // INNER JOIN
      },
      where: { id: { [Op.in]: idList } }
    })
    if (roles.length !== idList.length) throw new AppError('Ciertos roles indicados no existen.', 404)
  } else if (titleList && titleList.length) {
    roles = await Role.findAll({
      include: {
        model: Permission,
        as: 'permissions',
        attributes: ['id'],
        through: { attributes: [] },
        required: true // INNER JOIN
      },
      where: { title: { [Op.in]: titleList } }
    })
    if (roles.length !== titleList.length) throw new AppError('Ciertos roles indicados no existen.', 404)
  } else {
    roles = await Role.findAll({
      include: {
        model: Permission,
        as: 'permissions',
        attributes: ['id'],
        through: { attributes: [] },
        required: true // INNER JOIN
      }
    });
  }

  if (!roles) throw new AppError('No se han encontrado roles', 404);
  return roles;
};

export const getRoleSrv = async (id) => {
  const role = await Role.findOne({
    where: { id }, include: {
      model: Permission,
      as: 'permissions',
      attributes: ['id'],
      through: { attributes: [] },
      required: true // INNER JOIN
    },
  });
  if (!role) throw new AppError('No se ha encontrado el rol', 404);
  return role;
};

export const deleteRoleSrv = async (id) => {
  const role = await Role.destroy({ where: { id } });
  if (!role) throw new AppError('No se ha podido eliminar el rol', 400);
  return role;
};

export const updateRoleSrv = async ({ id, title, permissionsList }) => {
  const t = await sequelize.transaction();
  try {
    if (title !== undefined) {
      const [updatedRows] = await Role.update(
        { title },
        { where: { id }, transaction: t }
      );

      if (!updatedRows) throw new AppError('No se ha podido actualizar el rol', 400);
    }

    const role = await Role.findByPk(id, { transaction: t });

    if (!role) throw new AppError('Rol no encontrado', 404);

    if (permissionsList !== undefined) {
      await role.setPermissions(permissionsList, { transaction: t });
    }

    await t.commit();

    return await Role.findByPk(id, {
      include: {
        model: Permission,
        as: 'permissions',
        attributes: ['id', 'action'],
        through: { attributes: [] },
      },
    });
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const createRoleSrv = async ({ title, permissionsList }) => {
  // action = crear y eliminar = ["offer:create", "offer:delete"] 
  const t = await sequelize.transaction();

  try {
    const role = await Role.create({ title }, { transaction: t });
    if (!role) throw new AppError('No se ha podido crear', 400);

    await role.addPermissions(permissionsList, { transaction: t });
    await t.commit();

    return role;
  } catch (error) {
    console.error(error);
    await t.rollback();
    throw error;
  }
};

export const checkExistsRoleSrv = async (title) => {
  if (!title) {
    return false;
  }
  const role = await Role.findOne({ where: { title } });
  return role ? true : false;
}