import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import orders from "../api/orders.js";

export function useOrders() {
  const queryClient = useQueryClient();

  const ordersByUserQuery = useQuery({
    queryKey: ["orders"],
    queryFn: orders.getOrdersByUser,
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
      console.log(error.response?.data?.error);
    },
  });


  return { ordersByUserQuery, availableOrdersQuery, techOrdersQuery, cancelledMutation };
}
