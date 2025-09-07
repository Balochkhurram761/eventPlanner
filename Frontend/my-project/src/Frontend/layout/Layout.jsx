import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ProductProvider } from "../context/ProductContext";
import Footer from "../components/footer/Footer";

const Layout = () => {
  return (
    <ProductProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ProductProvider>
  );
};

export default Layout;
