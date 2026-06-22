import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import orders from "../api/orders.js";
import { toast } from "react-toastify";

export function useOrders(order_id) {
  const queryClient = useQueryClient();

  const ordersByUserQuery = useQuery({
    queryKey: ["orders"],
    queryFn: orders.getOrdersByUser,
  });

  const createOrderMutation = useMutation({
    mutationFn: orders.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden creada exitosamente");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ?? "Error al crear la orden"
      );
    },
  });

  const getOrderQuery = useQuery({
    queryKey: ["orders-get"],
    queryFn:()=> orders.getOrder(order_id)
  });

  const availableOrdersQuery = useQuery({
    queryKey: ["available-orders"],
    queryFn: orders.getAvailableOrders,
  });

  const techOrdersQuery = useQuery({
    queryKey: ["tech-orders"],
    queryFn: orders.getOrdersByTechnician,
  })

  const cancelledMutation = useMutation({
    mutationFn: orders.cancelledOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success("Orden cancela exitosamente");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ?? "Error al cancelar la orden"
      );
    },
  });


  return { ordersByUserQuery, createOrderMutation, availableOrdersQuery, techOrdersQuery, cancelledMutation, getOrderQuery };
}
