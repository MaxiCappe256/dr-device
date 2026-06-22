import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import auth from '../api/auth';

export function useAuth() {
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: auth.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });

  const loginMutation = useMutation({
    mutationFn: auth.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user-me'], null);
    },
  });

  const changePasswordMutation = useMutation({
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

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
    changePasswordMutation,
  };
}
