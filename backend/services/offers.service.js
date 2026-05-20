import { Offer } from "../models/Offer.js";
import { Order } from "../models/Order.js";
import { Op } from "sequelize";
import AppError from "../utils/appError.js";

const STATUS_LIST = ["CANCELLED", "IN_PROGRESS", "COMPLETED"];

export const createOfferSrv = async ({ user_id, order_id, description, price }) => {
    const offer = await Offer.create({ technician_id: user_id, order_id, description, price })
    if(!offer) throw new AppError("No se ha podido crear la oferta.", 400)

    return offer.dataValues
}

export const validateCriteriaOfferSrv = async (order_id, user_id) => {
    const order = await Order.findOne({ where: { id: order_id, status: { [Op.in]: STATUS_LIST } }})
    if(order) throw new AppError("Solo se puede ofertar si la orden está en búsqueda o pendiente.", 409)

    const offer = await Offer.findOne({ where: { order_id, status: 'ACCEPTED' } })
    if(offer) throw new AppError("La orden ya fue aceptada.", 409);

    const offerAlreadyExists = await Offer.findOne({ where: { order_id, technician_id: user_id } })
    if(offerAlreadyExists) throw new AppError("Ya realizaste una oferta para esta orden.", 400)

    return false;
}


export const getOffersPerOrderSrv = async (order_id) => {
    const orders = await Offer.findAll({ where: { order_id } });
  
    if (!orders) throw new AppError("No se encontraron ofertas para esta orden.", 404);
  
    return orders;
  };