import { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { useDeleteUser } from '../../../hooks/useUsers';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function UsersByRole({ role, users, isLoading }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutateAsync, isPending } = useDeleteUser();
  const { user: currentUser } = useAuthContext();

  const filtered = users?.filter((user) =>
    user.Roles?.some((r) => r.id === role?.id) &&
    !user.Roles?.some((r) => r.title === 'admin'),
  );

  const isSelf = currentUser?.data?.id === selectedUser?.id;

  const handleDelete = async () => {
    if (!selectedUser) return;
    await mutateAsync(selectedUser.id);
    setSelectedUser(null);
    setConfirmDelete(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6 uppercase">
        {role?.title}s
      </h2>
      {isLoading ? (
        <p className="text-lg text-tertiary">Cargando usuarios...</p>
      ) : !filtered?.length ? (
        <p className="text-lg text-tertiary">No hay usuarios con este rol.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-surface-container-highest">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-container-highest bg-surface-container">
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-tertiary">Nombre</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-tertiary">Email</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-tertiary">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="border-b border-surface-container-highest last:border-b-0 hover:bg-surface-container-low cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 text-lg font-medium text-on-surface">{user.full_name}</td>
                  <td className="px-6 py-4 text-lg text-tertiary">{user.email}</td>
                  <td className="px-6 py-4 text-lg text-tertiary">{user.phone || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && !confirmDelete && (
        <Modal title={selectedUser.full_name} onClose={() => setSelectedUser(null)}>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-surface-container p-4">
                <label className="text-sm font-bold uppercase tracking-wide text-tertiary">Email</label>
                <p className="mt-1 text-lg text-on-surface">{selectedUser.email}</p>
              </div>
              <div className="rounded-lg bg-surface-container p-4">
                <label className="text-sm font-bold uppercase tracking-wide text-tertiary">Teléfono</label>
                <p className="mt-1 text-lg text-on-surface">{selectedUser.phone || '—'}</p>
              </div>
            </div>

            <div className="rounded-lg bg-surface-container p-4">
              <label className="text-sm font-bold uppercase tracking-wide text-tertiary">Roles</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedUser.Roles?.length ? (
                  selectedUser.Roles.map((role) => (
                    <span key={role.id} className="rounded-full bg-primary-soft px-4 py-1 text-sm font-medium text-primary capitalize">
                      {role.label || role.title}
                    </span>
                  ))
                ) : (
                  <p className="text-lg text-tertiary">Sin roles asignados</p>
                )}
              </div>
            </div>

            <Button
              variant="danger"
              onClick={() => setConfirmDelete(true)}
              className="text-white"
            >
              {isSelf ? 'Darte de baja' : 'Eliminar usuario'}
            </Button>
          </div>
        </Modal>
      )}

      {selectedUser && confirmDelete && (
        <Modal title="Eliminar usuario" onClose={() => { setConfirmDelete(false); setSelectedUser(null); }}>
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">
                ¿Estás seguro de eliminar a {selectedUser.full_name}?
              </h3>
              <p className="text-lg text-tertiary">
                El usuario quedará suspendido por 30 días. Podrá reactivar su
                cuenta iniciando sesión nuevamente dentro de ese período.
              </p>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setConfirmDelete(false)}>
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                loading={isPending}
                className="text-white"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
