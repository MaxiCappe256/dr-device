import CardOrder from "../../components/ui/shared/CardOrder";
import { useOrdersByUser, useCancelOrder } from "../../hooks/useOrders";
import { useUserById } from "../../hooks/useUsers";
import { useGetOffersByOrder, useAcceptOffer } from "../../hooks/useOffers";
import Button from "../../components/ui/shared/Button";
import Modal from "../../components/ui/shared/Modal";
import { Fragment, useState } from "react";
import { ToolKitIcon, UserIcon } from "../../utils/icons";
import { useGetCategory } from "../../hooks/useCategories";

export default function Orders() {
  const { data: orderData, isPending: orderIsPending } = useOrdersByUser();
  const cancelledMutation = useCancelOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [offersOrder, setOffersOrder] = useState(null);
  const [isOffersModalActive, setIsOffersModalActive] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isOfferDetailActive, setIsOfferDetailActive] = useState(false);

  const acceptOfferMutation = useAcceptOffer();

  const { data: offerTechnicianData, isPending: offerTechnicianIsPending } =
    useUserById(selectedOffer?.technician_id);

  const { data: offersData, isPending: offersIsPending } = useGetOffersByOrder(
    offersOrder?.id,
  );

  const { data: technicianData, isPending: technicianIsPending } = useUserById(
    selectedOrder?.technician_id,
  );

  const { data: categoryData, isPending: categoryIsPending } = useGetCategory(selectedOrder?.category_id);

  const orderDates = [
    { type: "created", label: "Creación", date: selectedOrder?.createdAt },
    {
      type: "finished",
      label: "Finalización",
      date: selectedOrder?.finished_at,
    },
    {
      type: "canceled",
      label: "Cancelación",
      date: selectedOrder?.canceled_at,
    },
  ]
    .filter((item) => item.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <h1 className="text-3xl font-bold">Mis ordenes</h1>
      {!orderIsPending && !orderData.length && (
        <p className="mt-5">Sin ordenes registradas</p>
      )}
      {orderIsPending ? (
        <p className="mt-5">Cargando...</p>
      ) : (
        <div className="flex flex-col gap-4 mt-10">
          {orderData?.map((order) => (
            <Fragment key={order.id}>
              <CardOrder
                title={order.title}
                description={order.description}
                status={order.status}
                category={order.category_id}
              >
                <div className="p-2 flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setOffersOrder(order);
                      setIsOffersModalActive(true);
                    }}
                  >
                    Ver ofertas
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsModalActive(true);
                    }}
                  >
                    Ver detalles
                  </Button>
                </div>
              </CardOrder>

              {selectedOrder?.id === order.id && isModalActive && (
                <Modal
                  title={order.title}
                  onClose={() => {
                    setIsModalActive(false);
                    setSelectedOrder(null);
                  }}
                >
                  <div className="flex flex-col h-full justify-between items-start gap-5">
                    <div className="space-y-6">
                      <label className="uppercase text-md text-tertiary/60 font-semibold mb-2">
                        Descripción del servicio
                      </label>
                      <p className="text-lg">{order.description}</p>
                    </div>

                    <div className="flex gap-3 w-full">
                      <div className="py-3 px-5 rounded-lg bg-surface-tint/10 w-full">
                        <label className="uppercase text-sm text-tertiary/60 font-semibold">
                          Técnico asignado
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-surface-tint/20 p-2 w-fit">
                            <UserIcon
                              className="text-surface-tint"
                              height="20"
                            />
                          </div>
                          <p className="text-md">
                            {order.technician_id
                              ? technicianIsPending
                                ? "Cargando..."
                                : technicianData?.full_name
                              : "Sin técnico asignado"}
                          </p>
                        </div>
                      </div>
                      <div className="py-3 px-5 rounded-lg bg-surface-tint/10 w-full">
                        <label className="uppercase text-sm text-tertiary/60 font-semibold mb-2">
                          Categoria
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-surface-tint/20 p-2 w-fit">
                            <ToolKitIcon
                              className="text-surface-tint"
                              height="20"
                            />
                          </div>
                          <p className="text-md">
                            {categoryIsPending
                              ? "Cargando..."
                              : categoryData?.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-gray-100 w-full">
                      <label className="uppercase text-sm text-tertiary/60 font-semibold">
                        Linea de tiempo de la orden
                      </label>
                      <div className="flex flex-col gap-2 ml-4 pl-6 border-l-3 border-gray-100">
                        {orderDates.map(({ type, label, date }) => (
                          <div>
                            <div className="relative">
                              <h4 className="font-semibold">{label}</h4>
                              <div
                                className={`
                                    size-3 rounded-full border border-white absolute -left-8 top-1.5
                                    ${
                                      {
                                        created: "bg-on-background",
                                        updated: "bg-primary-container",
                                        finished: "bg-surface-tint",
                                        canceled: "bg-on-surface-variant",
                                      }[type]
                                    }
                                  
                                  `}
                              ></div>
                            </div>
                            <span className="font-semibold text-tertiary/40">
                              {new Date(date).toLocaleDateString("es-AR")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        cancelledMutation.mutateAsync(order.id);
                        setIsModalActive(false);
                      }}
                      loading={cancelledMutation.isPending}
                      variant="danger"
                      className="text-white"
                    >
                      Cancelar orden
                    </Button>
                  </div>
                </Modal>
              )}

              {offersOrder?.id === order.id && isOffersModalActive && (
                <Modal
                  title={`Ofertas - ${order.title}`}
                  onClose={() => {
                    setIsOffersModalActive(false);
                    setOffersOrder(null);
                  }}
                >
                  {offersIsPending ? (
                    <p className="text-center py-4">Cargando ofertas...</p>
                  ) : !offersData?.length ? (
                    <p className="text-center py-4 text-tertiary/60">
                      No hay ofertas para esta orden.
                    </p>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {offersData.map((offer) => (
                        <div
                          key={offer.id}
                          className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary-container transition-all"
                          onClick={() => {
                            setSelectedOffer(offer);
                            setIsOfferDetailActive(true);
                            setIsOffersModalActive(false);
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl font-semibold">
                              ${offer.price}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                offer.status === "ACCEPTED"
                                  ? "bg-green-100 text-green-800"
                                  : offer.status === "REJECTED"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {offer.status === "ACCEPTED"
                                ? "Aceptada"
                                : offer.status === "REJECTED"
                                  ? "Rechazada"
                                  : "Pendiente"}
                            </span>
                          </div>
                          <p className="text-gray-600">{offer.description}</p>
                          <p className="text-sm text-tertiary/40 mt-2">
                            {new Date(offer.createdAt).toLocaleDateString(
                              "es-AR",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Modal>
              )}
            </Fragment>
          ))}
        </div>
      )}
    {selectedOffer && isOfferDetailActive && (
      <Modal
        title="Detalle de la oferta"
        onClose={() => {
          setIsOfferDetailActive(false);
          setSelectedOffer(null);
          setIsOffersModalActive(true);
        }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">${selectedOffer.price}</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedOffer.status === "ACCEPTED"
                  ? "bg-green-100 text-green-800"
                  : selectedOffer.status === "REJECTED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {selectedOffer.status === "ACCEPTED"
                ? "Aceptada"
                : selectedOffer.status === "REJECTED"
                  ? "Rechazada"
                  : "Pendiente"}
            </span>
          </div>

          <div>
            <label className="uppercase text-sm text-tertiary/60 font-semibold">
              Técnico
            </label>
            <div className="flex items-center gap-2 mt-1">
              <div className="rounded-full bg-surface-tint/20 p-2 w-fit">
                <UserIcon className="text-surface-tint" height="20" />
              </div>
              <p className="text-lg">
                {offerTechnicianIsPending
                  ? "Cargando..."
                  : offerTechnicianData?.full_name}
              </p>
            </div>
          </div>

          <div>
            <label className="uppercase text-sm text-tertiary/60 font-semibold">
              Descripción
            </label>
            <p className="text-lg mt-1">{selectedOffer.description}</p>
          </div>

          <div>
            <label className="uppercase text-sm text-tertiary/60 font-semibold">
              Fecha de oferta
            </label>
            <p className="text-lg mt-1">
              {new Date(selectedOffer.createdAt).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {selectedOffer.updatedAt !== selectedOffer.createdAt && (
            <div>
              <label className="uppercase text-sm text-tertiary/60 font-semibold">
                Última actualización
              </label>
              <p className="text-lg mt-1">
                {new Date(selectedOffer.updatedAt).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}

          {selectedOffer.status === "PENDING" && (
            <Button
              variant="primary"
              onClick={() => {
                acceptOfferMutation.mutateAsync(selectedOffer.id);
                setIsOfferDetailActive(false);
                setSelectedOffer(null);
              }}
              loading={acceptOfferMutation.isPending}
            >
              Aceptar oferta
            </Button>
          )}
        </div>
      </Modal>
    )}
  </>
  );
}
