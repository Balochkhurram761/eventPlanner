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
        </NavbarProvider>
      </SearchProvider>
    </ProductProvider>
  );
};

export default LayoutDashboardVd;
