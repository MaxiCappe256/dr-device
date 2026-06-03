import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export default function Home() {
    const { user, loading } = useAuthContext();
    const { logoutMutation } = useAuth()

    if(loading) return <p>Cargando...</p>

    return (
        <div>
            Hola <b>{user?.full_name}</b>
            {user && <Button variant="inverted" type="button" onClick={logoutMutation.mutateAsync} loading={logoutMutation.isPending}>Cerrar sesión</Button>}
        </div>
    )
}
