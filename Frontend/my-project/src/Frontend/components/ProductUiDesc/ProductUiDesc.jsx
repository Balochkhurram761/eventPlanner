import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { IoCarSportSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdPolicy } from "react-icons/md";
import { AiFillExperiment } from "react-icons/ai";
import { BiSolidHourglassTop } from "react-icons/bi";
import { FaUtensils, FaChair, FaUserTie } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { BsBuildingFillAdd } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const ProductUiDesc = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [persons, setPersons] = useState(120);
  const [eventDate, setEventDate] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handlenavigate = (product) => {
    navigate("/bookevent", { state: { product } });
  };
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/getsingle/${id}`
      );
      setProduct(res.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch product details");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        No product found
      </div>
    );
  }

  // Helper function to render service-specific details
  const renderServiceDetails = () => {
    switch (product.serviceType) {
      case "hall":
        return (
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Venue:</span> {product.venue}
            </p>
            <p>
              <span className="font-semibold">Capacity:</span>{" "}
              {product.hallCapacity} Guests
            </p>
            <p>
              <span className="font-semibold">Price / Head:</span> Rs{" "}
              {product.hallPricePerHead}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {product.Location}
            </p>
          </div>
        );

      case "catering":
        return (
          <div className="space-y-6">
            <p className="font-semibold text-2xl">
              PKR {product.cateringminPerHead?.toLocaleString()} - PKR{" "}
              {product.cateringmaxPerHead}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-2xl">
                  <FaUser />
                </span>
                <div>
                  <p className="font-medium">Staff</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.staff &&
                      JSON.parse(product.staff).map((item, index) => (
                        <span
                          key={index}
                          className="text-sm bg-gray-100 px-2 py-1 rounded capitalize"
                        >
                          {item}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-2xl">
                  <MdPolicy />
                </span>
                <div>
                  <p className="font-medium">Cancellation Policy</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.cancellation}
                  </p>
                </div>
              </div>
            </div>

            {product.cateringServices && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <FaMusic className="text-orange-600" />
                    <span>Provide Sound</span>
                  </div>
                  <span
                    className={
                      product.cateringServices.sound
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.cateringServices.sound ? "Yes" : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <FaUtensils className="text-orange-600" />
                    <span>Provide Plates</span>
                  </div>
                  <span
                    className={
                      product.cateringServices.plates
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.cateringServices.plates ? "Yes" : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <FaChair className="text-orange-600" />
                    <span>Provide Seating</span>
                  </div>
                  <span
                    className={
                      product.cateringServices.seating
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.cateringServices.seating ? "Yes" : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <FaUserTie className="text-orange-600" />
                    <span>Provide Waiters</span>
                  </div>
                  <span
                    className={
                      product.cateringServices.waiters
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.cateringServices.waiters ? "Yes" : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <MdCelebration className="text-orange-600" />
                    <span>Provide Decoration</span>
                  </div>
                  <span
                    className={
                      product.cateringServices.decoration
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.cateringServices.decoration ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="font-semibold">Description:</p>
              <p className="text-gray-700 mt-1">{product.description}</p>
            </div>
          </div>
        );

      case "dj":
        return (
          <div className="space-y-6">
            <p className="font-semibold text-2xl">
              PKR {product.djRate?.toLocaleString()}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-red-500 text-2xl">
                <BiSolidHourglassTop />
              </span>
              <div>
                <p className="font-medium">Duration</p>
                <p>{product.djDuration} hours</p>
              </div>
            </div>

            <div>
              <p className="font-semibold">Description:</p>
              <p className="text-gray-700 mt-1">{product.description}</p>
            </div>
          </div>
        );

      case "photographers":
        return (
          <div className="space-y-6">
            <p className="font-semibold text-2xl">
              PKR {product.photographerStartingRange?.toLocaleString()} - PKR{" "}
              {product.photographerexpectedRange}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-2xl">
                  <AiFillExperiment />
                </span>
                <div>
                  <p className="font-medium">Expertise</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.photographerPackage}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-2xl">
                  <FaUser />
                </span>
                <div>
                  <p className="font-medium">Staff</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.staff &&
                      JSON.parse(product.staff).map((item, index) => (
                        <span
                          key={index}
                          className="text-sm bg-gray-100 px-2 py-1 rounded capitalize"
                        >
                          {item}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-2xl">
                  <MdPolicy />
                </span>
                <div>
                  <p className="font-medium">Cancellation Policy</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.cancellation}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold">Description:</p>
              <p className="text-gray-700 mt-1">{product.description}</p>
            </div>

            <div>
              <p className="font-semibold">Additional Info:</p>
              <p className="text-gray-700 mt-1">
                {product.adddtionalinformation}
              </p>
            </div>
          </div>
        );

      case "decorators":
        return (
          <div className="space-y-6">
            <p className="font-semibold text-2xl">
              PKR {product.decoratorminPrice?.toLocaleString() || 0} - PKR{" "}
              {product.decoratormaxPrice?.toLocaleString() || 0}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-2xl">
                  <BsBuildingFillAdd />
                </span>
                <div>
                  <p className="font-medium">Type</p>
                  <p className="text-sm text-gray-600 capitalize mt-1">
                    {product.decorationtype}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-2xl">
                  <FaUser />
                </span>
                <div>
                  <p className="font-medium">Staff</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.staff ? (
                      JSON.parse(product.staff).map((item, index) => (
                        <span
                          key={index}
                          className="text-sm bg-gray-100 px-2 py-1 rounded capitalize"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No staff info
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-2xl">
                  <MdPolicy />
                </span>
                <div>
                  <p className="font-medium">Cancellation Policy</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.cancellation || "No cancellation policy"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-2xl">
                  <IoLocation />
                </span>
                <div>
                  <p className="font-medium">City</p>
                  <p className="text-sm text-gray-600 capitalize mt-1">
                    {product.city}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold">Description:</p>
              <p className="text-gray-700 mt-1">{product.description}</p>
            </div>
          </div>
        );

      case "carRental":
        return (
          <div className="space-y-6">
            <p className="font-semibold text-2xl">
              PKR {product.carRentalPrice?.toLocaleString()} /{" "}
              {product.carRentalDuration} day
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <span className="text-red-500 text-2xl">
                  <MdOutlineAirlineSeatReclineNormal />
                </span>
                <p className="font-medium">Seats</p>
                <p>{product.Seats}</p>
              </div>

              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <span className="text-red-500 text-2xl">
                  <GiCarDoor />
                </span>
                <p className="font-medium">Doors</p>
                <p>{product.Door}</p>
              </div>

              <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg">
                <span className="text-red-500 text-2xl">
                  <IoCarSportSharp />
                </span>
                <p className="font-medium">Transmission</p>
                <p>{product.Transmission}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold">Description:</p>
              <p className="text-gray-700 mt-1">{product.description}</p>
            </div>
          </div>
        );

      default:
        return <div>Service details not available</div>;
    }
  };

  // Helper function to render package selection (for services that have detailsproduct)
  const renderPackageSelection = () => {
    if (!product.detailsproduct || product.detailsproduct.length === 0)
      return null;

    const needsPersonCounter = product.serviceType === "catering";

    return (
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Package list */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {product.detailsproduct.map((pkg, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300
                ${
                  selectedPlan === index
                    ? "bg-red-600 text-white border-red-600 shadow-lg"
                    : "bg-gray-50 border-gray-200 hover:bg-red-50 hover:border-red-400 hover:shadow-md"
                }`}
              onClick={() => setSelectedPlan(index)}
            >
              <p className="font-semibold text-lg">{pkg.title}</p>
              <p className="text-sm mt-1">
                PKR{" "}
                <span className="font-bold">{pkg.price?.toLocaleString()}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Package details */}
        <div className="w-full md:w-2/3 flex flex-col gap-6 bg-white shadow-lg rounded-xl p-6">
          {selectedPlan !== null && product.detailsproduct[selectedPlan] ? (
            <>
              <h3 className="text-2xl font-bold text-gray-800">
                {product.detailsproduct[selectedPlan].title}
              </h3>

              <div className="bg-red-600 text-white px-4 py-3 rounded-xl font-semibold text-lg shadow-md w-fit">
                Package Price: Rs.{" "}
                {product.detailsproduct[selectedPlan].price?.toLocaleString()}
              </div>

              <div>
                <h4 className="font-semibold mb-3">Package Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.detailsproduct[selectedPlan].details?.map(
                    (detail, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        {typeof detail === "string" ? (
                          <p className="text-gray-700">{detail}</p>
                        ) : (
                          <>
                            <p className="font-medium text-gray-800 capitalize mb-2">
                              {detail.title}
                            </p>
                            {Array.isArray(detail.description) ? (
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {detail.description.map((desc, i) => (
                                  <li key={i}>{desc}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-600">
                                {detail.description}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {needsPersonCounter && (
                <>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="font-semibold">Number of Persons:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPersons((p) => Math.max(1, p - 1))}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        –
                      </button>
                      <span className="font-bold text-lg w-10 text-center">
                        {persons}
                      </span>
                      <button
                        onClick={() => setPersons((p) => p + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="font-semibold block mb-2">
                      Event Date:
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="border p-2 rounded-lg w-full md:w-auto"
                    />
                  </div>

                  <div className="bg-green-600 text-white px-4 py-3 rounded-xl font-semibold text-lg shadow-md w-fit mt-4">
                    Total Price: Rs.{" "}
                    {(
                      persons * product.detailsproduct[selectedPlan].price
                    ).toLocaleString()}
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center py-10">
              Select a package to see details
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Main Product Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Images Section */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 overflow-x-auto py-2 md:py-0">
                {product.images?.map((img, i) => {
                  const fullUrl = `http://localhost:5000/${img}`;
                  return (
                    <img
                      key={i}
                      src={fullUrl}
                      onClick={() => setSelectedImage(fullUrl)}
                      alt="thumb"
                      className={`w-16 h-16 object-cover rounded-md transition-all duration-200 cursor-pointer
                        ${
                          (selectedImage ||
                            `http://localhost:5000/${product.images?.[0]}`) ===
                          fullUrl
                            ? "border-2 border-red-600 shadow-md"
                            : "border border-gray-300 hover:border-red-400"
                        }`}
                    />
                  );
                })}
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <img
                  src={
                    selectedImage ||
                    `http://localhost:5000/${product.images?.[0]}`
                  }
                  alt={product.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 capitalize">
                  {product.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2 text-gray-600">
                  <span>
                    by{" "}
                    <span className="text-red-500 capitalize underline">
                      {product?.user.businessName}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <IoLocationSharp />
                    {product.Location}
                  </span>
                </div>
              </div>
              <div className="location flex  items-center gap-2 text-gray-600">
                <FaPhoneAlt className="text-red-500" />
                {product.contactNumber}
              </div>

              <div className="py-4 border-t border-gray-200">
                {renderServiceDetails()}
              </div>

              <button
                onClick={() => handlenavigate(product)}
                className="w-full py-3 cursor-pointer  bg-red-500 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Package Selection (for applicable services) */}
        {product.detailsproduct &&
          product.detailsproduct.length > 0 &&
          renderPackageSelection()}

        {/* Reviews Section */}
        {/* {product.reviews && product.reviews.length > 0 && (
          <div className="bg-white shadow rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((r, i) => (
                <div
                  key={i}
                  className="border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="font-medium text-gray-800">
                    {r.user?.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
                  <div className="flex items-center mt-2">
                    <div className="text-yellow-500 flex">
                      {"★".repeat(Math.round(r.rating))}
                      {"☆".repeat(5 - Math.round(r.rating))}
                    </div>
                    <span className="ml-2 text-sm font-semibold">
                      {r.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductUiDesc;
