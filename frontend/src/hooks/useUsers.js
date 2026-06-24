import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import users from "../api/users.js";
import { toast } from "react-toastify";

export function useUserMe() {
  return useQuery({
    queryKey: ["user-me"],
    queryFn: users.userMe,
  });
}

export function useUserById(userId) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => users.getUser(userId),
    enabled: !!userId,
  });
}

export function useUsersList() {
  return useQuery({
    queryKey: ["users"],
    queryFn: users.getAllUsers,
  });
}

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: users.createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("Administrador creado correctamente");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Error al crear el administrador");
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: users.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuario eliminado correctamente");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? "Error al eliminar el usuario");
    },
  });
}
