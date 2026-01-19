import React from "react";
import NavbarAdmin from "../components/navbarAdmin/NavbarAdmin";
import SideBar from "../components/sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { NavbarProvider } from "../../../Frontend/context/NavbarContext";
import { UserProvider } from "../context/userContext";
import { SearchProvider } from "../context/SearchContext";

const LayoutDashboard = () => {
  return (
    <NavbarProvider>
      <UserProvider>
        <SearchProvider>
          <div className="flex min-h-screen bg-gray-50">
            
            {/* 1. Sidebar - Fixed Width */}
            <aside className="w-64 fixed inset-y-0 left-0 z-20 bg-white border-r">
              <SideBar />
            </aside>

            {/* 2. Right Side Wrapper */}
            <div className="flex-1 flex flex-col ml-64">
              
              {/* 3. Navbar - Adjusted to start AFTER Sidebar (left-64) */}
              <header className="fixed top-0 right-0 left-64 z-10 h-16 bg-white border-b">
                <NavbarAdmin />
              </header>

              {/* 4. Main Content Area */}
              <main className="flex-1 mt-16 p-6">
                <div className="">
                  <Outlet />
                </div>
              </main>

            </div>
          </div>
        </SearchProvider>
      </UserProvider>
    </NavbarProvider>
  );
};

export default LayoutDashboard;