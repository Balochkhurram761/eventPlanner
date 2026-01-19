// ProfileView.jsx
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";

const ProfileViewVd = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full border-2 border-transparent hover:border-yellow-500 transition-all cursor-pointer shadow-lg"
      >
        <Avatar
          alt="Admin"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          sx={{ width: 45, height: 45, filter: "brightness(1.1)" }}
        />
      </div>

      {open && (
        <div className="absolute right-0 mt-4 w-56 bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="p-4 bg-gray-800/50 border-b border-gray-700 text-center">
            <p className="text-sm font-bold">Vendor Dashboard</p>
            <p className="text-[10px] text-yellow-500 tracking-widest uppercase">
              Verified Account
            </p>
          </div>
          <button className="flex items-center cursor-pointer gap-3 w-full px-5 py-3 text-sm hover:bg-yellow-500 hover:text-black transition-all font-semibold">
            <CiUser className="text-white text-xl hover:text-black" /> View
            Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="flex cursor-pointer items-center gap-3 w-full px-5 py-3 text-sm text-red-400 hover:bg-red-500 hover:text-white transition-all font-semibold"
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileViewVd;
