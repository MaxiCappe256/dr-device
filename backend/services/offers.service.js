import { Offer } from "../models/Offer.js";
import { Order } from "../models/Order.js";
import { Op } from "sequelize";
import AppError from "../utils/appError.js";
import sequelize from "../db/index.js";
import { changeStatusOrderSrv, getOrderSrv, updateOrderSrv } from "./order.service.js";

const STATUS_LIST = ["CANCELLED", "IN_PROGRESS", "COMPLETED"];

export const createOfferSrv = async ({ user_id, order_id, description, price }) => {
    const offer = await Offer.create({ technician_id: user_id, order_id, description, price })
    if (!offer) throw new AppError("No se ha podido crear la oferta.", 400)

    return offer.dataValues
}

export const validateCriteriaOfferSrv = async (order_id, user_id) => {
    const order = await Order.findOne({ where: { id: order_id, status: { [Op.in]: STATUS_LIST } } })
    if (order) throw new AppError("Solo se puede ofertar si la orden está en búsqueda o pendiente.", 409)

    const offer = await Offer.findOne({ where: { order_id, status: 'ACCEPTED' } })
    if (offer) throw new AppError("La orden ya fue aceptada.", 409);

    const offerAlreadyExists = await Offer.findOne({ where: { order_id, technician_id: user_id } })
    if (offerAlreadyExists) throw new AppError("Ya realizaste una oferta para esta orden.", 400)

    return false;
}

export const getOffersPerOrderSrv = async (order_id) => {
    const orders = await Offer.findAll({ where: { order_id } });

    if (!orders) throw new AppError("No se encontraron ofertas para esta orden.", 404);

    return orders;
};

export const getOfferSrv = async (offer_id) => {
    const offer = await Offer.findByPk(offer_id);
    if (!offer) throw new AppError("No se encontro la oferta", 404);

    return offer.dataValues;
};

export const isAcceptedOfferSrv = async (offer_id) => {
    const { order_id } = await getOfferSrv(offer_id);
    const { technician_id } = await getOrderSrv(order_id)
    if (technician_id) throw new AppError("La oferta ya se encuentra aceptada", 409);

    return false;
};


export const allOffersTechSrv= async (tech_id)=>{
    const offers= await Offer.findAll({
        where:{technician_id: tech_id}
    })
    if(!offers) throw new AppError("No se encontro la oferta para este tecnico", 404)
    return offers
}

export const acceptOfferToOrderSrv = async (order_id, offer_id, technician_id) => {
    const t = await sequelize.transaction();

    try {
        // Cambio de estado a 'REJECTED' de todas las ofertas que no sean la que llega por argumento
        await Offer.update(
            { status: 'REJECTED' },
            {
                where: {
                    id: { [Op.ne]: offer_id },
                    order_id
                },
                transaction: t
            });

        // Cambio de estado a 'ACCEPTED' de la oferta que llega por argumento
        await Offer.update(
            { status: 'ACCEPTED' },
            {
                where: {
                    id: offer_id,
                    status: 'PENDING'
                },
                transaction: t,
            });

        // Asignamos tecnico de la oferta a la orden correspondiente
        await updateOrderSrv(order_id, { technician_id }, t);

        // Cambio de estado de la orden a 'IN_PROGRESS' por tener una oferta aceptada
        await changeStatusOrderSrv(order_id, 'IN_PROGRESS', t);

        await t.commit();
        return await getOfferSrv(offer_id);
    } catch (error) {
        console.error(error);
        await t.rollback();
        throw error;
    }
};