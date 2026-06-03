import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Home from "./pages/Home.jsx";
import AuthLayout from "./components/layouts/AuthLayout.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<Home />}/>
    </Routes>
  );
};

export default App;
