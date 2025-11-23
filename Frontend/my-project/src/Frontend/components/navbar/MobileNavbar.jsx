import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const MobileNavbar = ({ menu, onclose }) => {
  return (
    <div
      className={`lg:hidden fixed top-0 left-0 w-[90%] sm:w-[400px] h-[100vh] 
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
      <ul className="flex flex-col gap-6 text-lg font-poppins font-medium">
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
          <a className="block w-full px-6 py-2  hover:bg-white/20 transition rounded-lg">
            <span className="flex items-center  justify-between">
              Venues
              <FaPlus className="" />
            </span>
          </a>
        </li>
        <li>
          <a className="block w-full px-6 py-2  hover:bg-white/20 transition rounded-lg">
            <span className="flex items-center  justify-between">
              Vendors
              <FaPlus className="" />
            </span>
          </a>
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
