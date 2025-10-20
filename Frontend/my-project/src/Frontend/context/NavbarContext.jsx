import React, { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [navbar, setnavbar] = useState(false);
  const handlenavbar = () => {
    setnavbar(!navbar);
  };
  const handleclose = () => {
    setnavbar(false);
  };

  return (
    <NavbarContext.Provider
      value={{ navbar, setnavbar, handlenavbar, handleclose }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  return useContext(NavbarContext);
};
