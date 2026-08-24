import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// same status rule your script.js used in submitProducts()
function statusFromStock(stock) {
  const s = parseInt(stock);
  if (s > 15) return "Active";
  if (s > 0) return "Low Stock";
  return "Out of Stock";
}

// useEffect(async ()=>{
// const token = localStorage.getItem("token");
// const response = axios.post()
// },[token])

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filtration, setFiltration] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [thisPage, setThisPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setcategory] = useState("");
  const [status, setStatus] = useState("");
  const [inCount, setInCount] = useState(0);
  const [lowCount, setLowCount] = useState(0);
  const [outCount, setOutCount] = useState(0);

  const getProducts = async () => {
    try {
      const params = new URLSearchParams();

      params.set("page", page);
      params.set("limit", 7);

      if (category) {
        params.set("category", category);
      }

      if (search) {
        params.set("search", search);
      }

      if (status) {
        params.set("status", status);
      }

      const response = await axios.get(
        `http://localhost:3000/api/v1/products/?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      navigate(`/app/products/?${params.toString()}`);
      setProducts(response.data.data);
      setThisPage(response.data.page);
      setInCount(response.data.totalProducts);
      setLowCount(response.data.LowStockProducts);
      setOutCount(response.data.OutOfStockProducts);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/landing");
      }
    }
  };
  useEffect(() => {
    getProducts();
  }, [page, search, category, status]);

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const [updateForm, setUpdateForm] = useState({
    name: "",
    category: "",
    price: "",
  });
  async function handleAddSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/products",

        {
          name: form.name,
          category: form.category,
          price: form.price,
          stock: form.stock,
          status: statusFromStock(form.stock),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      getProducts();
      setForm({ name: "", category: "", price: "", stock: "" });
      setShowAdd(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  function openUpdate(product) {
    setEditingId(product._id);
    setUpdateForm({
      name: product.name,
      category: product.category,
      price: product.price,
    });
    setShowUpdate(true);
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/products/${editingId}`,
        updateForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      await getProducts();
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
        `http://localhost:3000/api/v1/products/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      getProducts();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="text-white">
      <div className="flex justify-between items-center px-5 h-20 border-b border-muted">
        <div>
          <h5 className="text-xl font-bold">Products</h5>
          <p className="text-muted">
            Manage your inventory, pricing, and stock levels.
          </p>
        </div>
        <h5 className="text-muted mr-3">
          <i className="fa-regular fa-bell"></i>
        </h5>
      </div>

      <div className="p-2.5">
        <div className="flex justify-between items-center m-2.5 flex-wrap gap-2">
          <div className="flex flex-wrap">
            <input
              type="text"
              placeholder="Search by product name..."
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
            className="bg-active text-white font-semibold rounded-[10px] px-4 py-2.5"
          >
            + Add Product
          </button>
        </div>

        <table className="w-full border-collapse my-5 rounded-xl overflow-hidden">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No Product Found !!
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-300 even:bg-slate-800/70 hover:bg-active cursor-pointer"
                >
                  <td className="p-3">{p._id.slice(-4)}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.price} DH</td>
                  <td className="p-3">{p.stock} unity</td>
                  <td className="p-3">{p.status}</td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setDeletingId(p._id);
                        setShowDelete(true);
                      }}
                      className="text-red-500 border border-red-500 rounded-lg text-xs px-2 py-1 mr-2 hover:bg-red-500 hover:text-white"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <button
                      onClick={() => openUpdate(p)}
                      className="text-sky-400 border border-sky-400 rounded-lg text-xs px-2 py-1 hover:bg-sky-400 hover:text-white"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="mb-8">
          <div className="flex flex-row justify-end px-5 gap-8">
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
                if (products.length === 7) {
                  setPage((prev) => prev + 1);
                }
              }}
            >
              next
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-12 flex-wrap">
          <div className="h-20 w-75 bg-bg border border-muted rounded-[20px] flex items-center gap-10 px-5">
            <i className="fa-regular fa-circle-check text-2xl text-greeny rounded-full shadow-[0_0_5px_10px_#22c55e70]"></i>
            <div>
              <p className="text-muted">In Stock</p>
              <p className="text-white text-xl font-bold">{inCount} Items</p>
            </div>
          </div>
          <div className="h-20 w-75 bg-bg border border-muted rounded-[20px] flex items-center gap-10 px-5">
            <i className="fa-solid fa-triangle-exclamation text-2xl text-yellowy rounded-full shadow-[0_0_5px_10px_#f59f0b6e]"></i>
            <div>
              <p className="text-muted">Low Stock Alerts</p>
              <p className="text-white text-xl font-bold">{lowCount} Items</p>
            </div>
          </div>
          <div className="h-20 w-75 bg-bg border border-muted rounded-[20px] flex items-center gap-10 px-5">
            <i className="fa-solid fa-circle-exclamation text-2xl text-redy rounded-full shadow-[0_0_5px_10px_#9e182373]"></i>
            <div>
              <p className="text-muted">Out of Stock</p>
              <p className="text-white text-xl font-bold">{outCount} Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add product modal — replaces .pro-add-popup, shown/hidden with style.cssText before */}
      {showAdd && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}
        >
          <form
            onSubmit={handleAddSubmit}
            className="grid rounded-[20px] p-10 w-125 bg-white text-lg gap-3 text-black"
          >
            <h5 className="text-center mb-8 text-active text-xl font-bold">
              Adding new Product
            </h5>
            <label>
              Product name :
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="ml-10 border rounded-md"
              />
            </label>
            <label>
              Product category :
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="ml-10 border rounded-md"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Home & Decor">Home & Decor</option>
                <option value="Fashion">Fashion</option>
              </select>
            </label>
            <label>
              Product price :
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="ml-10 border rounded-md"
              />
            </label>
            <label>
              Stock :
              <input
                type="number"
                required
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="ml-10 border rounded-md"
              />
            </label>
            <button
              type="submit"
              className="bg-active text-white font-semibold rounded-[10px] py-2.5"
            >
              + Add Product
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

      {/* Update product modal — replaces .pro-update-popup */}
      {showUpdate && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setShowUpdate(false)}
        >
          <form
            onSubmit={handleUpdateSubmit}
            className="grid rounded-[20px] p-10 w-125 bg-white text-lg gap-3 text-black"
          >
            <h5 className="text-center mb-8 text-active text-xl font-bold">
              Updating Product
            </h5>
            <label>
              Product name :
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
              Product category :
              <select
                required
                value={updateForm.category}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, category: e.target.value })
                }
                className="ml-10 border rounded-md"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Home & Decor">Home & Decor</option>
                <option value="Fashion">Fashion</option>
              </select>
            </label>
            <label>
              Product price :
              <input
                type="number"
                required
                value={updateForm.price}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, price: e.target.value })
                }
                className="ml-10 border rounded-md"
              />
            </label>
            <button
              type="submit"
              className="bg-active text-white font-semibold rounded-[10px] py-2.5"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setShowUpdate(false)}
              className="border border-red-600 text-red-600 rounded py-1"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      {showDelete && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setShowDelete(false)}
        >
          <div className="bg-white rounded-3xl text-lg h-42 w-110 text-black py-10 px-7 gap-6 flex flex-col justify-center items-center">
            <p>are you sure you want to delete this product </p>
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
  );
}
