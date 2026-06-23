import { Fragment, useState } from "react";
import { useTechOrders } from "../../hooks/useOrders.js";
import CardOrder from "../ui/shared/CardOrder.jsx";
import Button from "../ui/shared/Button.jsx";
import Modal from "../ui/shared/Modal.jsx";
import { ToolKitIcon } from "../../utils/icons.js";
import { useGetCategory } from "../../hooks/useCategories.js";
import { useCancelTechOffer } from "../../hooks/useOffers.js";

export default function MyJobs() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, isPending } = useTechOrders();
  const { data: categoryData, isPending: categoryIsPending } = useGetCategory(
    selectedOrder?.category_id,
  );
  const cancelMutation = useCancelTechOffer();
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
                  <div className="space-y-6">
                    <label className="uppercase text-md text-tertiary/60 font-semibold mb-2">
                      Descripción del servicio
                    </label>
                    <p className="text-lg">{order.description}</p>
                  </div>

                  <div className="py-3 px-5 rounded-lg bg-surface-tint/10 w-1/4">
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
                        {categoryIsPending ? "Cargando..." : categoryData?.name}
                      </p>
                    </div>
                  </div>
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
                    <Button variant="primary">Completar orden</Button>
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
