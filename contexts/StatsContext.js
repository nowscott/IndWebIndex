import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    count: null,
    lastFetched: null,
  });

  const updateStats = useCallback(newStats => {
    setStats(prev => ({
      ...prev,
      ...newStats
    }));
  }, []);
  const value = useMemo(() => ({ stats, updateStats }), [stats, updateStats]);

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};
