import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import orders from "../api/orders.js";

export function useOrders() {
  const queryClient = useQueryClient();

  const ordersByUserQuery = useQuery({
    queryKey: ["orders"],
    queryFn: orders.getOrdersByUser,
  });

  const createOrderMutation = useMutation({
    mutationFn: orders.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.log(error.response?.data?.message);
    },
  });

  const availableOrdersQuery = useQuery({
    queryKey: ["available-orders"],
    queryFn: orders.getAvailableOrders,
  });

  const techOrdersQuery= useQuery({
    queryKey:["tech-orders"],
    queryFn: orders.getOrdersByTechnician,
  })

  const cancelledMutation = useMutation({
    mutationFn: orders.cancelledOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.log(error.response?.data?.message);
    },
  });


  return { ordersByUserQuery, createOrderMutation, availableOrdersQuery, techOrdersQuery, cancelledMutation };
}
