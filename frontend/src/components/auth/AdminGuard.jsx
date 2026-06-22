import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function AdminGuard() {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/auth/login" replace />;

  const roles = user.data?.roles ?? [];
  const isAdmin = roles.some(role => role.title === 'admin');

  if (!isAdmin) return <Navigate to="/account" replace />;

  return <Outlet />;
}