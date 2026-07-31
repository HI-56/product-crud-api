import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


export default function Layout() {
  return (
    <div className="flex  w-full">
      <Sidebar />
      <div className="ml-62.5 flex-1 min-h-screen bg-bg border-l border-muted">
        <Outlet />
      </div>
    </div>
  );
}
