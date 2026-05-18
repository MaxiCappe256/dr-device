import ApiResponse from "../handlers/response.js";
import {
    createSpecializationSrv,
    updateSpecializationSrv,
} from "../services/specializations.service.js";
import { getCategoriesSrv } from "../services/categories.service.js";

export const createSpecializationCtrl = async (req, res) => {
    const response = new ApiResponse(res);
    const { categories } = req.body;
    const user_id = req.user.id;

    try {
        const categoriesList = await getCategoriesSrv(categories);
        const specializations = await createSpecializationSrv({ user_id, categoriesList });
        response.ok('Especializaciones creadas', specializations);
    } catch (error) {
        console.error(error.message)
        if (error.statusCode === 404) return response.notFound(error.message)
        return response.error(error.message)
    }
};

export const updateSpecializationCtrl = async (req, res) => {
    const response = new ApiResponse(res);
    const { categories } = req.body;
    const user_id = req.user.id;

    try {
        const categoriesList = await getCategoriesSrv(categories);
        const specializations = await updateSpecializationSrv({ user_id, categoriesList });
        response.ok('Especializaciones actualizadas', specializations);
    } catch (error) {
        console.error(error.message)
        if (error.statusCode === 404) return response.notFound(error.message)
        return response.error(error.message)
    }
};

