import { useState, useEffect, useRef } from "react";
import axios from "axios";
export default function EditMyInfo({ open, setOpen }) {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef(null);

  const updateInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/me`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
      return true;
    } catch (error) {
      console.log(error.response.data);
      const message =
        error.response?.data?.errors?.[0]?.msg || error.response?.data?.error;
      setErrorMsg(message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const success = await updateInfo();

      if (success) {
        setOpen(false);
      }
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
            <div className="flex gap-2 flex-col items-center w-full">
              {" "}
              <div className="rounded-full  h-20 w-20 flex justify-center items-center bg-bg/35">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="h-20 w-20 rounded-full"
                  />
                ) : (
                  "Preview"
                )}
              </div>
              <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="px-2 py-0.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Choose file
              </button>
              <span className="ml-2 text-sm text-gray-500">
                {file.name || "No file chosen"}
              </span>
              <input
                ref={inputRef}
                name="avatar"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
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
            {errorMsg && (
              <div className=" w-full">
                <span className="text-red-500">{errorMsg}</span>
              </div>
            )}
            <div className="flex flex-row justify-center gap-30 w-full mt-10">
              <button
                type="button"
                onClick={() => {
                  setFile("");
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
