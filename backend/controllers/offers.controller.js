import ApiResponse from "../handlers/response.js";
import { changeStatusOrderSrv, getOrderSrv, isOrderOwnerSrv } from "../services/order.service.js";
import { validateCriteriaOfferSrv, createOfferSrv, getOffersPerOrderSrv, getOfferSrv, isAcceptedOfferSrv, acceptOfferToOrderSrv } from "../services/offers.service.js";

export const createOfferCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { order_id, description, price } = req.body;
  const user_id = req.user.id;
  try {
    // verificar que a la orden que le hace la oferta exista
    await getOrderSrv(order_id);

    // verificar que la oferta:
    // - no haya sido aceptada 
    // - la orden este en un estado de busqueda o pendiente 
    // - que no sea del mismo usuario a la misma orden
    await validateCriteriaOfferSrv(order_id, user_id);

    const createdOffer = await createOfferSrv({ user_id, order_id, description, price })
    response.ok("Oferta realizada exitosamente.", createdOffer);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    if (error.statusCode === 409) return response.conflict(error.message);
    return response.error(error.message);
  }
};

export const getOffersPerOrderCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { id } = req.params;
  try {
    const offers = await getOffersPerOrderSrv(id)
    response.ok("Ofertas obtenidas para la orden correctamente.", offers);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    return response.error(error.message);
  }
};

export const acceptOfferCtrl = async (req, res) => {
  const response = new ApiResponse(res);
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const { order_id, technician_id } = await getOfferSrv(id);

    await isOrderOwnerSrv(user_id, order_id);
    await isAcceptedOfferSrv(id);
    const acceptedOffer = await acceptOfferToOrderSrv(order_id, id, technician_id);

    response.ok('La oferta ha sido aceptada correctamente', acceptedOffer);
  } catch (error) {
    console.error(error.message);
    if (error.statusCode === 400) return response.badRequest(error.message);
    if (error.statusCode === 401) return response.unauthorized(error.message);
    if (error.statusCode === 404) return response.notFound(error.message);
    if (error.statusCode === 409) return response.conflict(error.message);
    return response.error(error.message);
  }
};