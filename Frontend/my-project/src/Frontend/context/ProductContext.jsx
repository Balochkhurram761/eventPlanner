// ProductContext.js
import axios from "axios";
import React, { createContext, useContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Helper function => API se data fetch karega
  const fetchProducts = async (filters) => {
    try {
      const params = new URLSearchParams();

      if (filters?.serviceType)
        params.append("serviceType", filters.serviceType);
       if(filters?.venue) params.append('venue', filters.venue)
      if (filters?.location && filters.location !== "All")
        params.append("city", filters.location);
      if (filters?.username) params.append("username", filters.username);
      if (filters?.enablePrice) params.append("maxPrice", filters.maxPrice); // agar backend price filter support kare

      const res = await axios.get(
        `http://localhost:5000/api/auth/getdata?${params.toString()}`
      );
      return res.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  return (
    <ProductContext.Provider value={{ fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
