import { useState, useEffect, useMemo } from "react";
import axios from "axios";

// same status rule your script.js used in submitProducts()
function statusFromStock(stock) {
  const s = parseInt(stock);
  if (s > 15) return "Active";
  if (s > 0) return "Low Stock";
  return "Out of Stock";
}

export default function Products() {
  // 1 state array replaces the `let products = [...]` + manual innerHTML re-renders
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const [search, setSearch] = useState("");
  const [category, setcategory] = useState("");
  const [status, setStatus] = useState("");

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

  // replaces every `window.localStorage.setItem("products", ...)` call scattered
  // through script.js — this runs once, automatically, whenever products changes

  // replaces render()/TableBodyFill() + the 3 separate change listeners
  // (search, category, status) that each independently re-rendered the table
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchescategory = category ? p.category === category : true;
      const matchesStatus = status ? p.status === status : true;
      return matchesSearch && matchescategory && matchesStatus;
    });
  }, [products, search, category, status]);

  const inCount = products.length;
  const lowCount = products.filter((p) => p.status === "Low Stock").length;
  const outCount = products.filter((p) => p.status === "Out of Stock").length;

  async function handleAddSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/products", {
        name: form.name,
        category: form.category,
        price: form.price,
        stock: form.stock,
        status: statusFromStock(form.stock),
      });
      getProducts();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
    setForm({ name: "", category: "", price: "", stock: "" });
    setShowAdd(false);
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
      );
      await getProducts();
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
    }

    setShowUpdate(false);
    setEditingId(null);
  }

  async function handleRemove(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/products/${id}`,
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
              onChange={(e) => setSearch(e.target.value)}
              className="bg-bg border border-muted rounded-lg text-white m-1.5 p-1.5 w-62.5 focus:border-2 focus:border-active outline-none"
            />
            <select
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              className="bg-bg border border-muted rounded-lg text-white m-1.5 p-1.5 focus:border-2 focus:border-active outline-none"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Home & Decor">Home & Decor</option>
              <option value="Fashion">Fashion</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No Product Found !!
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
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
