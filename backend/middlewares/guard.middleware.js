import ApiResponse from "../handlers/response.js";
import { getPermissionsSrv } from "../services/permission.service.js";

export const validateAccessMiddleware = (requiredPermissions) => {
    return async (req, res, next) => {
        const response = new ApiResponse(res);

        try {
            if (!requiredPermissions || !requiredPermissions.length) throw new Error('No se recibieron permisos');

            await getPermissionsSrv([], requiredPermissions);

            const user = req.user;
            
            const contain = requiredPermissions.every(reqPer => user.permissions.includes(reqPer));

            if (!contain) response.unauthorized('Acceso denegado')

            next();
        } catch (error) {
            console.error(error.message);
            if (error.statusCode === 404) return response.notFound(error.message);
            return response.error(error.message);
        }
    }
}