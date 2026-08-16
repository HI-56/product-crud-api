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

export default function App() {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/signup" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgotPswd" element={<ForgotPswd />}></Route>
      <Route path="/verifyResetCode" element={<ResetCode />}></Route>
      <Route path="/resetPswd" element={<ResetPswd />}></Route>

      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
      </Route>
    </Routes>
  );
}
