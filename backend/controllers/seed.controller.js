import config from "../config/index.js";
import ApiResponse from "../handlers/response.js";
import { clearDBSrv, executeSrv } from "../services/seed.service.js";

export const executeCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  if (config.mode === "production")
    return response.unauthorized("No es posible utilizar esta funcionalidad.");

  try {
    await clearDBSrv();
    
    const data = await executeSrv();
    return response.ok("Seed ejecutado correctamente.", data);
  } catch (error) {
    return response.error(error.message);
  }
};
