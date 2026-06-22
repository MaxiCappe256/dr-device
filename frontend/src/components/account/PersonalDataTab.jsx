import Input from "../ui/shared/Input.jsx";
import Button from "../ui/shared/Button.jsx";
import Error from "../ui/shared/Error.jsx";
import { useForm } from "react-hook-form";
import { useAccount } from "../../hooks/useAccount";
import { UserIcon, EmailIcon, PhoneIcon } from "../../utils/icons.js";

export default function PersonalDataTab({ fullName, email, phone }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { updatedMutation } = useAccount();

  const onSubmit = (data) => {
    updatedMutation.mutateAsync(data);
  };

  const getMutationError = (field) =>
    updatedMutation?.error?.response?.data?.data.find(
      ({ path }) => path === field,
    )?.msg;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full gap-5 md:grid-cols-2"
    >
      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">
          Nombre completo
        </span>
        <Input
          type="text"
          {...register("full_name", {
            required: "Este campo es obligatorio.",
            maxLength: {
              value: 150,
              message: "El nombre debe contener 150 caracteres como máximo.",
            },
            minLength: {
              value: 3,
              message: "El nombre debe contener 3 caracteres como mínimo.",
            },
          })}
          defaultValue={fullName}
          icon={<UserIcon height="24" />}
        />
        {errors.full_name && <Error message={errors.full_name.message} />}
        {getMutationError("full_name") && (
          <Error message={getMutationError("full_name")} />
        )}
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">
          Correo electrónico
        </span>
        <Input
          type="email"
          defaultValue={email}
          autocomplete="on"
          icon={<EmailIcon height="24" />}
          {...register("email", {
            required: "Este campo es obligatorio.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "El correo electrónico no es válido.",
            },
          })}
        />
        {errors.email && <Error message={errors.email.message} />}
        {getMutationError("email") && (
          <Error message={getMutationError("email")} />
        )}
      </label>

      <label className="space-y-3">
        <span className="text-sm font-bold uppercase tracking-wide text-on-surface">
          Teléfono
        </span>
        <Input
          type="tel"
          icon={<PhoneIcon height="24" />}
          {...register("phone", {
            required: "Este campo es obligatorio.",
            maxLength: {
              value: 20,
              message: "El télefono debe contener 20 digitos como máximo.",
            },
            minLength: {
              value: 7,
              message: "El télefono debe contener 7 digitos como mínimo.",
            },
          })}
          defaultValue={phone}
        />
        {errors.phone && <Error message={errors.phone.message} />}
        {getMutationError("phone") && (
          <Error message={getMutationError("phone")} />
        )}
      </label>
      <div className="flex justify-end md:col-span-2">
        <Button
          variant="primary"
          type="submit"
          loading={updatedMutation.isPending}
          className="!w-auto px-8"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}
