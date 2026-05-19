import AppError from '../utils/appError.js';
import { Op } from 'sequelize';
import { Order } from '../models/Order.js';

const STATUS_LIST=['SEARCHING','PENDING']
export const createOrderSrv= async({category_id, description, user_id })=>{
    const quanty= await getOrdersByUserAndCount({category_id,user_id})
    if (quanty>=5) throw new AppError('Has excedido el limite',400)
    const createdOrder = await Order.create({category_id, description, user_id})
    return createdOrder
}

export const getOrdersByUserAndCount =async({category_id,user_id})=>{
    const orderQuantity= await Order.count({where:{user_id, category_id, status: { [Op.in]: STATUS_LIST }}})
    return orderQuantity
}

