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
    { name: "Settings", path: "/admin/settings", icon: <HiOutlineCog size={20}/> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {navbar && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden"
          onClick={handleclose}
        ></div>
      )}

      <aside
        className={`
          fixed top-0 lg:top-16 left-0 h-screen w-64 bg-gray-900 lg:bg-white border-r border-gray-200 z-[60]
          transform transition-all duration-300 ease-in-out
          lg:translate-x-0
          ${navbar ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo for Mobile SideBar Only */}
        <div className="p-6 lg:hidden flex justify-between items-center border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">
            <span className="text-red-500">Wed</span>Event
          </h1>
          <button onClick={handleclose} className="text-gray-400"><RxCross2 /></button>
        </div>

        <nav className="p-4">
         
          <ul className="flex flex-col gap-1">
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
                        ? "bg-red-50 text-red-600 font-bold shadow-sm shadow-red-100" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <span className={`${isActive ? "text-red-600" : "text-gray-400 group-hover:text-gray-900"}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.name}</span>
                    
                    {/* Active Indicator Dot */}
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;