import ApiResponse from "../handlers/response.js";
import { getCategorySrv } from "../services/categories.service.js";
import { createOrderSrv } from "../services/order.service.js";

export const createOrderCtrl = async (req, res) => {
    const response = new ApiResponse(res);
    const { category_id, description } = req.body;
    const user_id = req.user.id;
    try {
        await getCategorySrv(category_id)
        const createdOrder= await createOrderSrv({category_id,description,user_id})
        response.ok('Orden creada',createdOrder)
    } catch (error) {
        console.error(error.message)
        if (error.statusCode === 404) return response.notFound(error.message)
        return response.error(error.message)
    }
};