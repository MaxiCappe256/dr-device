import ApiResponse from '../handlers/response.js';
import { getRolesSrv, getRoleSrv, deleteRoleSrv, updateRoleSrv, createRoleSrv, checkExistsRoleSrv } from '../services/roles.service.js';
import { getPermissionsSrv } from '../services/permission.service.js';

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
  const { title, permissions } = req.body;
  const { id } = req.params;
  try {
    await getRoleSrv(id);
    const permissionsList = await getPermissionsSrv(permissions, [])
    const existsRole = await checkExistsRoleSrv(title)
    if(existsRole) return response.conflict('El Rol con ese título ya se encuentra registrado.') 
    const updatedRole = await updateRoleSrv({ id, title, permissionsList });
    response.ok('Rol actualizado', updatedRole);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const createRoleCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { title, permissions } = req.body;
  try {
    const permissionsList = await getPermissionsSrv(permissions);
    const existsRole = await checkExistsRoleSrv(title);
    if(existsRole) return response.conflict('El Rol con ese título ya se encuentra registrado.') 
    const data = await createRoleSrv({ title, permissionsList });
    response.created('Rol creado', data);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};
