import React, { useState, useEffect } from 'react';
import packageInfo from '../package.json';
import { useStats } from '../contexts/StatsContext';
import { HiOutlineTag, HiOutlineCode, HiOutlineGlobeAlt, HiOutlineClock } from 'react-icons/hi';

// 数字滚动组件
const CountUp = ({ end, duration = 2000, isPending = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 如果是 pending 状态且没有 end 值，我们可以先滚到一个预估的小数值，或者保持 0
    // 这里我们选择让它在等待时缓慢滚到一个基础值，或者直接等待 end 出现
    if (typeof end !== 'number') return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // 使用 easeOutExpo 让动画更顺滑
      const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
      const currentCount = Math.floor(easeOutExpo(progress) * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  // 如果还在加载中，显示一个跳动的 0 或者骨架
  if (isPending && typeof end !== 'number') {
    return <span className='site-footer-count-pending animate-pulse'>0</span>;
  }

  return <span>{count.toLocaleString()}</span>;
};

const Footer = () => {
  const { stats } = useStats();

  return (
    <footer className='site-footer mt-auto font-inherit'>
      <div className='site-footer-inner'>
        <div className='site-footer-divider'></div>
        <div className='site-footer-content'>
          <div className="site-footer-stats">
            <span className="site-footer-stat">
              <HiOutlineGlobeAlt className="w-3.5 h-3.5" />
              <span>已收录</span>
              <strong><CountUp end={stats.count} duration={1000} isPending={stats.count === null} /></strong>
              <span>个网站</span>
            </span>
            <span className="site-footer-stat">
              <HiOutlineClock className="w-3.5 h-3.5" />
              <span>数据更新于</span>
              {stats.lastFetched ? <span>{new Date(stats.lastFetched).toLocaleString()}</span> : <span className='site-footer-loading'></span>}
            </span>
          </div>

          <div className='site-footer-links'>
            <a href='https://nowscott.notion.site/134f941cf9b880e1b00ee5bdf55fd71d?pvs=105' target='_blank' rel='noopener noreferrer'>
              <HiOutlineTag className='w-4 h-4' />
              <span>投稿网页</span>
            </a>
            <span>
              <HiOutlineCode className='w-4 h-4' />
              <span>版本 <strong>v{packageInfo.version}</strong></span>
            </span>
          </div>

          <div className='site-footer-copy'>
            <p>Copyright © 2021 - {new Date().getFullYear()} · NowScott</p>
            <p>Your personal compass in the noisy internet</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
