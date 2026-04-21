import { verifyToken } from "../utils/jwt.js";
import config from "../config/index.js";
import { User } from "../models/User.js";
import ApiResponse from "../handlers/response.js";

export const authMiddleware = async (req, res, next) => {
    const response = new ApiResponse(res);
    try {
        const accessToken = req.cookies[config.cookie_name_session];

        const isValid = await verifyToken(accessToken);
        if (!isValid) return response.unauthorized("Usuario no autorizado")

        const userFound = await User.findByPk(isValid.id)
        if (!userFound) return response.notFound("Usuario no encontrado")

        next();
    } catch (error) {
        console.error(error.message)
        if (error.statusCode === 401) return response.unauthorized(error.message)
        return response.error(error.message)
    }
}