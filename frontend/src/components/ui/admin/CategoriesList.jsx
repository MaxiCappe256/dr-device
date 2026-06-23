import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Error from '../shared/Error';
import { useCreateCategory, useUpdateCategory } from '../../../hooks/useCategories';

export default function CategoriesList({ categories, isLoading }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isEdit = !!editingCategory;
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const mutation = isEdit ? updateMutation : createMutation;
  const { mutateAsync, isPending, error: mutationError } = mutation;

  useEffect(() => {
    if (editingCategory) {
      reset({ name: editingCategory.name, description: editingCategory.description });
    } else {
      reset({ name: '', description: '' });
    }
  }, [editingCategory, reset]);

  const onSubmit = async (data) => {
    if (isEdit) {
      await mutateAsync({ id: editingCategory.id, ...data });
    } else {
      await mutateAsync(data);
    }
    setEditingCategory(null);
    setShowCreateModal(false);
  };

  const handleClose = () => {
    setEditingCategory(null);
    setShowCreateModal(false);
  };

  const handleOpenCreate = () => {
    setShowCreateModal(true);
  };

  const showModal = showCreateModal || editingCategory;
  const modalTitle = isEdit ? 'Editar categoría' : 'Crear categoría';

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Categorías del sistema</h2>

      {isLoading ? (
        <p className="text-lg text-tertiary">Cargando categorías...</p>
      ) : !categories?.length ? (
        <p className="text-lg text-tertiary">No hay categorías registradas.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-surface-container-highest">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-container-highest bg-surface-container">
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-tertiary">Nombre</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wide text-tertiary">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  onClick={() => setEditingCategory(cat)}
                  className="border-b border-surface-container-highest last:border-b-0 hover:bg-surface-container-low cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 text-lg font-medium text-on-surface">{cat.name}</td>
                  <td className="px-6 py-4 text-lg text-tertiary">{cat.description || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Button variant="primary" onClick={handleOpenCreate} className="mt-6">
        Crear categoría
      </Button>

      {showModal && (
        <Modal title={modalTitle} onClose={handleClose}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {mutationError?.response?.data && (
              <Error message={mutationError.response.data.message} />
            )}

            <label className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Nombre</span>
              <Input
                type="text"
                placeholder="Ej: Tablet"
                {...register('name', { required: 'El nombre es obligatorio' })}
              />
              {errors.name && <Error message={errors.name.message} />}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-wide text-on-surface">Descripción</span>
              <Input
                type="text"
                placeholder="Ej: Diagnóstico y reparación de tablets"
                {...register('description', { required: 'La descripción es obligatoria' })}
              />
              {errors.description && <Error message={errors.description.message} />}
            </label>

            <div className="flex gap-4">
              <Button variant="outline" type="button" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" loading={isPending}>
                {isEdit ? 'Guardar cambios' : 'Crear categoría'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
