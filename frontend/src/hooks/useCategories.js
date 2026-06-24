import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import categories from "../api/categories.js";
import { toast } from "react-toastify";

export function useGetCategory(categoryId) {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => categories.getCategory(categoryId),
    enabled: !!categoryId,
  });
}

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categories.getCategories(),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categories.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Categoría creada correctamente");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Error al crear la categoría");
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categories.updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Categoría actualizada correctamente");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Error al actualizar la categoría");
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categories.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success("Categoría eliminada correctamente");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Error al eliminar la categoría");
    },
  });
}
