import React, { createContext, useContext, useState, useEffect } from 'react';

const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    count: null,
    lastFetched: null,
    visitCount: null,
    posts: null // 新增：全局缓存网站列表
  });

  const updateStats = (newStats) => {
    setStats(prev => ({
      ...prev,
      ...newStats
    }));
  };

  // 全局自动预加载访问量
  useEffect(() => {
    // 仅在 visitCount 为空时初始化一次请求
    if (stats.visitCount !== null) return;

    const fetchVisitCount = async () => {
      try {
        // 每次刷新页面（即 StatsProvider 挂载时）都发送 POST 请求以增加访问量
        const response = await fetch('/api/visit-count', { method: 'POST' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        if (data && typeof data.count !== 'undefined') {
          updateStats({ visitCount: data.count });
        }
      } catch (error) {
        console.error('[StatsContext] Preloading visit count failed:', error);
        // 如果 POST 失败，尝试 GET 获取当前数值
        try {
          const getRes = await fetch('/api/visit-count', { method: 'GET' });
          const getData = await getRes.json();
          updateStats({ visitCount: getData.count });
        } catch (e) {
          updateStats({ visitCount: 0 });
        }
      }
    };

    fetchVisitCount();
  }, [stats.visitCount]);

  return (
    <StatsContext.Provider value={{ stats, updateStats }}>
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
