import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [sentLoading, setSentLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const token = localStorage.getItem("token");

  if (loading) {
    return (
      <div className="bg-bg min-h-screen flex justify-center items-center text-2xl text-white">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    setSentLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        form,
      );
      setSentLoading(false);
      setForm({
        email: "",
        password: "",
      });

      setUser(response.data.user);
      setErrorMsg("");
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setSentLoading(false);
      console.log(err.response?.data);
      setErrorMsg(err.response?.data.errorMsg);
    }
  };
  return (
    <>
      <div className=" min-h-screen z-9999 fixed top-0 right-0 left-0 gap-5 flex flex-col justify-center items-center bg-bg ">
        <div className="w-1/2 bg-white flex flex-col p-3 rounded-3xl justify-center items-center">
          <div className="text-3xl font-bold text-cyan-400 underline-offset-8 underline">
            <h4> Welcome Back</h4>
          </div>
          <form
            className="flex  flex-col gap-4 rounded-lg bg-white p-6 shadow-lg w-full"
            onSubmit={handelSubmit}
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded border p-2"
              />
            </div>
            {errorMsg && <div className="text-red-500">{errorMsg}</div>}
            <button
              type="submit"
              disabled={loading}
              className={`rounded bg-blue-500 p-2 text-white cursor-pointer ${loading ? "bg-blue-500/40" : ""}`}
            >
              {sentLoading ? "loading" : "Login"}
            </button>
          </form>{" "}
          <p
            className="text-blue-600 hover:underline underline-offset-4 cursor-pointer pt-5"
            onClick={() => navigate("/auth/forgotPswd")}
          >
            Forgot password
          </p>
        </div>
      </div>
    </>
  );
}
