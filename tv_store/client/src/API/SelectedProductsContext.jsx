import React, { createContext, useContext, useState, useEffect } from "react";

const SelectedProductsContext = createContext();

export const SelectedProductsProvider = ({ children }) => {
  const [selectedProducts1, setSelectedProducts1] = useState(() => {
    const saved = localStorage.getItem("selectedProducts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts1));
  }, [selectedProducts1]);

  return (
    <SelectedProductsContext.Provider value={{ selectedProducts1, setSelectedProducts1 }}>
      {children}
    </SelectedProductsContext.Provider>
  );
};

export const useSelectedProducts = () => useContext(SelectedProductsContext);
