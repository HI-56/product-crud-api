import { useEffect, useState } from "react";
import Card from "../components/userCard";
import { Outlet } from "react-router-dom";
import axios from "axios";

export default function AdminRoles() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [thisPage, setThisPage] = useState(1);
  thisPage;

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users?page=${page}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setUsers(response.data.users);
      setThisPage(response.data.page);
      console.log(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, [page]);
  return (
    <>
      {" "}
      <p className="px-6 text-2xl text-white">manage users</p>
      <div className="my-10 mx-3">
        <div className="flex flex-row justify-end px-5 gap-8 text-white mb-5">
          <span
            className="border border-cyan-400 rounded-2xl cursor-pointer px-5 pb-1"
            onClick={() => {
              if (page > 1) {
                setPage((prev) => prev - 1);
              }
            }}
          >
            prev
          </span>
          <span>Page N°{thisPage}</span>
          <span
            className="border border-cyan-400 rounded-2xl cursor-pointer px-5 pb-1"
            onClick={() => {
              if (users.length === 6) {
                setPage((prev) => prev + 1);
              }
            }}
          >
            next
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {users.map((user) => {
            return <Card key={user._id} user={user} />;
          })}
        </div>
      </div>
    </>
  );
}
