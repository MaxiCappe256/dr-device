import ApiResponse from "../handlers/response.js";
import { getUsersSrv, getUserByIdSrv, updateUserSrv, removeDeletedAtUserSrv, addDeletedAtUserSrv } from "../services/users.service.js";

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
  limit = limit ? limit : 10;
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