import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Customers() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(1);
  const [status, setStatus] = useState(1);
  const [customers, setCustomers] = useState([]);

  const getAllCustomers = async () => {
    try {
      const params = new URLSearchParams();

      params.set("page", page);
      params.set("limit", 7);

      // if (category) {
      //   params.set("category", category);
      // }

      if (search) {
        params.set("search", search);
      }

      // if (status) {
      //   params.set("status", status);
      // }

      const response = await axios.get(
        `http://localhost:3000/api/v1/customers/?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      navigate(`/app/customers/?${params.toString()}`);
      console.log(response);
      setCustomers(response.data.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, [page, search]);

  return (
    <>
      <div className="p-6 text-white">Customers page — build this next.</div>
      <div className="p-2.5">
        <div className="flex justify-between items-center m-2.5 flex-wrap gap-2">
          <div className="flex flex-wrap">
            <input
              type="text"
              placeholder="Search by customer name..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="bg-bg border border-muted rounded-lg text-white m-1.5 p-1.5 w-62.5 focus:border-2 focus:border-active outline-none"
            />
            <select
              value={category}
              onChange={(e) => {
                setPage(1);
                setcategory(e.target.value);
              }}
              className="bg-bg border border-muted rounded-lg text-white m-1.5 p-1.5 focus:border-2 focus:border-active outline-none"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Decor">Home & Decor</option>
              <option value="Fashion">Fashion</option>
            </select>
            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
              className="bg-bg border border-muted rounded-lg text-white m-1.5 p-1.5 focus:border-2 focus:border-active outline-none"
            >
              <option value="">Stock Status</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-active text-white font-semibold rounded-[10px] px-4 py-2.5 cursor-pointer"
          >
            + Add Product
          </button>
        </div>
        <div className="mt-5">
          {customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="h-8 w-8 text-slate-300 mb-3" />
              <p className="text-sm font-medium">No customers found</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Name</th>

                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    {" "}
                    <td className="px-4 py-3 font-medium text-white">
                      {c._id.slice(-4)}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{c.phone}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          c.status === "active"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(c)}
                          className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                          aria-label={`Edit ${c.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(c)}
                          className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 cursor-pointer"
                          aria-label={`Delete ${c.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
