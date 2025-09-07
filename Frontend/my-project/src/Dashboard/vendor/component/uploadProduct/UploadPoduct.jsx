import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { useProduct } from "../context/ProductContext";

// Slide Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadProduct = () => {
  const { searchQuery, setSearchQuery, products, setProducts } = useProduct();
  const [filed, setFiled] = useState("hall");
  const [open, setOpen] = useState(false);

  const [productForm, setProductForm] = useState({
    serviceType: "hall",
    title: "",
    description: "",
    images: [],
    hallCapacity: "",
    hallPricePerHead: "",
    hallLocation: "",
    cateringMenu: "",
    cateringPricePerHead: "",
    djRate: "",
    djDuration: "",
    venue:"",
    photographerPackage: "",
    photographerPrice: "",
    decoratorTheme: "",
    decoratorPrice: "",
    carType: "",
    carRentalPrice: "",
    carRentalDuration: "",
    city: "",
    contactNumber: "",
  });

  // handle form input
  const handleform = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const roleChange = (value) => {
    setFiled(value);
    setProductForm((prev) => ({ ...prev, serviceType: value }));
  };

  // handle image upload
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setProductForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setProductForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // CREATE
  const uploadproduct = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const userId = user?.id;

    try {
      const formData = new FormData();
      Object.entries(productForm).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });
      formData.append("userId", userId);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/vendor/uploadproduct",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts((prev) => [data.data, ...prev]);

      setProductForm({
        serviceType: "hall",
        title: "",
        description: "",
        images: [],
        hallCapacity: "",
        hallPricePerHead: "",
        hallLocation: "",
        cateringMenu: "",
        cateringPricePerHead: "",
        djRate: "",
        djDuration: "",

        photographerPackage: "",
        photographerPrice: "",

        decoratorTheme: "",
        decoratorPrice: "",
        carType: "",
        carRentalPrice: "",
        carRentalDuration: "",
        city: "",
        contactNumber: "",
      });

      setOpen(false);
    } catch (err) {
      console.error("Create error:", err.response?.data || err.message);
    }
  };

  // DELETE
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
            onClick={() => setOpen(true)}
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
                          setOpen(true);
                          setProducts(item); // 👈 yaha product bhej rahe hain
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

      {/* Dialog */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="add-product"
      >
        <div className="p-6 w-[320px] sm:w-[460px]">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Add New Product
          </h2>
          <form className="flex flex-col gap-4" onSubmit={uploadproduct}>
            {/* Service Type */}

            <select
              value={filed}
              onChange={(e) => roleChange(e.target.value)}
              className="border rounded-lg p-2 outline-none"
            >
              <option value="">Select Service Type</option>
              <option value="hall">Hall</option>
              <option value="catering">Catering</option>
              <option value="dj">DJ</option>
              <option value="photographers">Photographers</option>
              <option value="decorators">Decorators</option>
              <option value="carRental">CarRental</option>
            </select>

            <input
              type="text"
              onChange={handleform}
              name="title"
              value={productForm.title}
              placeholder="Product Name"
              className="border rounded-lg p-2 outline-none"
            />
            <textarea
              onChange={handleform}
              name="description"
              value={productForm.description}
              placeholder="Description"
              className="border rounded-lg p-2 outline-none resize-none"
              rows={3}
            />

            {/* Image uploader */}
            <div>
              <label className="font-medium text-sm mb-1 block">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="border p-2 rounded-lg w-full"
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {productForm.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hall fields */}
            {filed === "hall" && (
              <>
                <input
                  type="text"
                  onChange={handleform}
                  name="hallCapacity"
                  value={productForm.hallCapacity}
                  placeholder="Hall Capacity"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="hallPricePerHead"
                  value={productForm.hallPricePerHead}
                  placeholder="Price Per Head"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="hallLocation"
                  value={productForm.hallLocation}
                  placeholder="Location"
                  className="border rounded-lg p-2 outline-none"
                />

                <select
                  name="venue"
                  value={productForm.venue}
                  onChange={handleform}
                  className="border rounded-lg p-2 outline-none"
                >
                  <option value="">Select Venue</option>
                  <option value="BanquetHall">BanquetHall</option>
                  <option value="OutdoorGarden">OutdoorGarden</option>
                  <option value="Resort">Resort</option>
                </select>
              </>
            )}

            {/* Catering fields */}
            {filed === "catering" && (
              <>
                <input
                  type="text"
                  onChange={handleform}
                  name="cateringMenu"
                  value={productForm.cateringMenu}
                  placeholder="Catering Menu"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="cateringPricePerHead"
                  value={productForm.cateringPricePerHead}
                  placeholder="Catering Price Per Head"
                  className="border rounded-lg p-2 outline-none"
                />
              </>
            )}

            {/* DJ fields */}
            {filed === "dj" && (
              <>
                <input
                  type="text"
                  onChange={handleform}
                  name="djRate"
                  value={productForm.djRate}
                  placeholder="DJ Rate"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="djDuration"
                  value={productForm.djDuration}
                  placeholder="DJ Duration"
                  className="border rounded-lg p-2 outline-none"
                />
              </>
            )}
            {filed === "photographers" && (
              <>
                <input
                  type="text"
                  onChange={handleform}
                  name="photographerPackage"
                  value={productForm.photographerPackage}
                  placeholder="Photographer Package"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="photographerPrice"
                  value={productForm.photographerPrice}
                  placeholder="Photographer Price"
                  className="border rounded-lg p-2 outline-none"
                />
              </>
            )}
            {filed === "decorators" && (
              <>
                <input
                  type="text"
                  onChange={handleform}
                  name="decoratorTheme"
                  value={productForm.decoratorTheme}
                  placeholder="DecoratorTheme"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="decoratorPrice"
                  value={productForm.decoratorPrice}
                  placeholder="Decorator Price"
                  className="border rounded-lg p-2 outline-none"
                />
              </>
            )}
            {filed === "carRental" && (
              <>
                <input
                  type="text"
                  onChange={handleform}
                  name="carType"
                  value={productForm.carType}
                  placeholder="Car Type"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="carRentalPrice"
                  value={productForm.carRentalPrice}
                  placeholder="CarRental Price"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="carRentalDuration"
                  value={productForm.carRentalDuration}
                  placeholder="CarRentalDuration"
                  className="border rounded-lg p-2 outline-none"
                />
              </>
            )}
            <input
              type="text"
              onChange={handleform}
              name="contactNumber"
              value={productForm.contactNumber}
              placeholder="Enter Contact Number"
              className="border rounded-lg p-2 outline-none"
            />
            <input
              type="text"
              onChange={handleform}
              name="city"
              value={productForm.city}
              placeholder="Enter City"
              className="border rounded-lg p-2 outline-none"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default UploadProduct;
