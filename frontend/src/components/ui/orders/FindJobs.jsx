import { Fragment, useState } from "react";

import { ArrowRightIcon } from "../../../utils/icons.js";

import OrderDetails from "./OrderDetails.jsx";
import OfferForm from '../offers/OfferForm.jsx';

import Modal from "../shared/Modal.jsx";
import Button from "../shared/Button.jsx";
import CardOrder from "../shared/CardOrder.jsx";

import { useUserById } from "../../../hooks/useUsers.js";
import { useAvailableOrders } from "../../../hooks/useOrders.js";
import { useGetCategory } from "../../../hooks/useCategories.js";

export default function FindJobs() {
  const { data, isPending } = useAvailableOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModal, setOrderModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const { data: categoryData, isPending: categoryIsPending } = useGetCategory(selectedOrder?.category_id);

  const { data: technicianData, isPending: technicianIsPending } = useUserById(
    selectedOrder?.technician_id,
  );

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
      <h1 className="text-3xl font-bold">Trabajos disponibles</h1>
      {!isPending && !data.length && <p className="mt-5">No hay ordenes para trabajar</p>}
      {isPending ? (
        <p className="mt-5">Cargando...</p>
      ) : (
        data?.map((order) => (
          <Fragment key={order.id}>
            <CardOrder
              user={order.user.full_name}
              title={order.title}
              description={order.description}
              status={order.status}
              category={order.category_id}
              onDetails={() => {
                setSelectedOrder(order);
                setOrderModal(true);
              }}
            />

            {selectedOrder?.id === order.id && orderModal && (
              <Modal
                title={order.title}
                onClose={() => {
                  setOrderModal(false);
                  setSelectedOrder(null);
                }}
              >
                <div className="flex flex-col h-full justify-between items-start gap-5">
                  <OrderDetails
                    description={order.description}
                    categoryName={categoryIsPending ? "Cargando..." : categoryData?.name} />
                  <Button
                    variant="primary"
                    iconRight={<ArrowRightIcon height="24" />}
                    onClick={() => {
                      setOrderModal(false);
                      setOfferModal(true);
                    }
                    }>¡Quiero oferar esta orden!</Button>
                </div>
              </Modal>
            )}

            {selectedOrder?.id === order.id && offerModal && <Modal
              title={`Ofertando: ${order.title}`}
              onClose={() => {
                setOfferModal(false);
              }}
            >
              <OfferForm orderId={order.id} onSuccess={() => setOfferModal(false)} />
            </Modal>}
          </Fragment>
        ))
      )}
    </>
  );
}
