import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import MobileNavbar from "./MobileNavbar";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="w-[99%] mx-auto flex items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="font-heading text-[27px] font-bold tracking-wide text-pink-600"
          >
            Wed<span className="text-gray-800">Event</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:hidden lg:block">
            <ul className="flex items-center gap-5 md:text-[16px] lg:text-[17px] font-body font-medium text-gray-700">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-1 hover:text-pink-600 transition-colors duration-300 relative group"
                >
                  <IoHomeOutline />
                  Home
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-pink-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>

              <li
                className="relative cursor-pointer"
                onMouseEnter={() => setOpenDropdown("venues")}
                onMouseLeave={() => setOpenDropdown("")}
              >
                <div className="flex items-center gap-1 hover:text-pink-600 transition-colors duration-300">
                  <Link
                    to="/hall"
                    className="flex items-center gap-1 hover:text-pink-600 transition-colors duration-300"
                  >
                    {" "}
                    Venues <IoIosArrowDown />
                  </Link>
                </div>
                {openDropdown === "venues" && (
                  <ul className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                    <li className="px-4 py-2 hover:bg-pink-50 hover:text-pink-600">
                      <Link to="/hall/BanquetHall">Banquet Halls</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-pink-50 hover:text-pink-600">
                      <Link to="/hall/OutdoorGarden">Outdoor Gardens</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-pink-50 hover:text-pink-600">
                      <Link to="/hall/Resort">Resorts</Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Vendor Dropdown */}
              <li
                className="relative cursor-pointer"
                onMouseEnter={() => setOpenDropdown("vendor")}
                onMouseLeave={() => setOpenDropdown("")}
              >
                <div className="flex items-center gap-1 hover:text-pink-600 transition-colors duration-300">
                  Vendor <IoIosArrowDown />
                </div>
                {openDropdown === "vendor" && (
                  <ul className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                    <li className="px-4 py-2 hover:bg-pink-50 hover:text-pink-600">
                      <Link to="/photographers">Photographers</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-pink-50 hover:text-pink-600">
                      <Link to="/catering">Caterers</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-pink-50 hover:text-pink-600">
                      <Link to="/decorators">Decorators</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-pink-50 hover:text-pink-600">
                      <Link to="/carRental">Car Rental</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-pink-50 hover:text-pink-600">
                      <Link to="/dj">dj </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/chat"
                  className="px-2 py-2 hover:bg-pink-50 hover:text-pink-600"
                >
                  AI Planner
                </Link>
              </li>

              <li>
                <Link
                  to="/todolist"
                  className="px-2 py-2 hover:bg-pink-50 hover:text-pink-600"
                >
                  Event Todo List
                </Link>
              </li>
              <li>
                <Link
                  to="/guestmanager"
                  className="px-2 py-2 hover:bg-pink-50 hover:text-pink-600"
                >
                  Guest List
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-pink-600 transition-colors duration-300 relative group"
                >
                  Login
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-pink-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-pink-600 text-white px-5 py-2 rounded-xl shadow hover:bg-pink-700 transition-colors duration-300"
                >
                  Signup
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="block lg:hidden text-2xl text-gray-800 cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiMenu /> : <FiMenu />}
          </button>
        </div>
      </header>
      <MobileNavbar menu={isOpen} onclose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;
