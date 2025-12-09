import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const MobileNavbar = ({ menu, onclose }) => {
  const [droplist, setdroplist] = useState(false);
  const handledroplist = (name) => {
    setdroplist(droplist === name ? null : name);
  };
  return (
    <div
      className={`lg:hidden  fixed top-0 left-0 w-[90%] sm:w-[400px] h-[100vh]  overflow-auto
      bg-pink-600 text-white z-50 transition-transform duration-300 shadow-2xl
      ${menu ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={onclose}
          className="text-white text-3xl cursor-pointer hover:text-pink-100"
        >
          <IoMdClose />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col gap-5 text-lg font-poppins font-medium">
        <li>
          <Link
            to={"/"}
            onClick={onclose}
            className="block w-full px-6 py-2 hover:bg-white/20 transition rounded-lg"
          >
            Home
          </Link>
        </li>

        <li>
          <span className="block w-full px-6 py-2  hover:bg-white/20 transition rounded-lg">
            <span
              className={`flex items-center   transition-transform duration-300 cursor-pointer justify-between`}
              onClick={() => handledroplist("venues")}
            >
              Venues
              {droplist === "venues" ? <FaMinus /> : <FaPlus className="" />}
            </span>
          </span>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              droplist === "venues"
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-1 px-8 py-2">
              <Link
                to={""}
                className="py-2 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                Banquet Halls
              </Link>
              <Link
                to={""}
                className="py-2 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                OutDoor Gardens
              </Link>
              <Link
                to={""}
                className="py-2 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                Resorts
              </Link>
            </div>
          </div>
        </li>
        <li>
          <span className="block w-full px-6 py-2  hover:bg-white/20 transition rounded-lg">
            <span
              className="flex items-center  cursor-pointer justify-between"
              onClick={() => handledroplist("vendors")}
            >
              Vendors
              {droplist === "vendors" ? <FaMinus /> : <FaPlus className="" />}
            </span>
          </span>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              droplist === "vendors"
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-1 px-8 py-2">
              <Link
                to={"/photographers"}
                onClick={onclose}
                className="py-2 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                Photographers
              </Link>
              <Link
                to={"/catering"}
                onClick={onclose}
                className="py-2 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                Caterers
              </Link>
              <Link
                to={"/decorators"}
                onClick={onclose}
                className="py-2 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                Decorators
              </Link>
              <Link
                to={"/carRental"}
                onClick={onclose}
                className="py-2 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                Car Rental
              </Link>
              <Link
                to={"/dj"}
                onClick={onclose}
                className="py-2 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                Dj
              </Link>
            </div>
          </div>
        </li>
        <li>
          <Link
            to={"/chat"}
            onClick={onclose}
            className="block w-full px-6 py-2 hover:bg-white/20 transition rounded-lg"
          >
            AI Event Planner
          </Link>
        </li>

        <li>
          <Link
            to={"/todolist"}
            onClick={onclose}
            className="block w-full px-6 py-2 hover:bg-white/20 transition rounded-lg"
          >
            Event Todo List
          </Link>
        </li>

        <li>
          <Link
            to={"/guestmanager"}
            onClick={onclose}
            className="block w-full px-6 py-2 hover:bg-white/20 transition rounded-lg cursor-pointer"
          >
            Event Guest Management
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            onClick={onclose}
            className="block w-full px-6 py-2 hover:bg-white/20 transition rounded-lg cursor-pointer"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            onClick={onclose}
            className="block w-full px-6 py-2 hover:bg-white/20 transition rounded-lg cursor-pointer"
          >
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavbar;
