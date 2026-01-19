import React from "react";
import { useProduct } from "../context/ProductContext";
const Searchbar = () => {
  const { searchQuery, setSearchQuery } = useProduct();

  return (
    <div className="search  bg-white rounded-lg w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="px-4 py-2 r text-black w-53 sm:w-100 outline-none"
      />
    </div>
  );
};

export default Searchbar;
