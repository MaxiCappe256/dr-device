import { Link, useSearchParams } from "react-router";
import RegisterForm from "../../components/auth/RegisterForm";
import { useFormContext } from "react-hook-form";
import Stepper from "../../components/ui/Stepper";
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";


const ComponentePrueba = ({ onBack, onNext }) => {
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role')
  const { register, formState: { errors } } = useFormContext()

  return (
    <>
      <Input
        id="mama_de_eze"
        type="text"
        {...register("mama_de_eze", { required: true })}
        placeholder="Que opinas de mi mama?"
      />
      <Button variant="outline" onClick={onBack}>Volver</Button>
      <Button variant="primary" onClick={onNext}>Siguiente</Button>
      <span>Rol: {role === "tech" ? 'Seleccionaste TECNICO' : 'Seleccionaste USUARIO'}</span>
    </>
  )
}

const ComponentePrueba2 = ({ onBack }) => {
  return (
    <>
      <Button variant="primary" type="submit">
        Enviar full picado anasheeeeeeeee
      </Button>
    </>
  )
}

const Register = () => {
  const methods = useForm()
  const { register, handleSubmit, formState: { errors }, getValues } = methods
  const steps = [
    {
      id: 1,
      label: "Datos personales",
      Component: RegisterForm
    },
    {
      id: 2,
      label: "Seleccionar rol",
      Component: ComponentePrueba
    },
    {
      id: 3,
      label: "Confirmación",
      Component: ComponentePrueba2
    }
  ];

  useEffect(() => {
    console.log(errors)
  }, [errors])


  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-on-surface font-semibold">
            Crear nueva cuenta
          </h1>
          <p className="text-tertiary font-light">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            laboriosam dolor, obcaecati illum qui nobis voluptate dolorem.
          </p>
        </div>
        <form className="space-y-2" onSubmit={handleSubmit((data) => console.log(data))}>
          <Stepper steps={steps} />
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
