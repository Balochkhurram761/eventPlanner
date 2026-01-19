import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline, IoChevronDownOutline } from "react-icons/io5";
import { CiUser, CiSettings, CiLock } from "react-icons/ci";
import { MdShoppingCart, MdOutlineNotificationsActive } from "react-icons/md";
import { FiTrendingUp, FiVideo } from "react-icons/fi";
import { useNavbar } from "../../../../Frontend/context/NavbarContext";

const SideBar = () => {
  const location = useLocation();
  const { handleclose, navbar } = useNavbar();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/vendor", icon: <IoHomeOutline /> },
    { name: "Products", path: "/vendor/products", icon: <MdShoppingCart /> },
    { name: "Strategic Planning", path: "/vendor/BusinessStartegy", icon: <FiTrendingUp /> },
    { name: "Vendor Interview", path: "/vendor/VendorInterview", icon: <FiVideo /> },
  ];

  const settingSubItems = [
    { name: "Public Profile", path: "/vendor/settings/profile", icon: <CiUser /> },
    { name: "Business Info", path: "/vendor/settings/business", icon: <CiSettings /> },
    { name: "Security", path: "/vendor/settings/security", icon: <CiLock /> },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen w-72 pt-24 bg-[#020617] text-white shadow-2xl flex flex-col transform transition-all duration-500 border-r border-white/5 z-50 lg:translate-x-0 ${navbar ? "translate-x-0" : "-translate-x-full"}`}>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={handleclose}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group ${location.pathname === item.path ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm tracking-wide font-bold">{item.name}</span>
          </Link>
        ))}

        {/* --- SETTINGS DROPDOWN --- */}
        <div className="space-y-1">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl transition-all duration-300 group ${isSettingsOpen ? "bg-white/5 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <div className="flex items-center gap-4 cursor-pointer">
              <CiSettings className="text-2xl" />
              <span className="text-sm tracking-wide font-bold ">Settings</span>
            </div>
            <IoChevronDownOutline className={`transition-transform duration-300 ${isSettingsOpen ? "rotate-180" : ""}`} />
          </button>

          <div className={`overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${isSettingsOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
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

      <div className="p-6">
        <div className="bg-gradient-to-br from-red-600/10 to-red-900/10 p-4 rounded-2xl border border-red-600/20">
          <p className="text-[10px] uppercase text-red-500 font-black mb-1 tracking-widest">System Status</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Vendor Node: Active</p>
        </div>
      </div>
    </div>
  );
};
export default SideBar;