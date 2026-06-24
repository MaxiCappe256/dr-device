import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Error from '../shared/Error';
import { useCreateRole, useUpdateRole } from '../../../hooks/useRoles';
import { usePermissions } from '../../../hooks/usePermissions';
import { SecurityIcon } from '../../../utils/icons';

export default function RolesList({ roles, isLoading }) {
  const [editingRole, setEditingRole] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isEdit = !!editingRole;
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();
  const { data: permissionsData, isLoading: permissionsLoading } = usePermissions();

  const mutation = isEdit ? updateMutation : createMutation;
  const { mutateAsync, isPending, error: mutationError } = mutation;

  const permissions = permissionsData ?? [];
  const selectedPermissions = watch('permissions') ?? [];
  const title = editingRole?.title;

  useEffect(() => {
    if (editingRole) {
      reset({
        title: editingRole.title,
        permissions: editingRole.permissions?.map((p) => p.id) ?? [],
      });
    } else {
      reset({ title: '', permissions: [] });
    }
  }, [editingRole, reset]);

  const onSubmit = async (data) => {
    if (isEdit && (data.title === title)) {
      await mutateAsync({ id: editingRole.id, permissions: data.permissions ?? [] });
    }
    else if (isEdit) {
      await mutateAsync({ id: editingRole.id, title: data.title, permissions: data.permissions ?? [] });
    }
    else {
      await mutateAsync({ title: data.title, permissions: data.permissions ?? [] });
    }
    setEditingRole(null);
    setShowCreateModal(false);
  };

  const handleClose = () => {
    setEditingRole(null);
    setShowCreateModal(false);
  };

  const handleOpenCreate = () => {
    setShowCreateModal(true);
  };

  const showModal = showCreateModal || editingRole;
  const modalTitle = isEdit ? 'Editar rol' : 'Crear rol';

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Roles del sistema</h2>

      {isLoading ? (
        <p className="text-lg text-tertiary">Cargando roles...</p>
      ) : !roles?.length ? (
        <p className="text-lg text-tertiary">No hay roles registrados.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-surface-container-highest">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-container-highest bg-surface-container">
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-tertiary">Título</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-tertiary">Permisos</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  onClick={() => setEditingRole(role)}
                  className="border-b border-surface-container-highest last:border-b-0 hover:bg-surface-container-low cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 text-lg font-medium text-on-surface capitalize">{role.label || role.title}</td>
                  <td className="px-6 py-4 text-lg text-tertiary">
                    {role.permissions?.length || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Button variant="primary" onClick={handleOpenCreate} className="mt-6">
        Crear rol
      </Button>

      {showModal && (
        <Modal title={modalTitle} onClose={handleClose}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <label htmlFor="title" className="text-lg font-medium text-tertiary">
              Título
            </label>
            <Input
              name="title"
              type="text"
              icon={<SecurityIcon height='24'/>}
              placeholder="Ej: supervisor"
              {...register('title', { required: 'El título es obligatorio' })}
            />
            {errors.title && <Error message={errors.title.message} />}

            <label htmlFor="name" className="text-lg font-medium text-tertiary">
              Permisos
            </label>
              {mutationError?.response?.data && (
                <Error message={mutationError.response.data.message} />
              )}
              {permissionsLoading ? (
                <p className="text-lg text-tertiary">Cargando permisos...</p>
              ) : (
                <div className="max-h-60 overflow-y-auto rounded-lg border border-surface-container-highest p-4 space-y-2">
                  {permissions.map((perm) => {
                    const isChecked = selectedPermissions?.includes(perm.id);

                    return (
                      <label
                        key={perm.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${isChecked ? 'bg-primary-soft' : 'hover:bg-surface-container-low'}`}
                      >
                        <input
                          type="checkbox"
                          value={perm.id}
                          {...register('permissions')}
                          className="size-5 accent-primary"
                        />
                        <span className="text-base font-medium text-on-surface">{perm.action}</span>
                      </label>
                    );
                  })}
                </div>
              )}

            <div className="flex gap-4">
              <Button variant="outline" type="button" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" loading={isPending}>
                {isEdit ? 'Guardar cambios' : 'Crear rol'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
