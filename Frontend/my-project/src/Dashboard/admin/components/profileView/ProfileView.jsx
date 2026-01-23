import React, { useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineChevronDown,
} from "react-icons/hi";
import { useSearch } from "../../context/SearchContext";

const ProfileView = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { preview, setPreview } = useSearch();

  // Local storage se user ka data nikalna
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-10" ref={dropdownRef}>
      {/* Profile Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200"
      >
        <Avatar
          alt={user?.name || "Admin"}
          src={preview || "/static/images/avatar/2.jpg"}
          sx={{
            width: 36,
            height: 36,
            border: "2px solid white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
        <div className="hidden md:block">
          <HiOutlineChevronDown
            className={`text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Floating Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "admin@wedevent.com"}
            </p>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                navigate("/settings/Admin");
                setOpen(false);
              }}
              className="flex items-center cursor-pointerr gap-3 w-full px-3 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors group"
            >
              <div className="p-2 bg-gray-50 group-hover:bg-red-100 rounded-lg text-gray-500 group-hover:text-red-600">
                <HiOutlineUser size={18} />
              </div>
              My Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer gap-3 w-full px-3 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors group"
            >
              <div className="p-2  bg-gray-50 group-hover:bg-red-100 rounded-lg text-gray-500 group-hover:text-red-600">
                <HiOutlineLogout size={18} />
              </div>
              Sign Out
            </button>
          </div>

          {/* Footer Tip */}
          <div className="px-4 py-2 mt-2 bg-gray-50 rounded-b-2xl">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest text-center">
              WedEvent v2.0
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
