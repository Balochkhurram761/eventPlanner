import React, { useState } from "react";
import { FiSearch, FiSliders } from "react-icons/fi";

const FilterBox = ({ onSearch }) => {
  const [businessName, setbusinessName] = useState("");
  const [location, setLocation] = useState("All");
  const [enablePrice, setEnablePrice] = useState(false);
  const [maxPrice, setMaxPrice] = useState(200000);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = { businessName, location, enablePrice, maxPrice };
    if (onSearch) onSearch(filters);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-pink-100 rounded-[2rem] p-8 mb-12 shadow-xl shadow-pink-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
          <FiSliders size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Refine Your Search</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
      >
        {/* Vendor Name */}
        <div className="md:col-span-3 space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
            Vendor Name
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            value={businessName}
            onChange={(e) => setbusinessName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
          />
        </div>

        {/* Location */}
        <div className="md:col-span-3 space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
            City
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-pink-500 outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="All">All Pakistan</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
          </select>
        </div>

        {/* Price Slider Section */}
        <div className="md:col-span-4 space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex justify-between items-center mb-1">
            <button
              type="button"
              onClick={() => setEnablePrice(!enablePrice)}
              className={`text-[10px] font-black uppercase px-2 py-1 rounded-md transition-all ${
                enablePrice
                  ? "bg-pink-600 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {enablePrice ? "Price Live" : "Enable Price"}
            </button>
            <span className="text-xs font-bold text-pink-600">
              PKR {maxPrice.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="200000"
            value={maxPrice}
            disabled={!enablePrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer transition-all ${
              enablePrice
                ? "accent-pink-600 bg-pink-100"
                : "accent-slate-300 bg-slate-200"
            }`}
          />
        </div>

        {/* Search Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-pink-200 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <FiSearch className="group-hover:rotate-12 cursor-pointer transition-transform" />
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBox;
