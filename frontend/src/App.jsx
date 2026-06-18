import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Home from "./pages/Home.jsx";
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import ProtectedAuth from "./components/auth/ProtectedAuth.jsx";
import Account from "./pages/Account/Account.jsx";
import AccountLayout from "./components/layouts/AccountLayout.jsx";
import MainLayout from "./components/layouts/MainLayout.jsx";
import AccountSpecializations from "./pages/Account/AccountSpecializations.jsx";
import TechnicianGuard from "./components/auth/TechnicianGuard.jsx";
import Orders from "./pages/Orders/Orders.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<ProtectedAuth />}>
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<Account />} />
          <Route element={<TechnicianGuard />}>
            <Route
              path="specializations"
              element={<AccountSpecializations />}
            />
          </Route>
          <Route path="orders" element={<Orders />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
