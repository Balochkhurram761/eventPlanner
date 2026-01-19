import React from "react";
import { useProduct } from "../context/ProductContext";
import axios from "axios";
import UpdateProduct from "../updateProduct/UpdateProduct";
import UploadProduct from "../uploadProduct/UploadPoduct";
import { FaPlus } from "react-icons/fa6";

const DisplayProduct = () => {
  const {
    searchQuery,
    setSearchQuery,
    setEditProduct,
    EditProduct,
    open,
    setOpen,
    products,
    setProducts,
  } = useProduct();

  const productdelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      await axios.delete(
        `http://localhost:5000/api/auth/vendor/deleteproduct/${id}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen pt-25 pb-5 px-15 bg-gray-50/50  ">
      <div className=" space-y-8">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Product Inventory
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and track your services and products effortlessly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full sm:w-72 pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
              />
            </div>

            <button
              onClick={() => {
                setEditProduct(null);
                setOpen(true);
              }}
              className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="text-xl ">
                <FaPlus />
              </span>{" "}
              Add Product
            </button>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">
                    Product Info
                  </th>
                  <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">
                    Service Type
                  </th>
                  <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length ? (
                  products.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-indigo-50/30 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          {item?.images?.length ? (
                            <img
                              src={`http://localhost:5000/${item?.images[0]}`}
                              alt={item.title}
                              className="w-14 h-14 rounded-xl object-cover ring-2 ring-gray-100 group-hover:ring-indigo-200 transition-all"
                            />
                          ) : (
                            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-[10px] font-bold">
                              N/A
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-800 line-clamp-1">
                              {item?.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              ID: {item._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wide">
                          {item?.serviceType}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="line-clamp-1 italic">
                            {item?.city}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setEditProduct(item);
                              setOpen(true);
                            }}
                            className="p-2.5 cursor-pointer rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => productdelete(item._id)}
                            className="p-2.5 cursor-pointer rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center opacity-40">
                        <span className="text-5xl mb-4">📦</span>
                        <p className="text-xl font-medium text-gray-500">
                          No products available
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Modal Overlay --- */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-2 animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black z-10"
            >
              ✕
            </button>
            {EditProduct ? <UpdateProduct /> : <UploadProduct />}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayProduct;
