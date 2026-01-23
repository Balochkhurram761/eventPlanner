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
            <aside className=" ">
              <SideBar />
            </aside>

            {/* 2. Right Side Wrapper */}
            <div className="flex-1 flex flex-col ">
              
              <header className="fixed top-0 right-0 left-64 z-10 h-16 bg-white border-b">
                <NavbarAdmin />
              </header>

              {/* 4. Main Content Area */}
              <main className="flex-1  p-6">
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