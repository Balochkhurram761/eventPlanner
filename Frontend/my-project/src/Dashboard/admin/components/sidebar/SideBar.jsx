import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { useNavbar } from "../../../../Frontend/context/NavbarContext";

const SideBar = () => {
  const location = useLocation();
  const { handleclose, navbar } = useNavbar();
  const menuItems = [
    { name: "Dashboard", path: "/dashboard/admin", icon: <IoHomeOutline /> },
    { name: "Users", path: "/admin/users", icon: <CiUser /> },
    // { name: "Products", path: "/admin/products", icon: "📦" },
    // { name: "Orders", path: "/admin/orders", icon: "🧾" },
    { name: "Settings", path: "/admin/settings", icon: <CiSettings /> },
  ];

  return (
    <div
      className={`
    fixed top-16 left-0 h-screen w-64 py-5 bg-gray-900 text-white shadow-lg flex flex-col 
    transform transition-transform duration-300
    lg:translate-x-0
    ${navbar ? "translate-x-0" : "-translate-x-full"}
  `}
    >
      <div className="heading">
        <h1 className="text-xl text-center block lg:hidden font-semibold">
          <span className="text-red-500 font-bold"> Wed</span>Event
        </h1>
      </div>
      <ul className="flex flex-col gap-2 p-4 font-semibold">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={handleclose} // click sidebar link me close karna
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
            ${
              location.pathname === item.path
                ? "bg-yellow-500 text-black font-semibold"
                : "hover:bg-gray-700 hover:text-yellow-400"
            }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
