import { useQuery } from "@tanstack/react-query";
import categories from "../api/categories.js";

export function useCategories(categoryId) {
  const getCategory = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => categories.getCategory(categoryId),
    enabled: !!categoryId,
  });

  const getCategories = useQuery({
    queryKey: ["categories"],
    queryFn: () => categories.getCategories(),
  });

  return { getCategory, getCategories };
}
