import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline, IoChevronDownOutline } from "react-icons/io5";
import { CiUser, CiSettings, CiLock } from "react-icons/ci";
import { MdShoppingCart } from "react-icons/md";
import { FiTrendingUp, FiVideo } from "react-icons/fi";
import { useNavbar } from "../../../../Frontend/context/NavbarContext";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineSafetyCertificate } from "react-icons/ai"; // Trust/Quality certificate
const SideBar = () => {
  const location = useLocation();
  const { handleclose, navbar } = useNavbar();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/vendor", icon: <IoHomeOutline /> },
    { name: "Products", path: "/vendor/products", icon: <MdShoppingCart /> },
    {
      name: "Strategic Planning",
      path: "/vendor/BusinessStartegy",
      icon: <FiTrendingUp />,
    },
    {
      name: "Vendor Interview",
      path: "/vendor/VendorInterview",
      icon: <FiVideo />,
    },
    {
      name: "AI Vendor Assistant",
      path: "/vendor/VendorAIAssistant",
      icon: <AiOutlineSafetyCertificate />,
    },
  ];

  const settingSubItems = [
    
    {
      name: "Business Info",
      path: "/vendor/settings/business",
      icon: <CiSettings />,
    }
  ];

  return (
    <>
      {/* 1. Mobile Overlay: Bahar click karne se close ho jaye */}
      {navbar && (
        <div
          className="fixed inset-0 bg-black/60 cursor-pointer backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300"
          onClick={handleclose}
        ></div>
      )}

      {/* 2. Sidebar Main Container */}
      <aside
        className={`
        fixed top-0 left-0 h-screen w-72  bg-[#020617] text-white shadow-2xl flex flex-col 
        transform transition-transform duration-300 ease-in-out border-r border-white/10 z-[60]
        lg:translate-x-0 lg:top-20
        ${navbar ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Mobile Header: Logo + Close Button (Only visible on mobile) */}
        <div className="p-6 lg:hidden flex justify-between items-center border-b border-white/5">
          <h1 className="text-xl font-bold text-white tracking-tight">
            <span className="text-red-600">Wed</span>Event
          </h1>
          <button
            onClick={handleclose}
            className="p-2 bg-white/5 rounded-lg text-gray-400"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleclose}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group 
                ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "hover:bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm tracking-wide font-bold">
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* --- SETTINGS DROPDOWN --- */}
          <div className="space-y-1">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl transition-all duration-300 
              ${isSettingsOpen ? "bg-white/5 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <div className="flex items-center gap-4">
                <CiSettings className="text-2xl" />
                <span className="text-sm tracking-wide font-bold">
                  Settings
                </span>
              </div>
              <IoChevronDownOutline
                className={`transition-transform duration-300 ${isSettingsOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isSettingsOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {settingSubItems.map((sub) => (
                <Link
                  key={sub.name}
                  to={sub.path}
                  onClick={handleclose}
                  className="flex items-center gap-4 px-12 py-3 text-gray-500 hover:text-red-500 transition-colors text-sm font-bold"
                >
                  <span className="text-xl">{sub.icon}</span>
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* System Status Section */}
        <div className="p-6 mt-auto">
          <div className="bg-gradient-to-br from-red-600/10 to-red-900/10 p-4 rounded-2xl border border-red-600/20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] uppercase text-red-500 font-black tracking-widest">
                System Status
              </p>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">
              Vendor Node: Active
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
