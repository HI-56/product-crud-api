import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPswd() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/v1/auth/resetPswd",
        { newPassword ,email},
      );
      setLoading(false);
      setNewPassword("");
      console.log(response);
      localStorage.removeItem("email");
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.log(err.response?.data);
    }
  };
  return (
    <>
      <div className=" min-h-screen z-9999 fixed top-0 right-0 left-0 gap-5 flex flex-col justify-center items-center bg-bg ">
        <div className="text-3xl font-bold text-cyan-400 underline-offset-8 underline">
          <h4> change password</h4>
        </div>
        <form
          className="flex w-1/2 flex-col gap-4 rounded-lg bg-white p-6 shadow-lg"
          onSubmit={handelSubmit}
        >
          <div>
            <label htmlFor="newPassword">new Password</label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded border p-2"
            />
          </div>

          {errorMsg && <div className="text-red-500">{errorMsg}</div>}
          <button
            type="submit"
            disabled={loading}
            className={`rounded bg-blue-500 p-2 text-white cursor-pointer ${loading ? "bg-blue-500/40" : ""}`}
          >
            {loading ? "loading" : "Reset"}
          </button>
        </form>
      </div>
    </>
  );
}
