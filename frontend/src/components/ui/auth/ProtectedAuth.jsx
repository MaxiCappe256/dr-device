import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function ProtectedAuth() {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
}
