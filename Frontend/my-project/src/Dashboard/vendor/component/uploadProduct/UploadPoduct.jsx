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

  const initialForm = {
    serviceType: "hall",
    title: "",
    description: "",
    images: [],
    hallCapacity: "",
    hallPricePerHead: "",
    Location: "",
    cateringMenu: [],
    cateringminPerHead: "",
    cateringmaxPerHead: "",
    cateringServices: {},
    djRate: "",
    djDuration: "",
    venue: "",
    photographerPackage: "",
    photographerStartingRange: "",
    photographerexpectedRange: "",
    photographerPlans: [],

    adddtionalinformation: "",
    photographerPrice: "",
    decoratorTheme: "",
    decoratorPrice: "",
    carType: "",
    carRentalPrice: "",
    carRentalDuration: "",
    Seats: "",
    Door: "",
    Transmission: "",
    cancellation: "",
    staff: [],
    city: "",
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

      if (extra.type === "photographerPlan") {
        const { index } = extra;
        const plans = [...prev.photographerPlans];
        plans[index][name] = value;
        updated.photographerPlans = plans;
      }
      if (extra.type === "catering") {
        updated.cateringServices = {
          ...prev.cateringServices,
          [name]: value === "true" ? true : value === "false" ? false : null,
        };
      }

      if (extra.type === "deliverable") {
        const { index, key, subIndex } = extra;
        const plans = [...prev.photographerPlans];
        plans[index].deliverables[key][subIndex] = value;
        updated.photographerPlans = plans;
      }

      if (extra.type === "cateringMenu") {
        const { index } = extra;
        const menus = [...prev.cateringMenu];
        menus[index][name] = value;
        updated.cateringMenu = menus;
      }

      if (extra.type === "cateringDetails") {
        const { index, subIndex } = extra;
        const menus = [...prev.cateringMenu];
        menus[index].details[subIndex] = value;
        updated.cateringMenu = menus;
      }

      return updated;
    });
  };

  // Photographer Plan Functions
  const addPhotographerPlan = () => {
    setProductForm((prev) => ({
      ...prev,
      photographerPlans: [
        ...prev.photographerPlans,
        {
          title: "",
          price: "",
          deliverables: { event: [""], photography: [""] },
        },
      ],
    }));
  };

  const removePhotographerPlan = (index) => {
    setProductForm((prev) => ({
      ...prev,
      photographerPlans: prev.photographerPlans.filter((_, i) => i !== index),
    }));
  };

  const addDeliverable = (planIndex, key) => {
    setProductForm((prev) => {
      const plans = [...prev.photographerPlans];
      plans[planIndex].deliverables[key].push("");
      return { ...prev, photographerPlans: plans };
    });
  };

  const removeDeliverable = (planIndex, key, subIndex) => {
    setProductForm((prev) => {
      const plans = [...prev.photographerPlans];
      plans[planIndex].deliverables[key] = plans[planIndex].deliverables[
        key
      ].filter((_, i) => i !== subIndex);
      return { ...prev, photographerPlans: plans };
    });
  };

  // Catering Menu Functions
  const addCateringMenu = () => {
    setProductForm((prev) => ({
      ...prev,
      cateringMenu: [
        ...prev.cateringMenu,
        { title: "", price: "", details: [""] },
      ],
    }));
  };

  const removeCateringMenu = (index) => {
    setProductForm((prev) => ({
      ...prev,
      cateringMenu: prev.cateringMenu.filter((_, i) => i !== index),
    }));
  };

  const addCateringDetail = (menuIndex) => {
    setProductForm((prev) => {
      const menus = [...prev.cateringMenu];
      menus[menuIndex].details.push("");
      return { ...prev, cateringMenu: menus };
    });
  };

  const removeCateringDetail = (menuIndex, detailIndex) => {
    setProductForm((prev) => {
      const menus = [...prev.cateringMenu];
      menus[menuIndex].details = menus[menuIndex].details.filter(
        (_, i) => i !== detailIndex
      );
      return { ...prev, cateringMenu: menus };
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
        } else if (key === "photographerPlans") {
          formData.append("photographerPlans", JSON.stringify(value));
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (key === "cateringMenu") {
          formData.append("cateringMenu", JSON.stringify(value));
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
                <div>
                  <h3 className="font-bold">Catering Menu</h3>
                  {productForm.cateringMenu.map((menu, index) => (
                    <div key={index} className="border p-3 rounded mb-2">
                      <input
                        type="text"
                        name="title"
                        placeholder="Menu Title"
                        value={menu.title}
                        onChange={(e) =>
                          handleform(e, { type: "cateringMenu", index })
                        }
                        className="border rounded-lg p-2 w-full outline-none"
                      />
                      <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={menu.price}
                        onChange={(e) =>
                          handleform(e, { type: "cateringMenu", index })
                        }
                        className="border rounded-lg p-2 w-full outline-none mt-2"
                      />

                      {/* Details */}
                      {menu.details.map((d, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center gap-2 mt-2"
                        >
                          <input
                            type="text"
                            value={d}
                            onChange={(e) =>
                              handleform(e, {
                                type: "cateringDetails",
                                index,
                                subIndex,
                              })
                            }
                            className="border rounded-lg p-2 w-full outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeCateringDetail(index, subIndex)
                            }
                            className="text-red-500"
                          >
                            X
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addCateringDetail(index)}
                        className="text-blue-500 mt-1"
                      >
                        + Add Detail
                      </button>

                      <button
                        type="button"
                        onClick={() => removeCateringMenu(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                      >
                        Remove Menu
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCateringMenu}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    + Add Menu
                  </button>
                </div>

                <input
                  type="text"
                  onChange={handleform}
                  name="cateringminPerHead"
                  value={productForm.cateringminPerHead}
                  placeholder="Catering min Price Per Head"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="cateringmaxPerHead"
                  value={productForm.cateringmaxPerHead}
                  placeholder="Catering max Price Per Head"
                  className="border rounded-lg p-2 outline-none"
                />
                <label htmlFor="">Sounds</label>
                <select
                  name="sound"
                  value={productForm.cateringServices.sound}
                  onChange={handleform}
                  id=""
                >
                  <option value="">Option Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label htmlFor="">Plates</label>
                <select
                  name="plates"
                  value={productForm.cateringServices.plates}
                  onChange={handleform}
                  id=""
                >
                  <option value="">Option Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label htmlFor="">Seating</label>
                <select
                  name="seating"
                  value={productForm.cateringServices.seating}
                  onChange={handleform}
                  id=""
                >
                  <option value="">Option Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label htmlFor="">Waiters</label>
                <select
                  name="waiters"
                  value={productForm.cateringServices.waiters}
                  onChange={handleform}
                  id=""
                >
                  <option value="">Option Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label htmlFor="">Decoration</label>
                <select
                  name="decoration"
                  onChange={handleform}
                  value={productForm.cateringServices.decoration}
                  id=""
                >
                  <option value="">Option Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <input
                  type="text"
                  onChange={handleform}
                  name="cancellation"
                  value={productForm.cancellation}
                  placeholder="Catering cancellation"
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
                  type="number"
                  onChange={handleform}
                  name="photographerStartingRange"
                  value={productForm.photographerStartingRange}
                  placeholder="Photographer started Price"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="number"
                  onChange={handleform}
                  name="photographerexpectedRange"
                  value={productForm.photographerexpectedRange}
                  placeholder="Photographer expected Price"
                  className="border rounded-lg p-2 outline-none"
                />

                {/* Catering Services Checkboxes */}

                <input
                  type="text"
                  onChange={handleform}
                  name="cancellation"
                  value={productForm.cancellation}
                  placeholder="Decorator cancellation"
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
                <input
                  type="text"
                  onChange={handleform}
                  name="adddtionalinformation"
                  value={productForm.adddtionalinformation}
                  placeholder="addtionalinformatio"
                  className="border rounded-lg p-2 outline-none"
                />
                {productForm.photographerPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 space-y-3 bg-gray-50 mt-3"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Plan {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removePhotographerPlan(index)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <input
                      type="text"
                      name="title"
                      placeholder="Plan Title"
                      value={plan.title}
                      onChange={(e) =>
                        handleform(e, { type: "photographerPlan", index })
                      }
                      className="border p-2 rounded-lg w-full"
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="Plan Price"
                      value={plan.price}
                      onChange={(e) =>
                        handleform(e, { type: "photographerPlan", index })
                      }
                      className="border p-2 rounded-lg w-full"
                    />

                    {["event", "photography", "team", "videography"].map(
                      (key) => (
                        <div key={key}>
                          <label className="font-medium capitalize">
                            {key} Deliverables
                          </label>
                          {plan.deliverables[key].map((item, subIndex) => (
                            <div
                              key={subIndex}
                              className="flex items-center gap-2 mt-1"
                            >
                              <input
                                type="text"
                                value={item}
                                onChange={(e) =>
                                  handleform(e, {
                                    type: "deliverable",
                                    index,
                                    key,
                                    subIndex,
                                  })
                                }
                                className="border p-2 rounded-lg flex-1"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeDeliverable(index, key, subIndex)
                                }
                                className="text-red-500"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addDeliverable(index, key)}
                            className="text-blue-600 text-sm mt-1"
                          >
                            + Add {key}
                          </button>
                        </div>
                      )
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addPhotographerPlan}
                  className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg mt-3"
                >
                  + Add More Plan
                </button>
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
                <input
                  type="text"
                  onChange={handleform}
                  name="cancellation"
                  value={productForm.cancellation}
                  placeholder="Decorator cancellation"
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
                  placeholder="Enter total Door in Car"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="Transmission"
                  value={productForm.Transmission}
                  placeholder="Enter Auto/ Manual"
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
