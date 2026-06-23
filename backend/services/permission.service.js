import { Permission } from '../models/Permision.js';
import { Op } from 'sequelize';
import AppError from '../utils/appError.js';

export const getPermissionsSrv = async (actionsList, idList) => {
  
  if (Array.isArray(idList) && idList.length === 0) {
    return [];
  }
  
  let permissions = [];

  if (idList && idList.length) {
    permissions = await Permission.findAll({ where: { id: { [Op.in]: idList } } })
    if (permissions.length !== idList.length) throw new AppError('Ciertos permisos indicados no existen.', 404)
  } else if (actionsList && actionsList.length) {
    permissions = await Permission.findAll({ where: { action: { [Op.in]: actionsList } } })
    if (permissions.length !== actionsList.length) throw new AppError('Ciertos permisos indicados no existen.', 404)
  } else {
    permissions = await Permission.findAll();
  }

  if (!permissions || !permissions.length) throw new AppError('No se han encontrado permisos', 404);

  return permissions;
};

export const getPermissionSrv = async (id) => {
  const permission = await Permission.findByPk(id);
  if (!permission) throw new AppError('No se ha encontrado el permiso', 404);
  return permission;
};

export const deletePermissionSrv = async (id) => {
  const permission = await Permission.destroy({ where: { id } });
  if (!permission) throw new AppError('No se ha podido eliminar el permiso', 400);
  return permission;
};

export const updatePermissionSrv = async (id, action) => {
  const permission = await Permission.update({ action }, { where: { id } });
  if (!permission) throw new AppError('No se ha podido actualizar el permiso', 400);
  return permission;
};

export const createPermissionSrv = async (action) => {
  const permission = await Permission.create({ action });
  if (!permission) throw new AppError('No se ha podido crear', 400);
  return permission;
};

export const checkExistsPermissionSrv = async (action) => {
  const permission = await Permission.findOne({ where: { action } });
  return permission ? true : false;
}
