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

const ProductUiDesc = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
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
                  <p>
                    <span className="font-semibold">Menu:</span>{" "}
                    {product.cateringMenu?.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold">Price / Head:</span> Rs{" "}
                    {product.cateringPricePerHead}
                  </p>
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
                        <div className="bd flex text-[#777] flex-col items-center  ">
                          <p className="font-medium text-black">Staff</p>
                          {product.staff}
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
