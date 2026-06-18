import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useSpecializations } from '../../hooks/useSpecializations';
import Button from '../../components/ui/Button';
import { CheckIcon } from '../../utils/icons';
import Error from '../../components/ui/Error';

export default function AccountSpecializations() {
  const {
    user: { data },
  } = useAuthContext();

  const currentSpecializations = data?.specializations ?? [];
  const { categoriesQuery, updatedMutation } = useSpecializations();
  const categories = categoriesQuery.data ?? [];

  const [selectedIds, setSelectedIds] = useState(['asd']);

  useEffect(() => {
    if (currentSpecializations.length > 0) {
      setSelectedIds(currentSpecializations.map((s) => s.id));
    }
  }, [currentSpecializations]);

  const toggleCategory = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSave = () => {
    updatedMutation.mutate({ categories: selectedIds });
  };

  const { error } = updatedMutation;

  if (categoriesQuery.isLoading) return <p className="p-10 text-xl">Cargando...</p>;

  return (
    <section className="bg-background">
      <div className="mt-10 max-w-5xl rounded-2xl border border-surface-container-highest bg-surface-container-lowest p-10 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-primary">
          Mis especializaciones
        </h2>

        <p className="mb-8 text-lg text-tertiary">
          Selecciona las categorías en las que te especializas
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const isSelected = selectedIds.includes(category.id);

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`relative flex cursor-pointer flex-col items-center rounded-2xl border p-6 text-center transition-colors select-none ${isSelected
                  ? 'border-primary bg-surface-container shadow-sm'
                  : 'border-surface-container-highest bg-surface-container-low hover:border-primary/40'
                  }`}
              >
                {isSelected && (
                  <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary text-on-primary">
                    <CheckIcon height="16" />
                  </span>
                )}

                <h3 className="mt-2 text-xl font-semibold text-primary">
                  {category.name}
                </h3>

                {category.description && (
                  <p className="mt-2 text-sm text-tertiary">
                    {category.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {error?.response?.data?.message && (
          <div className="mt-6 rounded-xl border border-error/20 bg-error-container/60 px-5 py-3">
            <Error message={error.response.data.message} />
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button
            variant="primary"
            onClick={handleSave}
            loading={updatedMutation.isPending}
            className="max-w-60"
          >
            Guardar cambios
          </Button>
        </div>
      </div>
    </section>
  );
}