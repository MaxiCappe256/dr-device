import { useAuthContext } from '../hooks/useAuthContext';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export default function Home() {
  const { user, loading } = useAuthContext();
  const { logoutMutation } = useAuth();
  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      Hola <b>{user?.data?.full_name}</b>
      {user && (
        <Button
          variant="inverted"
          type="button"
          onClick={logoutMutation.mutateAsync}
          loading={logoutMutation.isPending}
        >
          Cerrar sesión
        </Button>
      )}
    </div>
  );
}
