import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { fetchProducts } = useProduct();

  // Filter state
  const [filter, setFilter] = useState({
    username: "",
    serviceType: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: fetch data before navigating
     await fetchProducts(filter);
   
   
    const params = new URLSearchParams();
    if (filter.username) params.append("username", filter.username);
    if (filter.serviceType) params.append("serviceType", filter.serviceType);
    if (filter.location) params.append("location", filter.location);

    navigate(`/products?${params.toString()}`);
  };

  return (
    <section className="bg-[#f8f4f1] py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Find the Perfect <br /> Vendor for <br /> Your Wedding
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Vendor Name"
              value={filter.username}
              onChange={(e) =>
                setFilter({ ...filter, username: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-3"
            />

            <select
              value={filter.serviceType}
              onChange={(e) =>
                setFilter({ ...filter, serviceType: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-3"
            >
              <option value="">Select Category</option>
              <option value="hall">Venue</option>
              <option value="catering">Catering</option>
              <option value="photography">Photography</option>
              <option value="dJ">DJ</option>
              <option value="carRental">carRental</option>
            </select>

            <select
              value={filter.location}
              onChange={(e) =>
                setFilter({ ...filter, location: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-3"
            >
              <option value="">Select Location</option>
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[#a47c68] text-white py-3 rounded-md"
            >
              Find Vendor
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="../src/assets/herosection/hero.jpg"
            alt="Hero Section"
            className="rounded-2xl shadow-lg w-[90%] md:w-[100%] object-cover h-[600px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
