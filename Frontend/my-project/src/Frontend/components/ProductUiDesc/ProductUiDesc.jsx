import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { IoCarSportSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdPolicy } from "react-icons/md";
import { AiFillExperiment } from "react-icons/ai";
import { BiSolidHourglassTop } from "react-icons/bi";
import { TfiGallery } from "react-icons/tfi";
import { FaCamera } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { IoVideocam } from "react-icons/io5";
import { FaUtensils, FaChair, FaUserTie } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ProductUiDesc = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [guests, setGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-10">No product found</div>;
  }

  return (
    <div className="bg bg-gray-100">
      <div className="w-[100%] mx-auto p-6 space-y-8  min-h-screen">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-md">
          {/* Images */}
          <div className="flex flex-row gap-3">
            <div className="flex flex-col  gap-3 mt-4 cursor-pointer">
              {product.images?.map((img, i) => {
                const fullUrl = `http://localhost:5000/${img}`;
                return (
                  <img
                    key={i}
                    src={fullUrl}
                    onClick={() => setSelectedImage(fullUrl)}
                    alt="thumb"
                    className={`w-20 h-20 object-cover rounded-md transition-all duration-200
                    ${
                      (selectedImage ||
                        `http://localhost:5000/${product.images?.[0]}`) ===
                      fullUrl
                        ? "border-2 border-red-600 shadow-md scale-105"
                        : "border border-gray-300 hover:scale-105"
                    }`}
                  />
                );
              })}
            </div>
            {/* Big Image */}
            <img
              src={
                selectedImage || `http://localhost:5000/${product.images?.[0]}`
              }
              alt={product.title}
              className="w-[90%] h-[600px] object-cover rounded-xl shadow-md"
            />

            {/* Thumbnails */}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div className="flex  flex-col gap-2">
              <h1 className="text-4xl font-bold capitalize text-gray-900">
                {product.title}
              </h1>
              <p className="mt-2 text-gray-600 flex flex-row gap-5">
                <span className="">
                  by
                  <span className="text-red-500 capitalize underline  ">
                    {" "}
                    {product?.user.businessName}
                  </span>
                </span>
                <span className="flex capitalize items-center gap-1 text-[16px]">
                  <IoLocationSharp />
                  {product.Location}
                </span>
              </p>
            </div>

            <div className="">
              {product.serviceType === "hall" && (
                <>
                  <p>
                    <span className="font-semibold">Venue:</span>{" "}
                    {product.venue}
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
                </>
              )}

              {product.serviceType === "catering" && (
                <>
                  <div className="wrap flex flex-col gap-9">
                    <p className="font-semibold text-2xl">
                      <span className="">PKR</span>{" "}
                      {product.cateringminPerHead?.toLocaleString()}-
                      <span className="">PKR</span> {product.cateringmaxPerHead}
                    </p>
                    <div className="wrap flex gap-40">
                      <p className="flex gap-2.5 items-center ">
                        <span className="text-red-500 text-2xl ">
                          <FaUser />
                        </span>{" "}
                        <div className="bd flex text-[#777] flex-col items-center">
                          <p className="font-medium text-black">Staff</p>

                          <div className="flex flex-row gap-3">
                            {product.staff &&
                              JSON.parse(product.staff).map((item, index) => (
                                <span key={index} className=" py-1 capitalize">
                                  {item}
                                </span>
                              ))}
                          </div>
                        </div>
                      </p>
                      <p className="flex gap-2.5 items-center">
                        <span className="text-red-500 text-2xl ">
                          <MdPolicy />
                        </span>{" "}
                        <div className="bd flex text-[#777] flex-col items-center justify-center ">
                          <p className="font-medium text-black">
                            {" "}
                            Cancellation Policy
                          </p>
                          {product.cancellation}
                        </div>
                      </p>
                    </div>
                    <div className="cateringservice space-y-3 ">
                      {product.cateringServices && (
                        <ul className="space-y-10 grid ">
                          {/* Sound */}
                          <div className="wra flex  gap-35">
                            <li className="flex items-center flex-col gap-3">
                              <div className=" flex items-center  gap-2">
                                <FaMusic className="text-orange-600 text-xl" />

                                <span className="w-32 font-medium">
                                  Provide Sound
                                </span>
                              </div>
                              {product.cateringServices.sound ? (
                                <span className="flex items-center gap-1 text-green-600">
                                  Yes
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-red-600">
                                  No
                                </span>
                              )}
                            </li>

                            {/* Plates */}
                            <li className="flex items-center flex-col gap-3">
                              <div className="flex  items-center gap-4">
                                <div className="c flex gap-2 items-center">
                                  <FaUtensils className="text-orange-600 text-xl" />
                                  <span className="w-32 font-medium">
                                    Provide Plates
                                  </span>
                                </div>
                              </div>
                              {product.cateringServices.plates ? (
                                <span className="flex items-center gap-1 text-green-600">
                                  Yes
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-red-600">
                                  No
                                </span>
                              )}
                            </li>
                          </div>
                          <div className="wra flex  gap-37">
                            {/* Seating */}
                            <li className="flex items-center flex-col gap-3">
                              <div className="c flex gap-2 ">
                                <FaChair className="text-orange-600 text-xl" />
                                <span className="w-32 font-medium">
                                  Provide Seating
                                </span>
                              </div>
                              {product.cateringServices.seating ? (
                                <span className="flex items-center gap-1 text-green-600">
                                  Yes
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-red-600">
                                  No
                                </span>
                              )}
                            </li>

                            {/* Waiters */}
                            <li className="flex items-center flex-col gap-3">
                              <div className="c flex items-center">
                                <FaUserTie className="text-orange-600 text-xl" />
                                <span className="w-32 font-medium">
                                  Provide Waiters
                                </span>
                              </div>
                              {product.cateringServices.waiters ? (
                                <span className="flex items-center gap-1 text-green-600">
                                  Yes
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-red-600">
                                  No
                                </span>
                              )}
                            </li>
                          </div>

                          {/* Decoration */}
                          <div className="wra flex items-center gap-37">
                            <li className="flex items-center flex-col gap-3">
                              <div className="c flex items-center  gap-1.5">
                                <MdCelebration className="text-orange-600 text-xl" />
                                <span className="w-40 font-medium">
                                  Provide Decoration
                                </span>
                              </div>
                              {product.cateringServices.decoration ? (
                                <span className="flex items-center gap-1 text-green-600">
                                  Yes
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-red-600">
                                  No
                                </span>
                              )}
                            </li>
                          </div>
                        </ul>
                      )}
                    </div>
                    <div className="desc">
                      <p>
                        <span className="font-bold">Description:</span>{" "}
                        {product.description}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {product.serviceType === "dj" && (
                <>
                  <div className="wrap flex flex-col gap-9">
                    <p className="font-semibold text-2xl">
                      <span className="">PKR</span>{" "}
                      {product.djRate?.toLocaleString()}
                    </p>
                    <div className="wrap flex">
                      <p className="flex gap-2.5 ">
                        <span className="text-red-500 text-2xl ">
                          <BiSolidHourglassTop />
                        </span>{" "}
                        <div className="bd flex font-medium flex-col items-center justify-center ">
                          <p> hours</p>
                          {product.djDuration}
                        </div>
                      </p>
                    </div>
                    <div className="bd flex text-[#777] flex-col   ">
                      <p className="font-medium text-black"> Description</p>
                      {product.description}
                    </div>
                  </div>
                </>
              )}

              {product.serviceType === "photographers" && (
                <>
                  <div className="wrap flex flex-col gap-9">
                    <p className="font-semibold text-2xl">
                      <span className="">PKR</span>{" "}
                      {product.photographerStartingRange?.toLocaleString()}-
                      <span className="">PKR</span>{" "}
                      {product.photographerexpectedRange}
                    </p>
                    <div className="wrap flex justify-around">
                      <p className="flex gap-2 items-center  justify-start">
                        <span className="text-red-500 text-2xl ">
                          <AiFillExperiment />
                        </span>{" "}
                        <div className="bd flex text-[#777] flex-col items-center  ">
                          <p className="font-medium text-black">Expertise</p>
                          {product.photographerPackage}
                        </div>
                      </p>
                      <p className="flex gap-2.5 items-center ">
                        <span className="text-red-500 text-2xl ">
                          <FaUser />
                        </span>{" "}
                        <div className="bd flex text-[#777] flex-col items-center">
                          <p className="font-medium text-black">Staff</p>

                          <div className="flex flex-row gap-3">
                            {product.staff &&
                              JSON.parse(product.staff).map((item, index) => (
                                <span key={index} className=" py-1 capitalize">
                                  {item}
                                </span>
                              ))}
                          </div>
                        </div>
                      </p>
                      <p className="flex gap-2.5 items-center">
                        <span className="text-red-500 text-2xl ">
                          <MdPolicy />
                        </span>{" "}
                        <div className="bd flex text-[#777] flex-col items-center justify-center ">
                          <p className="font-medium text-black">
                            {" "}
                            cancellation Policy
                          </p>
                          {product.cancellation}
                        </div>
                      </p>
                    </div>
                    <div className="desc">
                      <p>
                        <span className="font-bold">Description:</span>{" "}
                        {product.description}
                      </p>
                    </div>
                    <div className="desc">
                      <p>
                        <span className="font-bold">Additonal Info:</span>{" "}
                        {product.adddtionalinformation}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {product.serviceType === "decorators" && (
                <>
                  <p>
                    <span className="font-semibold">Theme:</span>{" "}
                    {product.decoratorTheme}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> Rs{" "}
                    {product.decoratorPrice}
                  </p>
                  <p>
                    <span className="font-semibold">Types:</span>{" "}
                    {product.typeDecrators?.join(", ")}
                  </p>
                </>
              )}

              {product.serviceType === "carRental" && (
                <>
                  <div className="wrap flex flex-col gap-9">
                    <p className="font-semibold text-2xl">
                      <span className="">PKR</span>{" "}
                      {product.carRentalPrice?.toLocaleString()} /
                      {product.carRentalDuration} day
                    </p>
                    <div className="wrap flex justify-around">
                      <p className="flex gap-2.5 ">
                        <span className="text-red-500 text-2xl ">
                          <MdOutlineAirlineSeatReclineNormal />
                        </span>{" "}
                        <div className="bd flex font-medium flex-col items-center justify-center ">
                          <p> Seats</p>
                          {product.Seats}
                        </div>
                      </p>
                      <p className="flex gap-2.5 ">
                        <span className="text-red-500 text-2xl ">
                          <GiCarDoor />
                        </span>{" "}
                        <div className="bd flex font-medium flex-col items-center justify-center ">
                          <p> Doors</p>
                          {product.Door}
                        </div>
                      </p>
                      <p className="flex gap-2.5 ">
                        <span className="text-red-500 text-2xl ">
                          <IoCarSportSharp />
                        </span>{" "}
                        <div className="bd flex font-medium flex-col items-center justify-center ">
                          <p> Transmission</p>
                          {product.Transmission}
                        </div>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* CTA Button */}
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>
        </div>
        {product.serviceType === "catering" && (
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT SIDE: Menu list */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              {product.cateringMenu?.map((menu, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300
                ${
                  selectedPlan === index
                    ? "bg-red-600 text-white border-red-600 shadow-lg transform scale-105"
                    : "bg-gray-50 border-gray-200 hover:bg-red-50 hover:border-red-400 hover:shadow-md"
                }`}
                  onClick={() => {
                    setSelectedPlan(index);
                    setGuests(1);
                  }}
                >
                  <p className="font-semibold text-lg">{menu.title}</p>
                  <p className="text-sm mt-1">
                    PKR{" "}
                    <span className="font-bold">
                      {menu.price.toLocaleString()}
                    </span>{" "}
                    / head
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE: Menu details */}
            <div className="w-full md:w-2/3 bg-white shadow-xl rounded-2xl p-6">
              {selectedPlan !== null ? (
                <div className="flex flex-col gap-6">
                  {/* Title + Price */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">
                      {product.cateringMenu[selectedPlan].title}
                    </h3>
                    <p className="text-green-600 font-medium text-lg flex items-center gap-2">
                      <MdAttachMoney className="text-xl" />
                      Rs. {product.cateringMenu[selectedPlan].price} per head
                    </p>
                  </div>

                  {/* Guests Counter */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold text-xl"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold flex items-center gap-2">
                      <FaUsers className="text-red-600" /> {guests} Guests
                    </span>
                    <button
                      onClick={() => setGuests((g) => g + 1)}
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-bold text-xl"
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-lg font-semibold text-blue-800">
                      Total: Rs.{" "}
                      {(
                        product.cateringMenu[selectedPlan].price * guests
                      ).toLocaleString()}
                    </p>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                      <FaCalendarAlt className="text-red-600" /> Select Event
                      Date
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                      placeholderText="Choose your event date"
                      minDate={new Date()}
                    />
                  </div>

                  {/* Details List */}
                  <div>
                    <h4 className="font-semibold mb-2">Menu Includes:</h4>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      {product.cateringMenu[selectedPlan].details.map(
                        (detail, idx) => (
                          <li key={idx}>{detail}</li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Availability Button */}
                  <button
                    className="mt-4 w-full bg-red-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-red-700 transition-all"
                    onClick={() =>
                      alert(
                        `Checking availability for ${
                          product.cateringMenu[selectedPlan].title
                        } on ${selectedDate?.toLocaleDateString()} for ${guests} guests`
                      )
                    }
                  >
                    Check Availability
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-center mt-10">
                  Select a menu to see details
                </p>
              )}
            </div>
          </div>
        )}

        {product.serviceType === "photographers" && (
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT SIDE: Plans list */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              {product.photographerPlans?.map((plan, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300
            ${
              selectedPlan === index
                ? "bg-red-600 text-white border-red-600 shadow-lg transform scale-105"
                : "bg-gray-50 border-gray-200 hover:bg-red-50 hover:border-red-400 hover:shadow-md"
            }`}
                  onClick={() => setSelectedPlan(index)}
                >
                  <p className="font-semibold text-lg">{plan.title}</p>
                  <p className="text-sm mt-1">
                    PKR{" "}
                    <span className="font-bold">
                      {plan.price.toLocaleString()}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE: Plan details */}
            <div className="w-full md:w-2/3 bg-white shadow-lg rounded-2xl p-6">
              {selectedPlan !== null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: "event", icon: TfiGallery, label: "Deliverables" },
                    {
                      key: "photography",
                      icon: FaCamera,
                      label: "Photography",
                    },
                    { key: "team", icon: TiUserAdd, label: "Team" },
                    {
                      key: "videography",
                      icon: IoVideocam,
                      label: "Videography",
                    },
                  ].map(({ key, icon: Icon, label }) => (
                    <div key={key}>
                      <h3 className="font-bold flex items-center gap-2  text-lg">
                        <Icon className="text-red-600" /> {label}
                      </h3>
                      <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                        {product.photographerPlans[selectedPlan].deliverables[
                          key
                        ].map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center mt-10">
                  Select a plan to see details
                </p>
              )}
            </div>
          </div>
        )}
        {product.serviceType === "carRental" && (
          <div className="desc">
            <p>
              <span className="font-bold">Description:</span>{" "}
              {product.description}
            </p>
          </div>
        )}
        {product.reviews && product.reviews.length > 0 && (
          <div className="bg-white shadow p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((r, i) => (
                <div key={i} className="border-b pb-3">
                  <p className="font-medium text-gray-800">
                    {r.user?.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-600">{r.comment}</p>
                  <p className="text-yellow-500 font-semibold mt-1">
                    ⭐ {r.rating}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductUiDesc;
