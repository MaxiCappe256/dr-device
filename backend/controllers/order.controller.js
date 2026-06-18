import ApiResponse from "../handlers/response.js";
import { getCategorySrv } from "../services/categories.service.js";
import {
  changeStatusOrderSrv,
  createOrderSrv,
  getOrderSrv,
  getOrdersByUserSrv,
  getOrdersPerUserSrv,
  isOrderOwnerSrv,
  isTechnicianOwnerSrv,
} from "../services/order.service.js";
import AppError from "../utils/appError.js";

export const createOrderCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { category_id, description, title } = req.body;
  const user_id = req.user.id;
  try {
    await getCategorySrv(category_id);
    const createdOrder = await createOrderSrv({
      category_id,
      description,
      title,
      user_id,
    });
    response.ok("Orden creada", createdOrder);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const cancelOrderCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { id: order_id } = req.params;
  const user_id = req.user.id;

  try {
    // ademas de verificar si existe esa orden tambien verifica que le pertenezca a ese usuario.
    const order = await isOrderOwnerSrv(user_id, order_id);
    // verificar que no este en el estado que no este cancelada.

    if (order.status === "CANCELLED")
      throw new AppError("La orden ya se encuentra cancelada", 400);

    // verificar que no este en el estado que no este cancelada.
    if (order.status === "COMPLETED")
      throw new AppError("La orden ya se encuentra terminada", 400);

    await changeStatusOrderSrv(order_id, "CANCELLED");

    response.ok("Orden cancelada correctamente");
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 401) return response.unauthorized(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const finishOrderCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { id: order_id } = req.params;
  const user_id = req.user.id;

  try {
    // ademas de verificar si existe esa orden tambien verifica que le pertenezca a ese tecnico.
    const order = await isTechnicianOwnerSrv(user_id, order_id);

    // verificar que no este en el estado que no este cancelada.
    if (order.status === "COMPLETED")
      throw new AppError("La orden ya se encuentra terminada", 400);

    if (order.status !== "IN_PROGRESS")
      throw new AppError("El estado actual no permite terminar la orden", 400);

    await changeStatusOrderSrv(order_id, "COMPLETED");

    response.ok("Orden terminada correctamente");
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 401) return response.unauthorized(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const getOrdersCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const user_id = req.user.id;

  try {
    const orders = await getOrdersPerUserSrv(user_id);
    response.ok("Ordenes obtenidas correctamente", orders);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const getOrderCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const order_id = req.params.id;

  try {
    const order = await getOrderSrv(order_id);
    response.ok("Orden obtenida correctamente", order);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const getOrdersByUserCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const user_id = req.user.id;

  try {
    const orders = await getOrdersByUserSrv(user_id);
    response.ok("Ordenes obtenidas correctamente", orders);
  } catch (error) {
    console.log(error);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};
