import { useQuery } from "@tanstack/react-query";
import categories from "../api/categories.js";

export function useCategory(categoryId) {
    return useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => categories.getCategory(categoryId),
        enabled: !!categoryId,
    });
}
