import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        form,
      );
      setLoading(false);
      setForm({
        name: "",
        email: "",
        password: "",
      });
      console.log(response.data.token);
    } catch (err) {
      setLoading(false);
      console.log(err.response?.data);
      setErrorMsg(err.response?.data.errors[0].msg);
    }
  };
  return (
    <>
      <div className=" min-h-screen z-9999 fixed top-0 right-0 left-0 gap-5 flex flex-col justify-center items-center bg-bg ">
          <div className="text-3xl font-bold text-cyan-400 underline-offset-8 underline"><h4> SIGNUP</h4></div>
        <form
          className="flex w-1/2 flex-col gap-4 rounded-lg bg-white p-6 shadow-lg"
          onSubmit={handelSubmit}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded border p-2"
            />
          </div>

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
            {loading ? "loading" : "Register"}
          </button>
        </form>

        <div>
          <button
            className="text-base font-semibold border border-blue-400 bg-blue-400/15 rounded-xl px-3 p-1 mt-10  hover:bg-blue-600/40 hover:text-white text-cyan-400 transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/landing")}
          >
            Back to login
          </button>
        </div>
      </div>
    </>
  );
}
