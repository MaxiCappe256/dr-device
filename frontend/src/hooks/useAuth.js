import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import auth from '../api/auth';

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user-me'], null);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: auth.changePassword,
    onSuccess: () => {
      toast.success('Contraseña actualizada exitosamente.');
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ?? 'Error al cambiar la contraseña.',
      );
    },
  });
}
