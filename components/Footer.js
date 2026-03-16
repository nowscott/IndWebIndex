import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const response = await fetch('/api/visit-count');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        const data = await response.json();
        setVisitCount(data.count);
      } catch (error) {
        console.error('获取访问量失败：', error);
        setVisitCount(0);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <div className='text-xs whitespace-nowrap text-purple-900 dark:text-rose-200 py-4'>
      <a 
        href='https://nowscott.notion.site/134f941cf9b880e1b00ee5bdf55fd71d?pvs=105' 
        target='_blank' 
        rel='noopener noreferrer' 
        className='block mb-2 underline'
      >
        投稿网页
      </a>
      <p className='mb-1'>
        {visitCount !== null ? `访问量：${visitCount}` : '访问量：加载中...'}
      </p>
      <p>Copyright © 2021 - NowScott</p>
    </div>
  );
};

export default Footer;