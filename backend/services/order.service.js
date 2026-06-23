import AppError from "../utils/appError.js";
import { Op } from "sequelize";
import { Order } from "../models/Order.js";
import { Offer } from "../models/Offer.js";
import { User } from "../models/User.js";

const STATUS_LIST = ["SEARCHING", "PENDING"];

const getOrdersByUserAndCount = async ({ category_id, user_id }) => {
  const orderQuantity = await Order.count({
    where: { user_id, category_id, status: { [Op.in]: STATUS_LIST } },
  });
  return orderQuantity;
};

export const createOrderSrv = async ({ category_id, description, title, user_id }) => {
  const quanty = await getOrdersByUserAndCount({ category_id, user_id });
  if (quanty >= 5) throw new AppError("Has excedido el limite", 400);
  const createdOrder = await Order.create({
    category_id,
    description,
    title,
    user_id,
  });
  return createdOrder;
};

export const changeStatusOrderSrv = async (
  order_id,
  new_status,
  transaction = null,
) => {
  let order;

  if (new_status === "CANCELLED") {
    order = await Order.update(
      { status: new_status, canceled_at: new Date() },
      { where: { id: order_id } },
      transaction,
    );
  } else if (new_status === "COMPLETED") {
    order = await Order.update(
      { status: new_status, finished_at: new Date() },
      { where: { id: order_id } },
      transaction,
    );
  } else {
    order = await Order.update(
      { status: new_status },
      { where: { id: order_id } },
      transaction,
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
    transaction,
  );

  if (!updatedOrder) throw new AppError("No se pudo actualizar la orden", 400);

  return updatedOrder;
};


export const isAvailableAcceptOfferToOrderSrv = async (order_id) => {
  const getOrder = await getOrderSrv(order_id);
  if(getOrder.status !== "SEARCHING") throw new AppError("No podes aceptar la oferta de una orden cancelada", 409)

  return true;
};

export const getAvailableOrdersSrv = async (categoryIds, userId) => {
  // obtiene las ordenes que estan en busqueda con las categorias que posee el usuario (tecnico)
  // y posterior a esto, se verifica que las ordenes a obtener no sean a las que el tecnico ya haya realizado una oferta
  const offerOrders = await Offer.findAll({
    where: {
      technician_id: userId
    },
    attributes: ['order_id']
  });

  const orderIds = offerOrders.map(o => o.order_id);

  const orders = await Order.findAll({
    where: {
      status: 'SEARCHING',
      category_id: {
        [Op.in]: categoryIds
      },
      id: {
        [Op.notIn]: orderIds
      },
      user_id: { [Op.ne]: userId }
    },
    include: [{
      model: User,
      required: false,
      as: "user",
      attributes: ['id', 'full_name']
    }]
  });

  return orders;
};

export const getOrdersByUserSrv = async (user_id) => {
  const orders = await Order.findAll({ where: { user_id } });

  if (!orders)
    throw new AppError("No se encontraron ordenes para ese usuario", 404);

  return orders;
};

export const getOrdersByTechnicianSrv = async (technician_id) => {
  const orders = await Order.findAll({ where: { technician_id } });

  if (!orders)
    throw new AppError("No se encontraron ordenes para este tecnico", 404);

  return orders;
};
