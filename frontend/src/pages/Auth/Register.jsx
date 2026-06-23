import { Link, useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useAuth";
import RegisterForm from "../../components/auth/RegisterForm";
import RegisterRoleForm from "../../components/auth/RegisterRoleForm";
import RegisterSummaryForm from "../../components/auth/RegisterSummaryForm";
import Stepper from "../../components/ui/shared/Stepper";

const Register = () => {
  const methods = useForm()
  const { handleSubmit } = methods
  const registerMutation = useRegister()
  const navigate = useNavigate();

  const onSubmit = (credentials) => {
    registerMutation.mutateAsync(credentials, {
      onSuccess: () => navigate('/')
    })
  }

  const steps = [
    {
      id: 1,
      label: "Datos personales",
      Component: RegisterForm,
      fields: ["full_name", "phone", "email", "password"]
    },
    {
      id: 2,
      label: "Seleccionar rol",
      Component: RegisterRoleForm,
      fields: ["role_id"]
    },
    {
      id: 3,
      label: "Confirmación",
      Component: RegisterSummaryForm
    }
  ];

  
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-on-surface font-semibold">
            Crear nueva cuenta
          </h1>
          <p className="text-tertiary text-lg font-light max-lg:text-md">
            Crea tu cuenta en Dr Device y accede a una red de técnicos especializados para resolver problemas en tus dispositivos de forma rápida, segura y confiable.
          </p>
        </div>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <Stepper steps={steps} extra={{loading: registerMutation.isPending, error: registerMutation?.error?.response?.data}}/>
        </form>
        <p className="text-center text-lg">
          ¿Ya tenés una cuenta?{" "}
          <Link
            className="text-primary font-semibold hover:underline"
            to="/auth/login"
          >
            Inicia sessión
          </Link>
        </p>
      </div>
    </FormProvider>
  );
};

export default Register;
