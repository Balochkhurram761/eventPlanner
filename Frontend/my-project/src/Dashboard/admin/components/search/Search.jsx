import React, { useEffect, useRef } from "react";
import { useSearch } from "../../context/SearchContext";
import { HiOutlineSearch } from "react-icons/hi";

const Searchbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-sm md:max-w-md group">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors z-10">
        <HiOutlineSearch size={20} />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search anything..."
        className="block w-full pl-11 pr-10 py-2.5 bg-gray-100/80 border border-transparent 

                   text-gray-900 text-sm rounded-2xl 
                   hover:bg-gray-200/50
                   focus:bg-white focus:border-red-200 focus:ring-4 focus:ring-red-500/10 
                   transition-all duration-200 outline-none placeholder:text-gray-500 shadow-inner"
      />

      <div className="absolute inset-y-0 right-0 pr-3 hidden md:flex items-center pointer-events-none group-focus-within:opacity-0 transition-opacity">
        
      </div>
    </div>
  );
};

export default Searchbar;
