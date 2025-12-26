import React from "react";
import { useProduct } from "../context/ProductContext";
import axios from "axios";
import UpdateProduct from "../updateProduct/UpdateProduct";
import UploadProduct from "../uploadProduct/UploadPoduct";
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
    <>
      <div className="w-[95%] mx-auto my-6 space-y-6">
        {/* Top Actions */}
        <div className="flex flex-col gap-3.5 sm:flex-row items-stretch sm:items-center justify-between">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#6C757D] text-white placeholder-white/80 w-full sm:w-[420px] p-3 rounded-lg font-medium text-[15px] outline-none"
            placeholder="Search Product"
          />
          <button
            onClick={() => {
              setEditProduct(null);
              setOpen(true);
            }}
            className="bg-[#6C757D] hover:bg-black cursor-pointer transition px-6 py-3 rounded-lg text-white"
          >
            Add Product
          </button>
        </div>

        {/* Table Header */}
        <div className="bg-[#4b1f1f] text-white px-4 py-3 rounded-t-xl flex items-center justify-between shadow">
          <h2 className="font-semibold text-lg">Current Products</h2>
          <span className="text-xl leading-none">➔</span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-xl shadow overflow-x-auto">
          <table className="min-w-[820px] w-full text-sm text-left border-separate border-spacing-0">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider sticky top-0">
              <tr>
                <th className="px-6 py-3 border-b">Image</th>
                <th className="px-6 py-3 border-b">Service Type</th>
                <th className="px-6 py-3 border-b">Title</th>
                <th className="px-6 py-3 border-b">City</th>
                <th className="px-6 py-3 border-b">Edit</th>
                <th className="px-6 py-3 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                products.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      {item?.images?.length ? (
                        <img
                          src={`http://localhost:5000/${item?.images[0]}`}
                          alt={item.title}
                          className="w-14 h-14 rounded-md object-cover border"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item?.serviceType}
                    </td>
                    <td className="px-6 py-4">{item?.title}</td>
                    <td className="px-6 py-4">
                      <span className="line-clamp-2">{item?.city}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          // console.log("hello", EditProduct);
                          setEditProduct(item);
                          setOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-md cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => productdelete(item._id)}
                        className="px-3 py-1.5 cursor-pointer rounded-md bg-red-50 hover:bg-red-100 text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {open && (EditProduct ? <UpdateProduct /> : <UploadProduct />)}
    </>
  );
};

export default DisplayProduct;
