import { Fragment, useState } from "react";
import { useOrders } from "../../hooks/useOrders.js";
import CardOrder from "../ui/shared/CardOrder.jsx";
import Button from "../ui/shared/Button.jsx";
import Modal from "../ui/shared/Modal.jsx";
import {ToolKitIcon, DesktopIcon, ScreenIcon, LaptopIcon, SmartPhoneIcon } from "../../utils/icons.js";
import { useCategories } from "../../hooks/useCategories.js";
import {CATEGORY_NOTEBOOK, CATEGORY_PANTALLA, CATEGORY_PC, CATEGORY_TELEFONO } from "../../constants/categoryIcons";


export default function MyJobs() {
  const { data, isPending } = useOrders().techOrdersQuery;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const { getCategory } = useCategories(selectedOrder?.category_id);
  const { data: categoryData, isPending: categoryIsPending } = getCategory;
  return (
    <>
      <h1 className="text-3xl font-bold">Mis trabajos</h1>
      {!isPending && !data.length && <p className="mt-5">No hay trabajos registrados</p>}
      {isPending ? (
        <p className="mt-5">Cargando...</p>
      ) : (
        data?.map((order) => (
          <Fragment key={order.id}>
            <CardOrder
              title={order.title}
              description={order.description}
              status={order.status}
              category={order.category_id}
            >
              <div className="p-2">
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
                  <Button
                    variant="danger"
                    className="text-white"
                    disabled={order.status === "COMPLETED" || order.status === "CANCELLED"}
                  >Cancelar orden</Button>
                </div>
              </Modal>
            )}
          </Fragment>
        ))
      )}
    </>
  );
}
