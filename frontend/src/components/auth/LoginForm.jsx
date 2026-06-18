import { EmailIcon, LockIcon } from "../../utils/icons";
import { useForm } from "react-hook-form";
import { LoginIcon } from "../../utils/icons";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Error from "../ui/Error";

export default function LoginForm() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { loginMutation } = useAuth()
  const navigate = useNavigate();

  const onSubmit = (credentials) => {
    loginMutation.mutateAsync(credentials, {
      onSuccess: () => navigate('/')
    })
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>

      {loginMutation?.error?.response?.data && <Error message={loginMutation?.error?.response?.data?.message} />}
      <label htmlFor="email" className="text-lg font-medium text-tertiary">
        Correo electrónico
      </label>
      <Input
        id="email"
        type="email"
        {...register("email", {
          required: "El correo electrónico es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Ingresá un correo electrónico válido"
          }
        })}
        icon={<EmailIcon height="24" />}
        placeholder="cristiangallo@gmail.com"
      />
      {errors.email && <Error message={errors.email.message} />}
      <label htmlFor="password" className="text-lg font-medium text-tertiary">
        Contraseña
      </label>
      <Input
        id="password"
        type="password"
        {...register("password", {
          required: "La contraseña es obligatoria"
        })}
        icon={<LockIcon height="24" />}
        placeholder="* * * * * * * *"
      />
      {errors.password && <Error message={errors.password.message} />}
      <Button
        variant="primary"
        type="submit"
        className="mt-8"
        loading={loginMutation.isPending}
        iconRight={<LoginIcon height="24" />}
      >
        Iniciar sesión
      </Button>
    </form>
  );
}