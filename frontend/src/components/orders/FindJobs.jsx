import { Fragment, useState } from "react";
import { useAvailableOrders } from "../../hooks/useOrders.js";
import CardOrder from "../ui/shared/CardOrder.jsx";
import Button from "../ui/shared/Button.jsx";
import Modal from "../ui/shared/Modal.jsx";
import OfferForm from '../offers/OfferForm.jsx';
import { ArrowRightIcon, ToolKitIcon, DesktopIcon, ScreenIcon, LaptopIcon, SmartPhoneIcon } from "../../utils/icons.js";
import { CATEGORY_NOTEBOOK, CATEGORY_PANTALLA, CATEGORY_PC, CATEGORY_TELEFONO } from "../../constants/categoryIcons";
import { useGetCategory } from "../../hooks/useCategories.js";

export default function FindJobs() {
  const { data, isPending } = useAvailableOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModal, setOrderModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const { data: categoryData, isPending: categoryIsPending } = useGetCategory(selectedOrder?.category_id);

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
                    setOrderModal(true);
                  }}
                >
                  Ver detalles
                </Button>
              </div>
            </CardOrder>

            {selectedOrder?.id === order.id && orderModal && (
              <Modal
                title={order.title}
                onClose={() => {
                  setOrderModal(false);
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
                    variant="primary" 
                    iconRight={<ArrowRightIcon height="24"/>}
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
              <OfferForm orderId={order.id} onSuccess={() => setOfferModal(false)}/>
            </Modal>}
          </Fragment>
        ))
      )}
    </>
  );
}
