import ApiResponse from "../handlers/response.js";
import { getUsersSrv, getUserByIdSrv, updateUserSrv, removeDeletedAtUserSrv, addDeletedAtUserSrv, createAdminSrv } from "../services/users.service.js";

export const getMeCtrl = async (req, res) => {
  const response = new ApiResponse(res);

  const user = req.user;
  return response.ok("Usuario obtenido", user);
};

export const getUserCtrl = async (req, res) => {
  const response = new ApiResponse(res);

  const { id } = req.params;
  const user = await getUserByIdSrv(id);

  return response.ok("Usuario obtenido", user);
};

export const getUsersCtrl = async (req, res) => {
  const response = new ApiResponse(res);

  let { page, limit } = req.query;
  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  const offset = (page - 1) * limit;

  const data = await getUsersSrv(offset, limit);

  return response.ok("Datos obtenidos:", data);
};

export const updateUserCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  
  const id = req.user.id
  const data = req.body

  await updateUserSrv(id, data);

  response.ok("Ha sido actualizado correctamente")
};

export const reactivateUserCtrl = async (req, res) => {
  const response= new ApiResponse(res);
  const id= req.user.id;
  
  await removeDeletedAtUserSrv(id);
  response.ok("Tu cuenta fue reactivada correctamente");
};

export const deleteUserCtrl= async (req, res)=>{
  const response = new ApiResponse(res);

  const id = req.user.id
  await addDeletedAtUserSrv(id)

  response.ok("Tu cuenta fue eliminada correctamente")
}

export const deleteUserByIdCtrl = async (req, res) => {
  const response = new ApiResponse(res);

  const { id } = req.params;
  await addDeletedAtUserSrv(id);

  response.ok("Usuario eliminado correctamente");
}

export const createAdminCtrl = async (req, res) => {
  const response = new ApiResponse(res);

  const { full_name, email, password, phone } = req.body;

  try {
    const user = await createAdminSrv({ full_name, email, password, phone });
    response.created("Administrador creado", user);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
}