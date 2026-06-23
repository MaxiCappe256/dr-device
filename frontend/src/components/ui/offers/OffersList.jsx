import { Fragment, useState } from "react";
import { useAllOffers } from "../../../hooks/useOffers.js";
import { useGetOrder } from "../../../hooks/useOrders.js";
import { useGetCategory } from "../../../hooks/useCategories.js";
import CardOrder from "../shared/CardOrder.jsx";
import Modal from "../shared/Modal.jsx";
import { ToolKitIcon } from "../../../utils/icons.js";
import { useUserById } from "../../../hooks/useUsers.js";
import OrderDetails from "../orders/OrderDetails.jsx";

const formatPrice = (price, locale = 'es-AR', currency = 'ARS') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(price);
};

export default function OffersList() {
    const { data, isPending } = useAllOffers()
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [isModalActive, setIsModalActive] = useState(false);

    const { data: dataOrder, isPending: isPendingOrder } = useGetOrder(selectedOffer?.order_id);
    const { data: categoryData, isPending: categoryIsPending } = useGetCategory(dataOrder?.category_id);
    const { data: technicianData, isPending: technicianIsPending } = useUserById(
        dataOrder?.technician_id,
    );

    const handleViewOrder = (offer) => {
        setSelectedOffer(offer);
        setIsModalActive(true);
    };

    const handleCloseModal = () => {
        setIsModalActive(false);
        setSelectedOffer(null);
    };

    const orderDates = [
        { type: "created", label: "Creación", date: dataOrder?.createdAt },
        {
            type: "finished",
            label: "Finalización",
            date: dataOrder?.finished_at,
        },
        {
            type: "canceled",
            label: "Cancelación",
            date: dataOrder?.canceled_at,
        },
    ]
        .filter((item) => item.date)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <>
            <h1 className="text-3xl font-bold">Mis ofertas</h1>
            {!isPending && !data?.length && <p className="mt-5">No has hecho ofertas</p>}
            {isPending ? (
                <p className="mt-5">Cargando...</p>
            ) : (
                data?.map((offer) => (
                    <Fragment key={offer.id}>
                        <CardOrder
                            id={offer.id}
                            title={formatPrice(offer.price)}
                            description={offer.description}
                            status={offer.status}
                            onDetails={() => handleViewOrder(offer)}
                        />
                    </Fragment>
                ))
            )}

            {isModalActive && selectedOffer && (
                <Modal
                    title={isPendingOrder ? "Cargando..." : dataOrder?.title}
                    onClose={handleCloseModal}
                >
                    {isPendingOrder ? (
                        <p className="text-center py-8">Cargando orden...</p>
                    ) : (
                        <OrderDetails
                            orderDates={orderDates}
                            description={dataOrder.description}
                            categoryName={categoryIsPending ? "Cargando..." : categoryData?.name}
                            techFullName={!technicianData?.full_name ? "Sin técnico asignado" : technicianIsPending ? "Cargando..." : technicianData?.full_name} />
                    )}
                </Modal>
            )}
        </>
    )
}
