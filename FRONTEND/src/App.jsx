import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import LandingPage from "./pages/landing";
import Register from "./components/auth/registerPage";
import Login from "./components/auth/loginPage";
import ForgotPswd from "./components/auth/forgotPswdPage";
import ResetCode from "./components/auth/verifyResetCode";
import ResetPswd from "./components/auth/resetPswd";
import ProtectedRoute from "./components/protectedRoute";
import AdminRoles from "./pages/adminRoles";
import UserDetail from "./pages/userDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/auth">
        <Route path="signup" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="forgotPswd" element={<ForgotPswd />}></Route>
        <Route path="verifyResetCode" element={<ResetCode />}></Route>
        <Route path="resetPswd" element={<ResetPswd />}></Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="users">
            <Route index element={<AdminRoles />} />
            <Route path=":userId" element={<UserDetail />}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
