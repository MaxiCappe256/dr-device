import ApiResponse from '../handlers/response.js';
import { registerSrv, loginSrv } from '../services/auth.service.js';
import config from '../config/index.js';

export const registerCtrl = async (req, res) => {
    const response = new ApiResponse(res);

    try {
        const data = await registerSrv(req.body)

        res.cookie(config.cookie_name_session, data.token, {
            httpOnly: true,
            secure: config.mode === 'production' ? true : false,
            sameSite: 'lax', // Permite enviarse a una peticion externa al backend teniendo en cuenta que se posee el mismo dominio
            maxAge: 86400000
        })
        response.created("El registro fue exitoso.", data)
    } catch (error) {
        console.error(error.message)
        if (error.statusCode === 400) return response.badRequest(error.message)
        if (error.statusCode === 404) return response.notFound(error.message)
        return response.error(error.message)
    }
}

export const loginCtrl = async (req, res) => {
    const response = new ApiResponse(res);

    try {
        const { token, ...data } = await loginSrv(req.body)

        res.cookie(config.cookie_name_session, token, {
            httpOnly: true,
            secure: config.mode === 'production' ? true : false,
            sameSite: 'lax',
            maxAge: 86400000
        })

        response.ok("Sesion iniciada correctamente", data)
    } catch (error) {
        console.error(error.message)
        if (error.statusCode === 401) return response.unauthorized(error.message)
        return response.error(error.message)
    }
}

export const logoutCtrl = (req, res) => {
    const response = new ApiResponse(res);
    res.clearCookie(config.cookie_name_session);
    response.ok("Sesión cerrada")
}