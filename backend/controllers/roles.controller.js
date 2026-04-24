import ApiResponse from '../handlers/response.js';
import {
  getRolesSrv,
  getRoleSrv,
  deleteRoleSrv,
  updateRoleSrv,
  createRoleSrv,
} from '../services/roles.service.js';

export const getRolesCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  try {
    const roles = await getRolesSrv();
    response.ok('Roles encontrados', roles);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const getRoleCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  try {
    const role = await getRoleSrv(req.params.id);
    response.ok('Rol encontrado', role);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const deleteRoleCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { id } = req.params;
  try {
    await getRoleSrv(id);

    await deleteRoleSrv(id);
    response.noContent('Rol eliminado');
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const updateRoleCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { title } = req.body;
  const { id } = req.params;
  try {
    await getRoleSrv(id);

    await updateRoleSrv(id, title);
    response.noContent('Rol actualizado', `Rol: ${title} actualizado`);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const createRoleCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { title, actions } = req.body;
  try {
    const data = await createRoleSrv(title, actions);
    response.created('Rol creado', data);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    return response.error(error.message);
  }
};
