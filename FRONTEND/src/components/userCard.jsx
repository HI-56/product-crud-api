import { useNavigate } from "react-router-dom";

export default function Card({ user }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="border border-cyan-400 rounded-2xl flex flex-col justify-center  gap-5 py-4 px-7 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        onClick={() => navigate(`/app/users/${user._id}`)}
      >
        <p className="text-white text-lg ">Name : {user.name}</p>
        <p className="text-white text-lg ">Email : {user.email} </p>
        {user.phone && (
          <p className="text-white text-lg ">Phone : {user.phone} </p>
        )}
      </div>
    </>
  );
}
