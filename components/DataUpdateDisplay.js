// components/DataUpdateDisplay.js
import React from 'react';

const DataUpdateDisplay = ({ lastFetched }) => {
  const formattedDate = new Date(lastFetched).toLocaleString();

  return (
    <div className="text-center text-sm text-gray-600 dark:text-gray-300 py-2">
      数据更新时间：{formattedDate}
    </div>
  );
};

export default DataUpdateDisplay;