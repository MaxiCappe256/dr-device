import AppError from "../utils/appError.js";
import { Op } from "sequelize";
import { Order } from "../models/Order.js";

const STATUS_LIST = ["SEARCHING", "PENDING"];

const getOrdersByUserAndCount = async ({ category_id, user_id }) => {
  const orderQuantity = await Order.count({
    where: { user_id, category_id, status: { [Op.in]: STATUS_LIST } },
  });
  return orderQuantity;
};

export const createOrderSrv = async ({ category_id, description, user_id }) => {
  const quanty = await getOrdersByUserAndCount({ category_id, user_id });
  if (quanty >= 5) throw new AppError("Has excedido el limite", 400);
  const createdOrder = await Order.create({
    category_id,
    description,
    user_id,
  });
  return createdOrder;
};

export const changeStatusOrderSrv = async (order_id, new_status, transaction = null) => {
  let order;

  if (new_status === "CANCELLED") {
    order = await Order.update(
      { status: new_status, canceled_at: new Date() },
      { where: { id: order_id } },
      transaction
    );
  } else if (new_status === "COMPLETED") {
    order = await Order.update(
      { status: new_status, finished_at: new Date() },
      { where: { id: order_id } },
      transaction
    );
  } else {
    order = await Order.update(
      { status: new_status },
      { where: { id: order_id } },
      transaction
    );
  }

  const [orderUpdated] = order;

  if (!orderUpdated) throw new AppError("No se encontro la orden", 404);

  return orderUpdated;
};

export const isOrderOwnerSrv = async (user_id, order_id) => {
  const order = await Order.findOne({ where: { user_id, id: order_id } });

  if (!order) throw new AppError("La orden no corresponde a ese usuario", 401);

  return order.dataValues;
};

export const isTechnicianOwnerSrv = async (user_id, order_id) => {
  const order = await Order.findOne({
    where: { technician_id: user_id, id: order_id },
  });

  if (!order) throw new AppError("La orden no corresponde a ese tecnico", 401);

  return order.dataValues;
};

export const getOrdersPerUserSrv = async (user_id) => {
  const orders = await Order.findAll({ where: { user_id } });

  if (!orders) throw new AppError("No se encontraron ordenes", 404);

  return orders;
};

export const getOrderSrv = async (order_id) => {
  const order = await Order.findByPk(order_id);
  if (!order) throw new AppError("No se encontro la orden", 404);

  return order.dataValues;
};

export const updateOrderSrv = async (order_id, data, transaction = null) => {
  if (transaction) {

  }
  const [updatedOrder] = await Order.update(
    data,
    { where: { id: order_id } },
    transaction
  );

  if (!updatedOrder) throw new AppError("No se pudo actualizar la orden", 400);

  return updatedOrder;
};