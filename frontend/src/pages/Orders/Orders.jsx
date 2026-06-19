import CardOrder from "../../components/ui/shared/CardOrder";
import { useOrders } from "../../hooks/useOrders";
import Button from "../../components/ui/shared/Button";

export default function Orders() {
  const { data, isPending } = useOrders();

  return (
    <>
      <h1 className="text-3xl font-bold">Mis ordenes</h1>

      {isPending ? (
        <p className="mt-5">Cargando...</p>
      ) : (
        <div className="flex flex-col gap-4 mt-10">
          {data?.map((order) => (
            <CardOrder
              key={order.id}
              title={order.title}
              description={order.description}
              status={order.status}
              category={order.category_id}
            >
              <div className="p-2">
                <Button variant="outline">Ver detalles</Button>
              </div>
            </CardOrder>
          ))}
        </div>
      )}
    </>
  );
}
