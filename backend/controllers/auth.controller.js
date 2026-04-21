import ApiResponse from '../handlers/response.js';
import { registerSrv, loginSrv } from '../services/auth.service.js';

export const registerCtrl = async (req, res) => {
    const response = new ApiResponse(res);
    
    try {
        const user = await registerSrv(req.body)
        response.created("El registro fue exitoso.", user)
    } catch (error) {
        console.error(error.message)
        if(error.statusCode === 400) return response.badRequest(error.message)
        if(error.statusCode === 404) return response.notFound(error.message)
        return response.error(error.message)
    }
}

export const loginCtrl = async (req, res) => {
    const response = new ApiResponse(res);

    try {
        const user = await loginSrv(req.body)

    } catch (error) {
        response.error(error.message)
    }
}

export const logoutCtrl = (req, res) => {

}