import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { useProduct } from "../context/ProductContext";
import { RxCross1 } from "react-icons/rx";

// Slide Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadProduct = () => {
  const { setProducts, open, setOpen } = useProduct();

  const [field, setFiled] = useState("hall");
  const initialForm = {
    serviceType: "hall",
    title: "",
    description: "",
    images: [],
    videos: [],
    hallCapacity: "",
    hallPricePerHead: "",
    hallparking: "",
    hallcatering: "",
    halldecor: "",
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

  //  Remove sub detail
  const removeSubDetail = (index, subIndex) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details = themes[index].details.filter(
        (_, i) => i !== subIndex
      );
      return { ...prev, detailsproduct: themes };
    });
  };

  //  Add Item
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

  //  Remove Item
  const removeDetailsProduct = (index) => {
    setProductForm((prev) => {
      const updated = [...prev.detailsproduct];
      updated.splice(index, 1);
      return { ...prev, detailsproduct: updated };
    });
  };

  //  Add Description
  const addDescription = (index, subIndex) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details[subIndex].description.push("");
      return { ...prev, detailsproduct: themes };
    });
  };

  //  Remove Description
  const removeDescription = (index, subIndex, descIndex) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details[subIndex].description = themes[index].details[
        subIndex
      ].description.filter((_, i) => i !== descIndex);
      return { ...prev, detailsproduct: themes };
    });
  };

  //  Images
  const handleMedia = (e, type) => {
    const files = Array.from(e.target.files);
    setProductForm((prev) => ({
      ...prev,
      [type]: [...prev[type], ...files],
    }));
  };

  const removeMedia = (index, type) => {
    setProductForm((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
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
        if (key === "images" || key === "videos") {
          value.forEach((file) => formData.append("files", file));
        } else if (Array.isArray(value) || typeof value === "object") {
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

  return (
    <>
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

            {/* Image Uploader */}
            <div>
              <label className="font-medium text-sm mb-1 block text-blue-600">
                Product Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleMedia(e, "images")}
                className="border p-2 rounded-lg w-full mb-2"
              />
              <div className="flex flex-wrap gap-2">
                {productForm.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedia(index, "images")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      <RxCross1 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Uploader */}
            <div className="mt-4">
              <label className="font-medium text-sm mb-1 block text-purple-600">
                Product Videos
              </label>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleMedia(e, "videos")}
                className="border p-2 rounded-lg w-full mb-2"
              />
              <div className="flex flex-wrap gap-2">
                {productForm.videos.map((vid, index) => (
                  <div key={index} className="relative">
                    <video
                      src={URL.createObjectURL(vid)}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedia(index, "videos")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      <RxCross1 />
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
                  name="hallparking"
                  value={productForm.hallparking}
                  placeholder="Hall parking capacity"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleform}
                  name="hallcatering"
                  value={productForm.hallcatering}
                  placeholder="Hall internal "
                  className="border rounded-lg p-2 outline-none"
                />
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
                  name="halldecor"
                  value={productForm.halldecor}
                  placeholder="Hall flower decor starts from"
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

            {(field === "hall" ||
              field === "catering" ||
              field === "photographers" ||
              field === "decorators") && (
              <>
                <h3 className="font-bold">Details</h3>
                {productForm.detailsproduct.map((item, index) => (
                  <div
                    key={index}
                    className="border p-3 rounded-lg mb-3p bg-gray-50"
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
                              <RxCross1 />
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
              </>
            )}
            {/* Common Fields */}
            <input
              type="text"
              onChange={handleform}
              name="Location"
              value={productForm.Location}
              placeholder="Enter Location"
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
