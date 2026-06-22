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
import AdminGuard from "./components/auth/AdminGuard.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";
import TechnicianGuard from "./components/auth/TechnicianGuard.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import CreateOrder from "./pages/Orders/CreateOrder.jsx";
import Works from "./pages/Orders/Works.jsx";
import { ToastContainer, Bounce } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} transition={Bounce} theme="colored" />
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
              <Route path="works" element={<Works />} />
            </Route>
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="/create-order" element={<MainLayout />}>
            <Route index element={<CreateOrder />} />
          </Route>

          <Route element={<AdminGuard />}>
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Route>
        </Route>
      </Routes>
    </>

  );
};

export default App;
