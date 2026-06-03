import { Link } from "react-router";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl text-on-surface font-semibold">
        Inicia sesión
      </h1>
      <LoginForm />
      <p className="text-center text-lg">
        ¿No tenes cuenta?{" "}
        <Link
          className="text-primary font-semibold hover:underline"
          to="/auth/register"
        >
          Registrate
        </Link>
      </p>
    </div>
  );
}
