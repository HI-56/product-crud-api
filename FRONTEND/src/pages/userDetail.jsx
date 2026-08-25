import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserDetail() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setUserInfo(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-white text-lg rounded-2xl border bg-blue-900/10 p-5 w-2/3">
          <div className=" border-b flex flex-col gap-2 items-center pb-5">
            {!userInfo.avatar && (
              <div className="rounded-full bg-blue-900/40 h-18 w-18 flex justify-center items-center font-bold">
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
                {userId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
