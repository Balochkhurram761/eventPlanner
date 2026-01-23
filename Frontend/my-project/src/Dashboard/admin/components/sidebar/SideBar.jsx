import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineViewGrid, HiOutlineUsers, HiOutlineCog } from "react-icons/hi";
import { useNavbar } from "../../../../Frontend/context/NavbarContext";
import { RxCross2 } from "react-icons/rx";

const SideBar = () => {
  const location = useLocation();
  const { handleclose, navbar } = useNavbar();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/admin", icon: <HiOutlineViewGrid size={20}/> },
    { name: "Users", path: "/admin/users", icon: <HiOutlineUsers size={20}/> },
    { name: "Settings", path: "/settings/Admin", icon: <HiOutlineCog size={20}/> },
  ];

  return (
    <>
      {/* Mobile Overlay - Blur effect optimized */}
      {navbar && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300"
          onClick={handleclose}
        ></div>
      )}

      <aside
        className={`
          fixed top-0  left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 z-[60]
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:top-16
          ${navbar ? "translate-x-0 shadow-2xl shadow-black" : "-translate-x-full "}
        `}
      >
        {/* Header for Mobile: Logo + Close Button */}
        <div className="p-6 lg:hidden flex justify-between items-center border-b border-gray-800">
          <h1 className="text-xl font-bold text-white tracking-tight">
            <span className="text-pink-500">Wed</span>Event
          </h1>
          <button 
            onClick={handleclose} 
            className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <RxCross2 size={20} />
          </button>
        </div>

        <nav className="p-4 mt-4 lg:mt-0">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={handleclose}
                    className={`
                      group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? "bg-pink-600 text-white font-bold shadow-lg shadow-pink-900/20" 
                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }
                    `}
                  >
                    <span className={`${isActive ? "text-white" : "text-gray-500 group-hover:text-pink-400"}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm tracking-wide">{item.name}</span>
                    
                    {/* Active Indicator Bar (Optional) */}
                    {isActive && (
                      <span className="ml-auto w-1 h-5 rounded-full bg-white/40"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer info inside sidebar (Optional) */}
        <div className="absolute bottom-20 lg:bottom-24 left-0 w-full px-6 opacity-40">
           <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Admin Panel v2.0</p>
        </div>
      </aside>
    </>
  );
};

export default SideBar;