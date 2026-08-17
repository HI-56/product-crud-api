import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useEffect } from "react";
import axios from "axios";

const navItems = [
  { to: "/app", icon: "fa-solid fa-chart-pie", label: "Dashboard" },
  { to: "/app/products", icon: "fa-brands fa-trello", label: "Products" },
  { to: "/app/orders", icon: "fa-solid fa-cart-arrow-down", label: "Orders" },
  { to: "/app/customers", icon: "fa-solid fa-user-group", label: "Customers" },
  {
    to: "/app/analytics",
    icon: "fa-solid fa-chart-column",
    label: "Analytics",
  },
];

const bottomItems = [
  { to: "/app/settings", icon: "fa-solid fa-gear", label: "Settings" },
  { to: "/app/roles", icon: "fa-solid fa-users-gear", label: "Admin Roles" },
];

function NavItem({ to, icon, label }) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          `flex items-center gap-4 h-10.5 w-47.5 px-4 my-2 rounded-md text-[15px] cursor-pointer transition-colors relative
           ${
             isActive
               ? "text-active bg-hover before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-2.5 before:-translate-x-0.75 before:rounded-full before:bg-active before:-z-10"
               : "text-muted hover:text-active hover:bg-hover"
           }`
        }
      >
        <i className={icon}></i>
        <span>{label}</span>
      </NavLink>
    </li>
  );
}

export default function Sidebar() {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  return (
    <nav className="fixed h-screen w-62.5 bg-bg text-muted">
      <ul className="text-center list-none w-55 mx-auto mt-2.5 mb-5 p-1.5 text-[13px] rounded-[10px]">
        <li className="text-xl font-bold text-white">Admin Panel</li>
        <li className="text-muted">eCommerce Pro</li>
      </ul>

      <ul className="list-none text-[10px] font-medium px-2">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
        <p className="mt-4 mb-2 pl-4 text-xs">MANAGMENT</p>
        {bottomItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </ul>

      <div className="absolute bottom-3.75 left-5 right-5 flex items-center justify-around bg-hover rounded-[10px] p-1.5 text-[10px]">
        <ul className="list-none text-center text-[13px]">
          {<li className="font-bold text-white">{user?.name}</li>}
          {<li>{user?.role}</li>}
        </ul>
        <button
          className="text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
            setUser(null);
          }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </nav>
  );
}
