import ApiResponse from "../handlers/response.js";
import { getUsersSrv, updateUserSrv } from "../services/users.service.js";

export const getMeCtrl = async (req, res) => {
  const response = new ApiResponse(res);

  const user = req.user;
  return response.ok("Usuario obtenido", user);
};

export const getUsersCtrl = async (req, res) => {
  const response = new ApiResponse(res);

  let { page, limit } = req.query;
  limit = limit ? limit : 10;
  const offset = (page - 1) * limit;

  console.log('limit',limit)
  console.log("offset",offset)

  const data = await getUsersSrv(offset, limit);

  return response.ok("OK", data);
};

export const updateUserCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  
  const id = req.user.id
  const data = req.body

  await updateUserSrv(id, data);

  response.ok("OK!!")
};
export const deleteCtrl = async (req, res) => {
  const user = req.user;
};
