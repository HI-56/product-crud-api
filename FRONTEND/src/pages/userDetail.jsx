import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Edit from "../components/editUser";

export default function UserDetail() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const endpoint = userId ? userId : "me";

  const showError = (message) => {
    setError(message);

    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setUserInfo(response.data.user);
      console.log(response.data);
    } catch (error) {
      showError(error.response.data.error || "something went wrong");
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [userId]);
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        {error && (
          <div className="z-40 fixed text-red-500 text-lg  top-0 mt-7  h-16 flex justify-center items-center border border-red-400 px-5 py-1 rounded-2xl bg-red-400/5">
            <span>{error}</span>
          </div>
        )}
        <div className="text-white text-lg rounded-2xl border bg-blue-900/10 p-5 w-2/3">
          <div className="border-b flex flex-row justify-center ">
            <div className="  flex flex-col gap-2 items-center pb-5 w-5/6">
              {userInfo.avatar ? (
                <div className="rounded-full  h-20 w-20 flex justify-center items-center font-bold">
                  <img
                    src={`http://localhost:3000/${userInfo.avatar}`}
                    alt="kan hna"
                    className="h-20 w-20 rounded-full"
                  />
                </div>
              ) : (
                <div className="rounded-full bg-blue-900/40 h-20 w-20 flex justify-center items-center font-bold">
                  <span>{userInfo.name?.slice(0, 1).toUpperCase()}</span>
                </div>
              )}
              <h1 className="mt-2 text-lg font-semibold text-white capitalize">
                {userInfo.name}
              </h1>
              <span className="mt-1 inline-block text-sm text-white font-medium uppercase tracking-wide  bg-blue-900/40 px-2 py-0.5 rounded-full">
                {userInfo.role}
              </span>
            </div>

            {endpoint === "me" ? (
              <>
                {" "}
                <div
                  className=" text-active  h-8 w-12 cursor-pointer -mr-10 rounded-xl px-2 border-active bg-active/10  "
                  onClick={() => setOpen(true)}
                >
                  edit
                </div>
                <Edit open={open} setOpen={setOpen} />
              </>
            ) : (
              ""
            )}
          </div>
          <div className="mt-5 flex flex-col ">
            <div className="flex gap-10 py-3 items-center">
              <span className="text-lg text-neutral-500">Email :</span>
              <span className="text-lg text-neutral-200 ">
                {userInfo.email}
              </span>
            </div>
            <div className="flex gap-10 items-center py-3">
              <span className="text-lg text-neutral-500">Phone : </span>
              <span className="text-lg text-neutral-200 ">
                {userInfo.phone ? userInfo.phone : "—"}
              </span>
            </div>

            <div className="flex gap-10 py-3 items-center">
              <span className="text-lg text-neutral-500">User ID :</span>
              <span className="text-base text-neutral-200 font-mono ">
                {userInfo._id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
