import CardOrder from "../../components/ui/shared/CardOrder";
import { useOrders } from "../../hooks/useOrders";
import { useUserById } from "../../hooks/useUsers";
import Button from "../../components/ui/shared/Button";
import Modal from "../../components/ui/shared/Modal";
import { Fragment, useState } from "react";
import { ToolKitIcon, UserIcon } from "../../utils/icons";
import { useCategories } from "../../hooks/useCategories";

export default function Orders() {
  const { data: orderData, isPending: orderIsPending } = useOrders().ordersByUserQuery;
  const { cancelledMutation } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const { data: technicianData, isPending: technicianIsPending } = useUserById(selectedOrder?.technician_id);

  const { getCategory } = useCategories(selectedOrder?.category_id);
  const { data: categoryData, isPending: categoryIsPending } = getCategory;

  const orderDates = [
    { type: "created", label: "Creación", date: selectedOrder?.createdAt },
    { type: "finished", label: "Finalización", date: selectedOrder?.finished_at },
    { type: "canceled", label: "Cancelación", date: selectedOrder?.canceled_at },
  ]
    .filter(item => item.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

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
                                  technicianIsPending ? 'Cargando...' : technicianData?.full_name
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
                            <p className="text-md">
                              {categoryIsPending ? 'Cargando...' : categoryData?.name}
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
                                <div className={`
                                    size-3 rounded-full border border-white absolute -left-8 top-1.5
                                    ${{
                                    created: "bg-on-background",
                                    updated: "bg-primary-container",
                                    finished: "bg-surface-tint",
                                    canceled: "bg-on-surface-variant",
                                  }[type]
                                  }
                                  
                                  `}></div>
                              </div>
                              <span className="font-semibold text-tertiary/40">{new Date(date).toLocaleDateString('es-AR')}</span>
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
                )
              }
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
