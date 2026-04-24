import { Permission } from '../models/Permision.js';
import AppError from '../utils/appError.js';

export const getPermissionsSrv = async () => {
  const permissions = await Permission.findAll();
  if (!permissions) throw new AppError('No se han encontrado permisos', 404);
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

export const updatePermissionSrv = async (id, title) => {
  const permission = await Permission.update({ title }, { where: { id } });
  if (!permission) throw new AppError('No se ha podido actualizar el permiso', 400);
  return permission;
};

export const createPermissionSrv = async (title) => {
  const permission = await Permission.create({ title });
  if (!permission) throw new AppError('No se ha podido crear', 400);
  return permission;

  // guardar el permiso DE ESE ROL QUE SE CREO
  
};
