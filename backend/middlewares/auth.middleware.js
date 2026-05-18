import { verifyToken } from "../utils/jwt.js";
import config from "../config/index.js";
import { User } from "../models/User.js";
import ApiResponse from "../handlers/response.js";

export const authMiddleware = async (req, res, next) => {
  const response = new ApiResponse(res);
  try {
    const accessToken = req.cookies[config.cookie_name_session];

    const isValid = await verifyToken(accessToken);

    if (!isValid) return response.unauthorized("Usuario no autorizado");

    const userFound = await User.findByPk(isValid.id);

    if (!userFound || userFound.dataValues.deleted_at !== null)
      return response.notFound("Usuario no encontrado");

    const { password, ...userWithoutPassword } = userFound.dataValues;
    const roles = await userFound.getRoles();

    const permissionsByRole = await Promise.all(
      roles.map((role) => role.getPermissions()),
    );

    const permissions = [
      ...new Set(permissionsByRole.flat().map((p) => ({
        id: p.id,
        action: p.action,
      }))),
    ];

    const specializations = await userFound.getCategories();

    req.user = {
      ...userWithoutPassword,
      roles: roles.map((role) => ({
        id: role.id,
        title: role.title,
      })),
      permissions,
      specializations: specializations.map((spe) => ({
        id: spe.id,
        name: spe.name,
      })),
    };

    next();
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 401) return response.unauthorized(error.message);
    return response.error(error.message);
  }
};
