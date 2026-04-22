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

export const createRoleSrv = async (title) => {
  const role = await Role.create({ title });
  if (!role) throw new AppError('No se ha podido crear', 400);
  return role;
};
