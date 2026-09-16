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
  const [thisPage, setThisPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    status: "",
  });
  const [updateForm, setUpdateForm] = useState({
    name: "",
    address: "",
    phone: "",
    status: "",
  });
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const getAllCustomers = async () => {
    try {
      const params = new URLSearchParams();

      params.set("page", page);
      params.set("limit", 7);

      if (search) {
        params.set("search", search);
      }

      if (status) {
        params.set("status", status);
      }

      const response = await axios.get(
        `http://localhost:3000/api/v1/customers/?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      navigate(`/app/customers/?${params.toString()}`);

      setCustomers(response.data.data);
      setThisPage(response.data.page);
    } catch (error) {
      console.log(error.data);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, [page, search, status]);

  async function handleAddSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/customers",

        {
          name: form.name,
          address: form.address,
          phone: form.phone,
          status: form.status,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      getAllCustomers();
      setForm({ name: "", address: "", phone: "", status: "" });
      setShowAdd(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  function openUpdate(cus) {
    setEditingId(cus._id);
    setUpdateForm({
      name: cus.name,
      address: cus.address,
      phone: cus.phone,
      status: cus.status,
    });
    setShowUpdate(true);
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/customers/${editingId}`,
        {
          ...updateForm,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      await getAllCustomers();
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data);
      setError(error.response?.data);
      console.log(error.response?.status);
    }

    setShowUpdate(false);
    setEditingId(null);
  }
  async function handleRemove(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/customers/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      getAllCustomers();
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <div className="flex justify-between items-center text-white px-5 h-20 border-b border-muted">
        <div>
          <h5 className="text-xl font-bold">Customers</h5>
          <p className="text-muted">
            All your customers in one place — search, edit, or add new ones.
          </p>
        </div>
      </div>
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
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
              className="bg-bg border border-muted rounded-lg text-white m-1.5 p-1.5 focus:border-2 focus:border-active outline-none"
            >
              <option value=""> Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-active text-white font-semibold rounded-[10px] px-4 py-2.5 cursor-pointer"
          >
            + New Customer
          </button>
        </div>
        <div className="mt-5">
          {customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="h-8 w-8 text-slate-300 mb-3" />
              <p className="text-sm font-medium">No customers found</p>
            </div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-left text-slate-500">
                    <th className="px-4 py-3 font-medium">ID</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Phone</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
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
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openUpdate(c)}
                            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                            aria-label={`Edit ${c.name}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeletingId(c._id);
                              setShowDelete(true);
                            }}
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
              </table>{" "}
              <div className="mb-8 mt-5">
                <div className="flex flex-row justify-end px-5 gap-8 text-white">
                  <button
                    className="border border-cyan-400 rounded-2xl cursor-pointer px-5 pb-1"
                    onClick={() => {
                      if (page > 1) {
                        setPage((prev) => prev - 1);
                      }
                    }}
                  >
                    prev
                  </button>
                  <span>Page N°{thisPage}</span>
                  <button
                    className="border border-cyan-400 rounded-2xl cursor-pointer px-5 pb-1"
                    disabled={customers.length < 7 }
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    next
                  </button>
                </div>
              </div>{" "}
            </>
          )}
          {showAdd && (
            <div
              className="fixed inset-0 flex justify-center items-center bg-black/50"
              onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}
            >
              <form
                className="grid rounded-[20px] p-10 w-125 bg-white text-lg gap-3 text-black"
                onSubmit={handleAddSubmit}
              >
                <h5 className="text-center mb-8 text-active text-xl font-bold">
                  Adding new Customer
                </h5>
                <label>
                  Name :
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="ml-10 border rounded-md"
                  />
                </label>
                <label>
                  Phone :
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="ml-10 border rounded-md"
                  />
                </label>

                <label>
                  Adress :
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="ml-10 border rounded-md"
                  />
                </label>
                <label>
                  Status :
                  <select
                    required
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="ml-10 border rounded-md"
                  >
                    <option value=""> Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="bg-active text-white font-semibold rounded-[10px] py-2.5"
                >
                  + Add Customer
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="border border-red-600 text-red-600 rounded py-1"
                >
                  Cancel
                </button>
                {error && <div className="text-base text-red-500">{error}</div>}
              </form>
            </div>
          )}
        </div>
        {showUpdate && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black/50"
            onClick={(e) =>
              e.target === e.currentTarget && setShowUpdate(false)
            }
          >
            <form
              onSubmit={handleUpdateSubmit}
              className="grid rounded-[20px] p-10 w-125 bg-white text-lg gap-3 text-black"
            >
              <h5 className="text-center mb-8 text-active text-xl font-bold">
                Updating Customer
              </h5>
              <label>
                Name :
                <input
                  type="text"
                  required
                  value={updateForm.name}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, name: e.target.value })
                  }
                  className="ml-10 border rounded-md"
                />
              </label>

              <label>
                Address :
                <input
                  type="text"
                  required
                  value={updateForm.address}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, address: e.target.value })
                  }
                  className="ml-10 border rounded-md"
                />
              </label>
              <label>
                Phone Number :
                <input
                  type="tel"
                  value={updateForm.phone}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, phone: e.target.value })
                  }
                  className="ml-10 border rounded-md"
                />
              </label>
              <label>
                Status :
                <select
                  required
                  value={updateForm.status}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, status: e.target.value })
                  }
                  className="ml-10 border rounded-md"
                >
                  <option value="">Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
              <button
                type="submit"
                className="bg-active text-white font-semibold rounded-[10px] py-2.5 cursor-pointer"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setShowUpdate(false)}
                className="border border-red-600 text-red-600 rounded py-1 cursor-pointer"
              >
                Cancel
              </button>
              {error && <div className="text-base text-red-500">{error}</div>}
            </form>
          </div>
        )}{" "}
        {showDelete && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black/50"
            onClick={(e) =>
              e.target === e.currentTarget && setShowDelete(false)
            }
          >
            <div className="bg-white rounded-3xl text-lg h-42 w-110 text-black py-10 px-7 gap-6 flex flex-col justify-center items-center">
              <p>are you sure you want to delete this Customer </p>
              <div className="flex flex-row gap-30 text-base font-semibold">
                <button
                  onClick={() => {
                    handleRemove(deletingId);
                    setShowDelete(false);
                  }}
                  className="border border-red-400 py-0.5 px-4 rounded-xl bg-red-400/10 text-red-700 cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 "
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowDelete(false);
                    setDeletingId(false);
                  }}
                  className="border border-blue-400 py-0.5 px-4 rounded-xl bg-blue-400/10 text-blue-700 cursor-pointer  hover:bg-blue-600 hover:text-white transition-all duration-300 "
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
