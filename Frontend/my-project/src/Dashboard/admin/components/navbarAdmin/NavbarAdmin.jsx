import React from "react";
import Searchbar from "../search/Search";
import ProfileView from "../profileView/ProfileView";
import { CiMenuBurger } from "react-icons/ci";
import { useNavbar } from "../../../../Frontend/context/NavbarContext";

const NavbarAdmin = () => {
  const { handlenavbar } = useNavbar();

  return (
    <div className="w-full  h-16 bg-gray-900 text-white flex justify-between items-center px-6 shadow-md fixed top-0 left-0 z-50">
      <div className="menu text-2xl block cursor-pointer lg:hidden text-white outline-none border-none">
        <CiMenuBurger onClick={handlenavbar} />
      </div>
      <h1 className="text-xl hidden lg:block font-semibold">
        <span className="text-red-500 font-bold"> Wed</span>Event
      </h1>

      <div className="searchbar">
        <Searchbar />
      </div>
      <div className="logout">
        <ProfileView />
      </div>
    </div>
  );
};

export default NavbarAdmin;
