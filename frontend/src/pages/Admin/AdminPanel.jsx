import { Navigate } from 'react-router';
import { useAuthContext } from '../../hooks/useAuthContext';
import AdminContent from '../../components/admin/AdminContent';

export default function AdminPanel() {
    const { user, loading } = useAuthContext();

    if (loading) return null;

    if (!user?.data) return <Navigate to="/auth/login" replace />;

    const isAdmin = user.data.roles?.some((role) => role.title === 'admin');

    if (!isAdmin) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-surface">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary">Acceso denegado</h1>
                    <p className="mt-4 text-lg text-tertiary">No tienes permisos de administrador.</p>
                </div>
            </div>
        );
    }

    return <AdminContent />;
}
