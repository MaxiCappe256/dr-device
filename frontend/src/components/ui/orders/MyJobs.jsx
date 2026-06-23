import { Fragment, useState } from "react";

import Modal from "../shared/Modal.jsx";
import Button from "../shared/Button.jsx";
import CardOrder from "../shared/CardOrder.jsx";

import OrderDetails from "./OrderDetails.jsx";

import { useUserById } from "../../../hooks/useUsers.js";
import { useFinishOrder, useTechOrders } from "../../../hooks/useOrders.js";
import { useGetCategory } from "../../../hooks/useCategories.js";
import { useCancelTechOffer } from "../../../hooks/useOffers.js";

export default function MyJobs() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, isPending } = useTechOrders();
  const { data: categoryData, isPending: categoryIsPending } = useGetCategory(
    selectedOrder?.category_id,
  );

  const cancelMutation = useCancelTechOffer();
  const finishMutation = useFinishOrder();

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
      <h1 className="text-3xl font-bold">Mis trabajos</h1>
      {!isPending && !data.length && (
        <p className="mt-5">No hay trabajos registrados</p>
      )}
      {isPending ? (
        <p className="mt-5">Cargando...</p>
      ) : (
        data?.map((order) => (
          <Fragment key={order.id}>
            <CardOrder
              title={order.title}
              createdAt={order.createdAt}
              description={order.description}
              status={order.status}
              category={order.category_id}
              onDetails={() => {
                setSelectedOrder(order);
                setIsModalActive(true);
              }}
            />

            {selectedOrder?.id === order.id && isModalActive && (
              <Modal
                title={order.title}
                onClose={() => {
                  setIsModalActive(false);
                  setSelectedOrder(null);
                }}
              >
                <div className="flex flex-col h-full justify-between items-start gap-5">

                  <OrderDetails
                    orderDates={orderDates}
                    description={order.description}
                    categoryName={categoryIsPending ? "Cargando..." : categoryData?.name}
                    techFullName={technicianIsPending ? "Cargando..." : technicianData.full_name} />
                  <div className="flex flex-col md:flex-row w-full gap-4 justify-between items-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        cancelMutation.mutateAsync(order.offer_id);
                        setIsModalActive(false);
                      }}
                      disabled={
                        order.status === "COMPLETED" ||
                        order.status === "CANCELLED"
                      }
                    >
                      Cancelar oferta
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        finishMutation.mutateAsync(order.id);
                        setIsModalActive(false);
                      }}
                      disabled={
                        order.status === "COMPLETED" ||
                        order.status === "CANCELLED"
                      }
                    >Completar orden</Button>
                  </div>
                </div>
              </Modal>
            )}
          </Fragment>
        ))
      )}
    </>
  );
}
