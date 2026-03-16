import React, { createContext, useState, useContext, useEffect } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState('font-smiley'); // 默认字体，确保服务端渲染一致

  return (
    <FontContext.Provider value={{ selectedFont, setSelectedFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);