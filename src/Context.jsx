import React, { useContext } from "react";
import { createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  return <AppContext.Provider value="hello"> {children}</AppContext.Provider>;
};
export { AppContext, AppProvider };
