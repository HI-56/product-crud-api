import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function EditUsersInfo({ open, setOpen, endPoint }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const updateInfo = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/${endPoint}`,
        { name, email, phone, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateInfo();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex  items-center justify-center z-50">
          <form
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-bg mx-4 flex flex-col gap-4 items-start"
            onSubmit={handleSubmit}
          >
            <div className=" w-full">
              <label htmlFor="name">Full Name :</label>{" "}
              <input
                type="text"
                name="name"
                id="name"
                className="border my-1 p-1 rounded-lg w-full  focus:border-active focus:border-2 border-active outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" w-full">
              <label htmlFor="email">Email :</label>{" "}
              <input
                type="email"
                name="email"
                id="email"
                className="border my-1 p-1 rounded-lg w-full  focus:border-active focus:border-2 border-active outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>{" "}
            <div className=" w-full">
              <label htmlFor="role">Role :</label>{" "}
              <input
                type="text"
                name="role"
                id="role"
                className="border my-1 p-1 rounded-lg w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:border-active focus:border-2 border-active outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className=" w-full">
              <label htmlFor="phone">Phone Number :</label>{" "}
              <input
                type="number"
                name="phone"
                id="phone"
                className="border my-1 p-1 rounded-lg w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:border-active focus:border-2 border-active outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-center gap-30 w-full mt-10">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
                className="border border-red-600 rounded-xl text-red-600 cursor-pointer px-2  bg-red-600/25"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="border border-blue-600 rounded-xl text-blue-600 cursor-pointer px-2  bg-blue-600/25"
              >
                {loading ? "Sending" : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
