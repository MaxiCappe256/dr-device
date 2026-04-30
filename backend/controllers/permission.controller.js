import ApiResponse from '../handlers/response.js';
import { getPermissionSrv, getPermissionsSrv, updatePermissionSrv, deletePermissionSrv, checkExistsPermissionSrv, createPermissionSrv } from '../services/permission.service.js';

export const getPermissionsCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  try {
    const getPermissions = await getPermissionsSrv();
    response.ok('Permisos encontrados', getPermissions);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const getPermissionCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  try {
    const permission = await getPermissionSrv(req.params.id);
    response.ok('Permiso encontrado', permission);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const deletePermissionCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { id } = req.params;
  try {
    await getPermissionSrv(id);

    await deletePermissionSrv(id);

    response.noContent();
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const updatePermissionCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { action } = req.body;
  const { id } = req.params;
  try {
    await getPermissionSrv(id);
    const existsPermission = await checkExistsPermissionSrv(action)
    if(existsPermission) return response.conflict('El permiso ya se encuentra registrado.') 
    await updatePermissionSrv(id, action);
    response.ok('Permiso actualizado');
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const createPermissionCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { action } = req.body;
  try {
    const existsPermission = await checkExistsPermissionSrv(action)
    if(existsPermission) return response.conflict('El permiso ya se encuentra registrado.') 
    const data = await createPermissionSrv(action);
    response.created('Permiso creado', data);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};
