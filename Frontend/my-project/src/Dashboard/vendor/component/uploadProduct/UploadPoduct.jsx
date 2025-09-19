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

  const [field, setFiled] = useState("hall");
  const [open, setOpen] = useState(false);

  const initialForm = {
    serviceType: "hall",
    title: "",
    description: "",
    images: [],
    hallCapacity: "",
    hallPricePerHead: "",
    Location: "",
    cateringServices: {
      sound: "",
      plates: "",
      seating: "",
      waiters: "",
      decoration: "",
    },
    cateringminPerHead: "",
    cateringmaxPerHead: "",
    djRate: "",
    djDuration: "",
    venue: "",
    photographerPackage: "",
    photographerStartingRange: "",
    photographerexpectedRange: "",
    adddtionalinformation: "",
    photographerPrice: "",
    decoratorminPrice: "",
    decoratormaxPrice: "",
    decorationtype: "",
    carType: "",
    carRentalPrice: "",
    carRentalDuration: "",
    Seats: "",
    Door: "",
    detailsproduct: [
      {
        title: "",
        price: "",
        details: [
          {
            title: "",
            description: [""],
          },
        ],
      },
    ],
    Transmission: "",
    cancellation: "",
    staff: [],
    city: "",
    ratings: "",
    contactNumber: "",
  };

  const [productForm, setProductForm] = useState(initialForm);
  const handleform = (e, extra = {}) => {
    const { name, value, type } = e.target || {};
    setProductForm((prev) => {
      let updated = { ...prev };

      if (!extra.type) {
        updated[name] = type === "number" ? Number(value) : value;
      }

      if (extra.type === "catering") {
        updated.cateringServices = {
          ...prev.cateringServices,
          [name]: value === "true" ? true : value === "false" ? false : null,
        };
      }

      if (extra.type === "detailsproduct") {
        const { index } = extra;
        const themes = [...prev.detailsproduct];
        themes[index][name] = value;
        updated.detailsproduct = themes;
      }

      if (extra.type === "decorationDetail") {
        const { index, subIndex, field } = extra;
        const themes = [...prev.detailsproduct];
        themes[index].details[subIndex][field] = value;
        updated.detailsproduct = themes;
      }
      if (extra.type === "descriptionArray") {
        const { index, subIndex, descIndex, value } = extra;
        const themes = [...prev.detailsproduct];
        themes[index].details[subIndex].description[descIndex] = value;
        updated.detailsproduct = themes;
      }

      return updated;
    });
  };

  const addSubDetail = (index) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details.push({ title: "", description: [""] });
      return { ...prev, detailsproduct: themes };
    });
  };

  // ✅ Remove sub detail
  const removeSubDetail = (index, subIndex) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details = themes[index].details.filter(
        (_, i) => i !== subIndex
      );
      return { ...prev, detailsproduct: themes };
    });
  };

  // ✅ Add Item
  const addDetailsProduct = () => {
    setProductForm((prev) => ({
      ...prev,
      detailsproduct: [
        ...prev.detailsproduct,
        {
          title: "",
          price: "",
          details: [
            {
              title: "",
              description: [""],
            },
          ],
        },
      ],
    }));
  };

  // ✅ Remove Item
  const removeDetailsProduct = (index) => {
    setProductForm((prev) => {
      const updated = [...prev.detailsproduct];
      updated.splice(index, 1);
      return { ...prev, detailsproduct: updated };
    });
  };

  // ✅ Add Description
  const addDescription = (index, subIndex) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details[subIndex].description.push("");
      return { ...prev, detailsproduct: themes };
    });
  };

  // ✅ Remove Description
  const removeDescription = (index, subIndex, descIndex) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details[subIndex].description = themes[index].details[
        subIndex
      ].description.filter((_, i) => i !== descIndex);
      return { ...prev, detailsproduct: themes };
    });
  };

  // ✅ Images
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

  const roleChange = (value) => {
    setFiled(value);
    setProductForm((prev) => ({ ...prev, serviceType: value }));
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
        } else if (key === "cateringServices") {
          formData.append("cateringServices", JSON.stringify(value));
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
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
      setProductForm(initialForm);

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
              value={field}
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
            <input
              type="text"
              onChange={handleform}
              name="adddtionalinformation"
              value={productForm.adddtionalinformation}
              placeholder="Additional Information"
              className="border rounded-lg p-2 outline-none"
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
            {field === "hall" && (
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

                <select
                  name="venue"
                  value={productForm.venue}
                  onChange={handleform}
                  className="border rounded-lg p-2 outline-none"
                >
                  <option value="">Select Venue</option>
                  <option value="BanquetHall">Banquet Hall</option>
                  <option value="OutdoorGarden">Outdoor Garden</option>
                  <option value="Resort">Resort</option>
                </select>
              </>
            )}

            {/* Catering fields */}
            {field === "catering" && (
              <>
                <h3 className="font-bold">Catering Menu</h3>
                <input
                  type="text"
                  onChange={handleform}
                  name="cateringminPerHead"
                  value={productForm.cateringminPerHead}
                  placeholder="Catering Min Price Per Head"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="cateringmaxPerHead"
                  value={productForm.cateringmaxPerHead}
                  placeholder="Catering Max Price Per Head"
                  className="border rounded-lg p-2 outline-none"
                />
                <label htmlFor="">Sounds</label>{" "}
                <select
                  name="sound"
                  value={productForm.cateringServices.sound || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  id=""
                >
                  {" "}
                  <option value="">Option Select</option>{" "}
                  <option value="true">Yes</option>{" "}
                  <option value="false">No</option>{" "}
                </select>{" "}
                <label htmlFor="">Plates</label>{" "}
                <select
                  name="plates"
                  value={productForm.cateringServices.plates || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  id=""
                >
                  {" "}
                  <option value="">Option Select</option>{" "}
                  <option value="true">Yes</option>{" "}
                  <option value="false">No</option>{" "}
                </select>{" "}
                <label htmlFor="">Seating</label>{" "}
                <select
                  name="seating"
                  value={productForm.cateringServices.seating || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  id=""
                >
                  {" "}
                  <option value="">Option Select</option>{" "}
                  <option value="true">Yes</option>{" "}
                  <option value="false">No</option>{" "}
                </select>{" "}
                <label htmlFor="">Waiters</label>{" "}
                <select
                  name="waiters"
                  value={productForm.cateringServices.waiters || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  id=""
                >
                  {" "}
                  <option value="">Option Select</option>{" "}
                  <option value="true">Yes</option>{" "}
                  <option value="false">No</option>{" "}
                </select>{" "}
                <label htmlFor="">Decoration</label>{" "}
                <select
                  name="decoration"
                  value={productForm.cateringServices.decoration || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  id=""
                >
                  <option value="">Option Select</option>{" "}
                  <option value="true">Yes</option>{" "}
                  <option value="false">No</option>{" "}
                </select>
                <input
                  type="text"
                  onChange={handleform}
                  name="cancellation"
                  value={productForm.cancellation}
                  placeholder="Catering Cancellation Policy"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                      .split(",")
                      .map((s) => s.trim());
                    setProductForm((prev) => ({ ...prev, staff: value }));
                  }}
                  value={productForm.staff.join(", ")}
                  name="staff"
                  placeholder="Enter staff (e.g. Male, Female)"
                  className="border rounded-lg p-2 outline-none"
                />
              </>
            )}

            {/* DJ fields */}
            {field === "dj" && (
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

            {/* Photographers fields */}
            {field === "photographers" && (
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
                  type="number"
                  onChange={handleform}
                  name="photographerStartingRange"
                  value={productForm.photographerStartingRange}
                  placeholder="Photographer Starting Price"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="number"
                  onChange={handleform}
                  name="photographerexpectedRange"
                  value={productForm.photographerexpectedRange}
                  placeholder="Photographer Expected Price"
                  className="border rounded-lg p-2 outline-none"
                />

                <input
                  type="text"
                  onChange={handleform}
                  name="cancellation"
                  value={productForm.cancellation}
                  placeholder="Photographer Cancellation Policy"
                  className="border rounded-lg p-2 outline-none"
                />

                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                      .split(",")
                      .map((s) => s.trim());
                    setProductForm((prev) => ({ ...prev, staff: value }));
                  }}
                  value={productForm.staff.join(", ")}
                  name="staff"
                  placeholder="Enter staff (e.g. Male, Female)"
                  className="border rounded-lg p-2 outline-none"
                />
              </>
            )}

            {/* Decorators fields */}
            {field === "decorators" && (
              <>
                <input
                  type="text"
                  onChange={handleform}
                  name="decorationtype"
                  value={productForm.decorationtype}
                  placeholder="Decorator Type"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="number"
                  onChange={handleform}
                  name="decoratorminPrice"
                  value={productForm.decoratorminPrice}
                  placeholder="Decorator Min Price"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="number"
                  onChange={handleform}
                  name="decoratormaxPrice"
                  value={productForm.decoratormaxPrice}
                  placeholder="Decorator Max Price"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="cancellation"
                  value={productForm.cancellation}
                  placeholder="Decorator Cancellation Policy"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value
                      .split(",")
                      .map((s) => s.trim());
                    setProductForm((prev) => ({ ...prev, staff: value }));
                  }}
                  value={productForm.staff.join(", ")}
                  name="staff"
                  placeholder="Enter staff (e.g. Male, Female)"
                  className="border rounded-lg p-2 outline-none"
                />
              </>
            )}

            {/* Car Rental fields */}
            {field === "carRental" && (
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
                  placeholder="Car Rental Price"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="carRentalDuration"
                  value={productForm.carRentalDuration}
                  placeholder="Car Rental Duration"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="number"
                  onChange={handleform}
                  name="Seats"
                  value={productForm.Seats}
                  placeholder="Enter Total Seats in Car"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="number"
                  onChange={handleform}
                  name="Door"
                  value={productForm.Door}
                  placeholder="Enter Total Doors in Car"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="Transmission"
                  value={productForm.Transmission}
                  placeholder="Enter Auto/Manual"
                  className="border rounded-lg p-2 outline-none"
                />
              </>
            )}
            <h3 className="font-bold">Details</h3>
            {productForm.detailsproduct.map((item, index) => (
              <div
                key={index}
                className="border p-3 rounded-lg mb-3 bg-gray-50"
              >
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={item.title}
                  onChange={(e) =>
                    handleform(e, { type: "detailsproduct", index })
                  }
                  className="border rounded p-2 w-full mb-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={item.price}
                  onChange={(e) =>
                    handleform(e, { type: "detailsproduct", index })
                  }
                  className="border rounded p-2 w-full mb-2"
                />
                <h4 className="font-medium">Sub Details</h4>
                {item.details.map((d, subIndex) => (
                  <div key={subIndex} className="border p-2 rounded mb-2">
                    <input
                      type="text"
                      placeholder="Sub Title"
                      value={d.title}
                      onChange={(e) =>
                        handleform(e, {
                          type: "decorationDetail",
                          index,
                          subIndex,
                          field: "title",
                        })
                      }
                      className="border rounded p-2 w-full mb-2"
                    />

                    <h5 className="font-medium">Descriptions</h5>
                    {d.description.map((desc, descIndex) => (
                      <div key={descIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={desc}
                          placeholder={`Description ${descIndex + 1}`}
                          onChange={(e) =>
                            handleform(e, {
                              type: "descriptionArray",
                              index,
                              subIndex,
                              descIndex,
                              value: e.target.value,
                            })
                          }
                          className="border rounded p-2 flex-1"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeDescription(index, subIndex, descIndex)
                          }
                          className="px-2 bg-red-500 cursor-pointer text-white rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addDescription(index, subIndex)}
                      className="px-3 py-1 cursor-pointer bg-green-500 text-white rounded text-sm"
                    >
                      Add Description
                    </button>

                    <button
                      type="button"
                      onClick={() => removeSubDetail(index, subIndex)}
                      className="ml-2 cursor-pointer px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Remove Sub Detail
                    </button>
                  </div>
                ))}

                {/* 👉 Add Subtitle button yaha aayega */}
                <button
                  type="button"
                  onClick={() => addSubDetail(index)}
                  className="mt-2 cursor-pointer px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Add Subtitle
                </button>

                <button
                  type="button"
                  onClick={() => removeDetailsProduct(index)}
                  className="ml-2 px-3  cursor-pointer  py-1 bg-red-600 text-white rounded text-sm"
                >
                  Remove Item
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDetailsProduct}
              className="px-4 py-2 cursor-pointer  bg-blue-600 text-white rounded mt-2"
            >
              Add Item
            </button>

            {/* Common Fields */}
            <input
              type="text"
              onChange={handleform}
              name="contactNumber"
              value={productForm.contactNumber}
              placeholder="Enter Contact Number"
              className="border rounded-lg p-2 outline-none"
            />
            <textarea
              onChange={handleform}
              name="Location"
              value={productForm.Location}
              placeholder="Enter Address"
              className="border rounded-lg p-2 outline-none resize-none"
              rows={3}
            />
            <input
              type="text"
              onChange={handleform}
              name="city"
              value={productForm.city}
              placeholder="Enter City"
              className="border rounded-lg p-2 outline-none"
            />
            <input
              type="number"
              onChange={handleform}
              name="ratings"
              value={productForm.ratings}
              placeholder="Enter ratings point"
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
