import React from "react";
import NavbarAdmin from "../components/navbarAdmin/NavbarAdmin";
import SideBar from "../components/sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { SearchProvider } from "../context/SearchContext";
import { UserProvider } from "../context/userContext";
import { NavbarProvider } from "../../../Frontend/context/NavbarContext";

const LayoutDashboard = () => {
  return (
    <NavbarProvider>
      <UserProvider>
        <SearchProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Navbar fixed */}
              <div className="fixed top-0 left-0 right-0 z-10">
                <NavbarAdmin />
              </div>

              {/* Outlet content with padding-top = Navbar height */}
              <main className="pt-[64px] lg:ml-[250px] p-6">
                <Outlet />
              </main>
            </div>
          </div>
        </SearchProvider>
      </UserProvider>
    </NavbarProvider>
  );
};

export default LayoutDashboard;
