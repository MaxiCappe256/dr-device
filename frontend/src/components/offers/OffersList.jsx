import { Fragment, useState } from "react";
import { useAllOffers } from "../../hooks/useOffers.js";
import CardOrder from "../ui/shared/CardOrder.jsx";
import Button from "../ui/shared/Button.jsx";
import { useOrders } from "../../hooks/useOrders.js";
import Modal from "../ui/shared/Modal.jsx";
import { ToolKitIcon } from "../../utils/icons.js";
import { useCategories } from "../../hooks/useCategories.js";

export default function OffersList() {
    const { data, isPending } = useAllOffers()
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const { data: dataOrder, isPending: isPendingOrder } = useOrders(selectedOffer?.order_id).getOrderQuery
    const { getCategory } = useCategories(dataOrder?.category_id);
    const { data: categoryData, isPending: categoryIsPending } = getCategory;

    const formatPrice = (price, locale = 'es-AR', currency = 'ARS') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(price);
    };
    return (
        <>
            <h1 className="text-3xl font-bold">Mis ofertas</h1>
            {!isPending && !data.length && <p className="mt-5">No has hecho ofertas</p>}
            {isPending ? (
                <p className="mt-5">Cargando...</p>
            ) : (
                data?.map((offer) => (
                    <Fragment key={offer.id}>
                        <CardOrder
                            title={formatPrice(offer.price)}
                            description={offer.description}
                            status={offer.status}
                        >
                            <div className="p-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedOffer(offer);
                                        setIsModalActive(true);
                                    }}
                                >
                                    Ver orden
                                </Button>
                            </div>
                        </CardOrder>
                        {selectedOffer?.id === offer.id && isModalActive && (
                            isPendingOrder? <p>Cargando...</p>:
                            <Modal
                                title={dataOrder.title}
                                onClose={() => {
                                    setIsModalActive(false);
                                    setSelectedOffer(null);
                                }}
                            >
                                <div className="flex flex-col h-full justify-between items-start gap-5">
                                    <div className="space-y-6">
                                        <label className="uppercase text-md text-tertiary/60 font-semibold mb-2">
                                            Descripción del servicio
                                        </label>
                                        <p className="text-lg">{dataOrder.description}</p>
                                    </div>

                                    <div className="py-3 px-5 rounded-lg bg-surface-tint/10 w-1/4">
                                        <label className="uppercase text-sm text-tertiary/60 font-semibold mb-2">
                                            Categoria
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-full bg-surface-tint/20 p-2 w-fit">
                                                <ToolKitIcon className="text-surface-tint" height="20" />
                                            </div>
                                            <p className="text-md">
                                                {categoryIsPending ? "Cargando..." : categoryData?.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </Fragment>
                ))
            )}
        </>
    )
}
