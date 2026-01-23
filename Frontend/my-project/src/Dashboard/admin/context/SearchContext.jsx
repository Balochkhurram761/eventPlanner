import React, { createContext, useContext, useState } from "react";

// 1️⃣ Context create
const SearchContext = createContext();

// 2️⃣ Provider Component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [preview, setPreview] = useState("uploads/profile.png");

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, preview, setPreview }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
