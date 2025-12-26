import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { useProduct } from "../context/ProductContext";
import { IoMdClose } from "react-icons/io";

// Slide Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateProduct = () => {
  const { setProducts, open, EditProduct, setOpen } = useProduct();

  const [field, setField] = useState("hall");
  const initialForm = {
    serviceType: "hall",
    title: "",
    description: "",
    images: [],
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
        if (themes[index] && themes[index].details[subIndex]) {
          themes[index].details[subIndex][field] = value;
        }
        updated.detailsproduct = themes;
      }

      if (extra.type === "descriptionArray") {
        const { index, subIndex, descIndex } = extra;
        const value = extra.value ?? e.target.value; // Use passed value if exists
        const themes = [...prev.detailsproduct];
        if (
          themes[index] &&
          themes[index].details[subIndex] &&
          themes[index].details[subIndex].description[descIndex] !== undefined
        ) {
          themes[index].details[subIndex].description[descIndex] = value;
        }
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

  const removeSubDetail = (index, subIndex) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details = themes[index].details.filter(
        (_, i) => i !== subIndex
      );
      return { ...prev, detailsproduct: themes };
    });
  };

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

  const removeDetailsProduct = (index) => {
    setProductForm((prev) => {
      const updated = [...prev.detailsproduct];
      updated.splice(index, 1);
      return { ...prev, detailsproduct: updated };
    });
  };

  const addDescription = (index, subIndex) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details[subIndex].description.push("");
      return { ...prev, detailsproduct: themes };
    });
  };

  const removeDescription = (index, subIndex, descIndex) => {
    setProductForm((prev) => {
      const themes = [...prev.detailsproduct];
      themes[index].details[subIndex].description = themes[index].details[
        subIndex
      ].description.filter((_, i) => i !== descIndex);
      return { ...prev, detailsproduct: themes };
    });
  };

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

  const serviceTypeChange = (value) => {
    setField(value);
    setProductForm((prev) => ({ ...prev, serviceType: value }));
  };

  // UPDATE PRODUCT
  const updateProduct = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const userId = user?.id;

    if (!EditProduct || !EditProduct._id) {
      console.error("No product selected for update");
      return;
    }

    try {
      const formData = new FormData();

      // Append all form data correctly
      Object.entries(productForm).forEach(([key, value]) => {
        if (key === "images") {
          // Handle images - send both existing and new images
          value.forEach((file) => {
            if (file instanceof File) {
              formData.append("images", file);
            }
          });

          // Also send existing images as a JSON array
          const existingImages = value.filter((img) => !(img instanceof File));
          if (existingImages.length > 0) {
            formData.append("existingImages", JSON.stringify(existingImages));
          }
        } else if (key === "cateringServices") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "staff" && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (key === "detailsproduct") {
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          // For all other fields including empty strings
          formData.append(
            key,
            value !== null && value !== undefined ? value.toString() : ""
          );
        }
      });

      // Append required fields that might be missing
      formData.append("userId", userId);

      // Debug: Log what's being sent

      const { data } = await axios.put(
        `http://localhost:5000/api/auth/vendor/updateproduct/${EditProduct._id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the product in the products list
      setProducts((prev) =>
        prev.map((product) =>
          product._id === EditProduct._id ? data.data : product
        )
      );

      setProductForm(initialForm);
      setOpen(false);
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      console.error("Full error:", err);

      // Show more specific error message
      if (err.response?.data?.message) {
        alert(`Failed: ${err.response.data.message}`);
      } else {
        alert("Failed to update product. Please check console for details.");
      }
    }
  };

  // Initialize form with EditProduct data
  useEffect(() => {
    if (!EditProduct) {
      setProductForm(initialForm);
      setField("hall");
      return;
    }

    // Clean and prepare the EditProduct data
    const cleanedProduct = {
      serviceType: EditProduct.serviceType || "hall",
      title: EditProduct.title || "",
      description: EditProduct.description || "",
      images: EditProduct.images || [],
      hallCapacity: EditProduct.hallCapacity || "",
      hallPricePerHead: EditProduct.hallPricePerHead || "",
      hallparking: EditProduct.hallparking || "",
      hallcatering: EditProduct.hallcatering || "",
      halldecor: EditProduct.halldecor || "",
      Location: EditProduct.Location || "",
      cateringServices: EditProduct.cateringServices || {
        sound: "",
        plates: "",
        seating: "",
        waiters: "",
        decoration: "",
      },
      cateringminPerHead: EditProduct.cateringminPerHead || "",
      cateringmaxPerHead: EditProduct.cateringmaxPerHead || "",
      djRate: EditProduct.djRate || "",
      djDuration: EditProduct.djDuration || "",
      venue: EditProduct.venue || "",
      photographerPackage: EditProduct.photographerPackage || "",
      photographerStartingRange: EditProduct.photographerStartingRange || "",
      photographerexpectedRange: EditProduct.photographerexpectedRange || "",
      adddtionalinformation: EditProduct.adddtionalinformation || "",
      photographerPrice: EditProduct.photographerPrice || "",
      decoratorminPrice: EditProduct.decoratorminPrice || "",
      decoratormaxPrice: EditProduct.decoratormaxPrice || "",
      decorationtype: EditProduct.decorationtype || "",
      carType: EditProduct.carType || "",
      carRentalPrice: EditProduct.carRentalPrice || "",
      carRentalDuration: EditProduct.carRentalDuration || "",
      Seats: EditProduct.Seats || "",
      Door: EditProduct.Door || "",
      Transmission: EditProduct.Transmission || "",
      cancellation: EditProduct.cancellation || "",
      staff:
        typeof EditProduct.staff === "string"
          ? JSON.parse(EditProduct.staff)
          : EditProduct.staff || [],
      city: EditProduct.city || "",
      ratings: EditProduct.ratings || "",
      detailsproduct: EditProduct.detailsproduct?.length
        ? EditProduct.detailsproduct.map((item) => ({
            title: item.title || "",
            price: item.price || "",
            details: Array.isArray(item.details)
              ? item.details.map((detail) => ({
                  title: detail.title || "",
                  description: Array.isArray(detail.description)
                    ? detail.description
                    : [detail.description || ""],
                }))
              : [{ title: "", description: [""] }],
          }))
        : [
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
    };

    setProductForm(cleanedProduct);
    setField(cleanedProduct.serviceType);
  }, [EditProduct]);

  // Handle staff input as comma-separated values
  const handleStaffInput = (e) => {
    const value = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    setProductForm((prev) => ({ ...prev, staff: value }));
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="add-product"
        maxWidth="sm"
        fullWidth
      >
        <div className="p-6 w-full max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Edit Product
          </h2>
          <form className="flex flex-col gap-4" onSubmit={updateProduct}>
            {/* Service Type */}
            <select
              value={field}
              onChange={(e) => serviceTypeChange(e.target.value)}
              className="border rounded-lg p-2 outline-none"
              required
            >
              <option value="">Select Service Type</option>
              <option value="hall">Hall</option>
              <option value="catering">Catering</option>
              <option value="dj">DJ</option>
              <option value="photographers">Photographers</option>
              <option value="decorators">Decorators</option>
              <option value="carRental">Car Rental</option>
            </select>

            <input
              type="text"
              onChange={handleform}
              name="title"
              value={productForm.title}
              placeholder="Product Name"
              className="border rounded-lg p-2 outline-none"
              required
            />

            <textarea
              onChange={handleform}
              name="description"
              value={productForm.description}
              placeholder="Description"
              className="border rounded-lg p-2 outline-none resize-none"
              rows={3}
              required
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
                      src={
                        img instanceof File
                          ? URL.createObjectURL(img) // New uploads
                          : img.startsWith("http")
                          ? img // Absolute URL (if backend already sends full URL)
                          : `http://localhost:5000/${img}` // Existing image filenames
                      }
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index),
                        }))
                      }
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
                  placeholder="Hall internal catering"
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
                  placeholder="Cancellation Policy"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleStaffInput}
                  value={productForm.staff.join(", ")}
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
                <label className="block font-medium">Sounds</label>
                <select
                  name="sound"
                  value={productForm.cateringServices.sound || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  className="border rounded-lg p-2 outline-none w-full"
                >
                  <option value="">Select Option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label className="block font-medium">Plates</label>
                <select
                  name="plates"
                  value={productForm.cateringServices.plates || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  className="border rounded-lg p-2 outline-none w-full"
                >
                  <option value="">Select Option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label className="block font-medium">Seating</label>
                <select
                  name="seating"
                  value={productForm.cateringServices.seating || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  className="border rounded-lg p-2 outline-none w-full"
                >
                  <option value="">Select Option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label className="block font-medium">Waiters</label>
                <select
                  name="waiters"
                  value={productForm.cateringServices.waiters || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  className="border rounded-lg p-2 outline-none w-full"
                >
                  <option value="">Select Option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label className="block font-medium">Decoration</label>
                <select
                  name="decoration"
                  value={productForm.cateringServices.decoration || ""}
                  onChange={(e) => handleform(e, { type: "catering" })}
                  className="border rounded-lg p-2 outline-none w-full"
                >
                  <option value="">Select Option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <input
                  type="text"
                  onChange={handleform}
                  name="cancellation"
                  value={productForm.cancellation}
                  placeholder="Cancellation Policy"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleStaffInput}
                  value={productForm.staff.join(", ")}
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
                  placeholder="Cancellation Policy"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleStaffInput}
                  value={productForm.staff.join(", ")}
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
                  placeholder="Cancellation Policy"
                  className="border rounded-lg p-2 outline-none"
                />
                <input
                  type="text"
                  onChange={handleStaffInput}
                  value={productForm.staff.join(", ")}
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

            {/* Details Section - for applicable service types */}
            {(field === "hall" ||
              field === "catering" ||
              field === "photographers" ||
              field === "decorators") && (
              <>
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
                      className="ml-2 px-3 cursor-pointer py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Remove Item
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDetailsProduct}
                  className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded mt-2"
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
              min="0"
              max="5"
              step="0.1"
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
                Update Product
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateProduct;
