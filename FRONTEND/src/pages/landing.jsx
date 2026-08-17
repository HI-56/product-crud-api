import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-bg min-h-screen ">
        <div className="flex flex-row justify-between px-10 pt-5">
          <span className="text-3xl font-bold text-cyan-400">Inventra</span>
          <Link to="/auth/login">
            <button className="text-base font-semibold border border-blue-400 bg-blue-400/15 rounded-xl px-3 pb-0.5  hover:bg-blue-600/40 hover:text-white text-cyan-400 transition-all duration-300 cursor-pointer">
              Login
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-7 items-center mt-40 px-10 text-center md:px-50">
          <p className="text-4xl font-bold text-white ">
            Know what's on the shelf. Before it's gone.
          </p>
          <p className="text-gray-400/35 text-2xl">
            Inventra tracks every unit across every location, flags what's
            running low, and reorders before you run out.
          </p>
          <Link to="/auth/signup">
            <button className="text-base font-semibold border border-blue-400 bg-blue-400/15 rounded-xl px-3 p-1 mt-10  hover:bg-blue-600/40 hover:text-white text-cyan-400 transition-all duration-300 cursor-pointer">
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
