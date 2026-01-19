import React from "react";
import { Outlet } from "react-router-dom";

import { NavbarProvider } from "../../../Frontend/context/NavbarContext";
import NavbarAdmin from "../component/navbarVendor/NavbarVendor";
import { SearchProvider } from "../../admin/context/SearchContext";
import SideBar from "../component/sidebar/sidebarVd";
import { ProductProvider } from "../component/context/ProductContext";

const LayoutDashboardVd = () => {
  return (
    <ProductProvider>
      <SearchProvider>
        <NavbarProvider>
          {/* Main Wrapper */}
          <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - Fixed Width */}
            <aside className="w-64 fixed inset-y-0 left-0 z-20 bg-white border-r">
              <SideBar />
            </aside>

            {/* Right Side Content Area */}
            <div className="flex-1 flex flex-col ml-64">
              {/* Navbar - Fixed at Top, starts after Sidebar */}
              <header className="fixed top-0 right-0 left-64 h-16 z-10 bg-white shadow-sm border-b">
                <NavbarAdmin />
              </header>

              {/* Main Content (Outlet) */}
              <main className="flex-1 ">
                <div className="">
                  <Outlet />
                </div>
              </main>
            </div>
          </div>
        </NavbarProvider>
      </SearchProvider>
    </ProductProvider>
  );
};

export default LayoutDashboardVd;
