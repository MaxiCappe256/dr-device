import { useQuery } from "@tanstack/react-query";
import orders from "../api/orders.js";

export function useOrders() {
  const categoriesQuery = useQuery({
    queryKey: ["orders"],
    queryFn: orders.getOrdersByUser,
  });

  return categoriesQuery;
}
