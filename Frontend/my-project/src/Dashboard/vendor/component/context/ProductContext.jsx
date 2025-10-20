import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getproductdata = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/auth/vendor/fetchproduct?search=${
          searchQuery || ""
        }`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setProducts(data.data || []);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getproductdata();
  }, [searchQuery]);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, searchQuery, setSearchQuery }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
