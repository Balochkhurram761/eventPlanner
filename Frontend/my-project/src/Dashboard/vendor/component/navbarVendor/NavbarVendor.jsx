import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { useNavbar } from "../../../../Frontend/context/NavbarContext";
import Searchbar from "../searchVendor/Search";
import ProfileViewVd from "../profileview/ProfileViewVD";
const NavbarAdmin = () => {
  const { handlenavbar } = useNavbar();

  return (
    <div className="w-full h-20 z-40 bg-[#0f172a] backdrop-blur-md text-white flex justify-between items-center px-8 border-b border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.4)] fixed top-0 left-0 ">
      <div className="flex items-center gap-4">
        <div className="lg:hidden text-2xl cursor-pointer hover:text-yellow-500 transition-colors">
          <CiMenuBurger onClick={handlenavbar} />
        </div>
        <h1 className="text-2xl hidden lg:block font-black tracking-tighter italic">
          <span className="text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">
            WED
          </span>
          <span className="text-white">EVENT</span>
        </h1>
      </div>

      <div className=" w-xl md:flex-1 lg:flex-1  md:block lg:block max-w-xl px-6">
        <Searchbar />
      </div>

      <div className="flex items-center gap-4">
        <ProfileViewVd />
      </div>
    </div>
  );
};

export default NavbarAdmin;
