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
              <main className="flex-1  ">
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
