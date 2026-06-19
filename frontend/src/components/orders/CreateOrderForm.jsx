import { useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  CheckIcon,
  DesktopIcon,
  GameConsoleIcon,
  LaptopIcon,
  SmartPhoneIcon,
  ToolKitIcon,
} from "../../utils/icons";
import {
  CATEGORY_NOTEBOOK,
  CATEGORY_PANTALLA,
  CATEGORY_PC,
  CATEGORY_TELEFONO,
} from "../../constants/categoryIcons";
import Button from "../ui/shared/Button";
import Error from "../ui/shared/Error";
import { useCategories } from "../../hooks/useCategories";
import { useOrders } from "../../hooks/useOrders";

const categoryUiById = {
  [CATEGORY_TELEFONO]: {
    label: "Celulares",
    description: "Problemas de pantalla, batería, carga o rendimiento.",
    icon: SmartPhoneIcon,
  },
  [CATEGORY_NOTEBOOK]: {
    label: "Notebook",
    description: "Equipos portátiles, bisagras, teclado, sistema o hardware.",
    icon: LaptopIcon,
  },
  [CATEGORY_PANTALLA]: {
    label: "Consola",
    description: "PlayStation, Xbox, controles, puertos o fallas de imagen.",
    icon: GameConsoleIcon,
  },
  [CATEGORY_PC]: {
    label: "PC de escritorio",
    description: "Gabinetes, fuentes, placas, limpieza o armado de equipos.",
    icon: DesktopIcon,
  },
};

export default function CreateOrderForm({ onSubmit }) {
  const { createOrderMutation } = useOrders();
  const { getCategories } = useCategories();
  const { data: categoriesData = [], isPending: categoriesIsPending } =
    getCategories;

  const categories = categoriesData.map((category) => {
    const categoryUi = categoryUiById[category.id] ?? {};

    return {
      ...category,
      label: categoryUi.label ?? category.name,
      description: category.description ?? categoryUi.description,
      icon: categoryUi.icon ?? ToolKitIcon,
    };
  });

  const labelRefs = useRef({});
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category_id: "",
    },
  });

  const selectedCategory = useWatch({ control, name: "category_id" });
  const categoryField = register("category_id", {
    required: "Seleccioná una categoría para crear la orden",
  });

  const submitOrder = async (formData) => {
    try {
      await createOrderMutation.mutateAsync(formData);
      onSubmit?.(formData);
      reset();
    } catch {
      // React Query conserva el error en createOrderMutation.error.
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitOrder)}
      className="grid gap-8 rounded-2xl border border-surface-container-highest bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-lg font-medium text-tertiary"
            >
              Título
            </label>
            <input
              id="title"
              type="text"
              placeholder="Cambio de pantalla"
              aria-invalid={Boolean(errors.title)}
              className="w-full rounded-lg border border-tertiary-container p-3 outline-none transition-colors focus:border-primary"
              {...register("title", {
                required: "El título es obligatorio",
                minLength: {
                  value: 3,
                  message: "El título debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El título no puede superar los 100 caracteres",
                },
              })}
            />
            {errors.title && <Error message={errors.title.message} />}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-lg font-medium text-tertiary"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows="5"
              placeholder="Describí el problema, cuándo empezó y cualquier detalle útil para el técnico."
              aria-invalid={Boolean(errors.description)}
              className="w-full resize-none rounded-lg border border-tertiary-container p-3 outline-none transition-colors focus:border-primary"
              {...register("description", {
                required: "La descripción es obligatoria",
                minLength: {
                  value: 5,
                  message: "La descripción debe tener al menos 5 caracteres",
                },
                maxLength: {
                  value: 255,
                  message: "La descripción no puede superar los 255 caracteres",
                },
              })}
            />
            {errors.description && (
              <Error message={errors.description.message} />
            )}
          </div>
        </div>

        <fieldset className="space-y-4">
          <div>
            <legend className="text-lg font-medium text-tertiary">
              Categoría
            </legend>
            <p className="mt-1 text-sm text-tertiary/70">
              Elegí el tipo de dispositivo.
            </p>
          </div>

          {categoriesIsPending ? (
            <p className="rounded-2xl border border-surface-container-highest bg-surface-container-lowest p-5 text-center text-tertiary">
              Cargando categorías...
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                const CategoryIcon = category.icon;

                return (
                  <label
                    key={category.id}
                    htmlFor={category.id}
                    ref={(element) => {
                      labelRefs.current[category.id] = element;
                    }}
                    className={`relative flex cursor-pointer flex-col items-center rounded-2xl border p-5 text-center transition-colors select-none ${isSelected
                      ? "border-primary bg-surface-container shadow-sm"
                      : "border-surface-container-highest bg-surface-container-lowest hover:border-primary/40"
                      } focus:outline-none`}
                  >
                    <input
                      id={category.id}
                      type="radio"
                      value={category.id}
                      className="sr-only"
                      checked={isSelected}
                      name={categoryField.name}
                      ref={categoryField.ref}
                      onBlur={categoryField.onBlur}
                      onChange={(event) => {
                        categoryField.onChange(event);
                        labelRefs.current[category.id]?.focus();
                      }}
                    />

                    {isSelected && (
                      <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary">
                        <CheckIcon height="16" />
                      </span>
                    )}

                    <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
                      <CategoryIcon height="30" />
                    </span>

                    <h3 className="mb-2 text-xl font-semibold text-primary">
                      {category.label}
                    </h3>
                    <p className="max-w-56 text-sm font-medium leading-6 text-tertiary">
                      {category.description}
                    </p>
                  </label>
                );
              })}
            </div>
          )}

          {errors.category_id && <Error message={errors.category_id.message} />}
        </fieldset>
      </div>

      <div className="flex flex-col items-end gap-2">
        {createOrderMutation.isError && (
          <Error
            message={
              createOrderMutation.error?.response?.data?.message ??
              "No se pudo crear la orden"
            }
          />
        )}
        <Button
          variant="primary"
          type="submit"
          loading={isSubmitting || createOrderMutation.isPending}
          className="md:max-w-64"
        >
          Crear orden
        </Button>
      </div>
    </form>
  );
}
