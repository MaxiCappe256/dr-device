import CardOrder from "../../components/ui/shared/CardOrder";
import { useOrders } from "../../hooks/useOrders";
import { useUserById } from "../../hooks/useUsers";
import Button from "../../components/ui/shared/Button";
import Modal from "../../components/ui/shared/Modal";
import { Fragment, useState } from "react";
import { ToolKitIcon, UserIcon } from "../../utils/icons";

export default function Orders() {
  const { data: orderData, isPending: orderIsPending } = useOrders().categoriesQuery;
  const { cancelledMutation } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const { data: technician, isPending: techIsPending } = useUserById(selectedOrder?.technician_id);

  return (
    <>
      <h1 className="text-3xl font-bold">Mis ordenes</h1>
      {!orderIsPending && !orderData.length && <p className="mt-5">Sin ordenes registradas</p>}
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
                <div className="p-2">
                  <Button variant="outline" onClick={() => { setSelectedOrder(order); setIsModalActive(true); }}>Ver detalles</Button>
                </div>
              </CardOrder>

              {
                selectedOrder?.id === order.id && isModalActive && (
                  <Modal title={order.title} onClose={() => { setIsModalActive(false); setSelectedOrder(null); }}>
                    <div className="flex flex-col h-full justify-between items-start gap-5">
                      <div className="space-y-6">
                        <label className="uppercase text-md text-tertiary/60 font-semibold mb-2">
                          Descripción del servicio
                        </label>
                        <p className="text-lg">
                          {order.description}
                        </p>
                      </div>

                      <div className="flex gap-3 w-full">
                        <div className="py-3 px-5 rounded-lg bg-surface-tint/10 w-full">
                          <label className="uppercase text-sm text-tertiary/60 font-semibold">
                            Técnico asignado
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-surface-tint/20 p-2 w-fit"><UserIcon className="text-surface-tint" height="20" /></div>
                            <p className="text-md">
                              {
                                order.technician_id ? (
                                  techIsPending ? 'Cargando...' : technician?.full_name
                                ) : 'Sin técnico asignado'
                              }
                            </p>
                          </div>
                        </div>
                        <div className="py-3 px-5 rounded-lg bg-surface-tint/10 w-full">
                          <label className="uppercase text-sm text-tertiary/60 font-semibold mb-2">
                            Categoria
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-surface-tint/20 p-2 w-fit"><ToolKitIcon className="text-surface-tint" height="20" /></div>
                            <p className="text-md">Celulares</p>
                          </div>
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
                        Eliminar Orden
                      </Button>
                    </div>
                  </Modal>
                )
              }
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
