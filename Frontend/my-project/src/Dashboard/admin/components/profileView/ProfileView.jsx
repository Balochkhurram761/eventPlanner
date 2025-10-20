// ProfileView.jsx
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

const ProfileView = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="relative">
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        className="cursor-pointer"
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Avatar
            alt="User Avatar"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 40, height: 40 }}
            onClick={() => setOpen(!open)}
          />
        </Badge>
      </Stack>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-900 shadow-lg rounded-md z-50">
          <button className="block cursor-pointer w-full text-left px-4 py-2 text-white hover:bg-gray-500 ">
            Profile
          </button>
          <hr />
          <button
            className="block w-full cursor-pointer text-left px-4 py-2 text-white hover:bg-gray-500  "
            onClick={handleLogout}
          >
            Logout
          </button>
          <hr />
        </div>
      )}
    </div>
  );
};

export default ProfileView;
