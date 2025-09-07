import React, { useState } from "react";

const FilterBox = ({ onSearch }) => {
  const [username, setusername] = useState("");
  const [location, setLocation] = useState("All");
  const [enablePrice, setEnablePrice] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200000);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ username, location, enablePrice, maxPrice });
  };

  return (
    <div className="bg-white border border-black rounded-md p-6 mb-10">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Refine Your Search
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 border-[#94624b] outline-none md:grid-cols-5 gap-4 items-center"
      >
        {/* Vendor Name */}
        <input
          type="text"
          placeholder="Type Vendor Name"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-[#94624b] outline-none"
        />

        {/* Location */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-[#94624b] outline-none"
        >
          <option value="All">Select Location</option>
          <option value="lahore">Lahore</option>
          <option value="Karachi">Karachi</option>
          <option value="Islamabad">Islamabad</option>
        </select>

        <div className="flex items-center gap-2 outline-none">
          <button
            type="button"
            onClick={() => setEnablePrice(!enablePrice)}
            className={`px-3 py-1 outline-none rounded-md text-sm ${
              enablePrice
                ? "bg-[#94624b] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {enablePrice ? "Price Enabled" : "Enable Price"}
          </button>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-600 mb-1">
            Pkr 1 - {maxPrice.toLocaleString()}
          </span>
          <input
            type="range"
            min="1"
            max="200000"
            value={maxPrice}
            disabled={!enablePrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#94624b]"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-[#94624b] text-white px-6 py-2 rounded-md hover:bg-[#7a4e39] transition"
        >
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default FilterBox;
