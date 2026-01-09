import React from "react";
import Searchbar from "../search/Search";
import ProfileView from "../profileView/ProfileView";
import { HiMenuAlt2 } from "react-icons/hi"; // Thora better icon
import { useNavbar } from "../../../../Frontend/context/NavbarContext";

const NavbarAdmin = () => {
  const { handlenavbar } = useNavbar();

  return (
    <div className="w-full h-16 bg-white border-b border-gray-200 flex justify-between items-center px-4 md:px-8 fixed top-0 left-0 z-50">
      {/* Mobile Menu & Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handlenavbar}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden text-gray-600 transition-colors"
        >
          <HiMenuAlt2 size={24} />
        </button>
        
        <h1 className="text-xl font-black tracking-tight text-gray-800">
          <span className="text-red-500">Wed</span>Event
          <span className="ml-1 text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded uppercase tracking-widest font-bold">Admin</span>
        </h1>
      </div>

      {/* Search Section */}
      <div className="hidden z-50 sm:block flex-1 max-w-md mx-10">
        <Searchbar />
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <ProfileView />
      </div>
    </div>
  );
};

export default NavbarAdmin;