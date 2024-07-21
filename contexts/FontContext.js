import React, { createContext, useState, useContext } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState('font-serif');

  return (
    <FontContext.Provider value={{ selectedFont, setSelectedFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);