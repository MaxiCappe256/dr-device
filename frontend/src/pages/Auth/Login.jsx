import { Link } from "react-router";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div>
      <h1>Iniciar sesion</h1>
      <LoginForm />
      <Link to={"/auth/register"}>Registro</Link>
    </div>
  );
};

export default Login;
