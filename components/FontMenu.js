import React, { useEffect, useRef } from 'react';
import { setCookie, getCookie } from '../utils/cookies';
import { useFont } from '../contexts/FontContext';

const fontData = {
  fonts: [
    { name: 'Smiley Sans Oblique', displayName: '得意黑', class: 'font-smiley' },
    { name: 'LXGW WenKai', displayName: '霞鹜文楷', class: 'font-wenkai' },
    { name: 'KingHwa_OldSong', displayName: '京華老宋体', class: 'font-oldsong' },
    { name: 'MuzaiPixel', displayName: '目哉像素体', class: 'font-pixel' },
    { name: 'LXGW Marker Gothic', displayName: '霞鹜漫黑', class: 'font-marker' },
    { name: '芫荽', displayName: '芫荽', class: 'font-iansui' },
    { name: '汇文明朝体', displayName: '汇文明朝体', class: 'font-mincho' },
  ],
};

const FontMenu = () => {
  const { selectedFont, setSelectedFont } = useFont();
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const userFontClass = getCookie('userFont');
    const isValidFont = fontData.fonts.some(font => font.class === userFontClass);//检查cookie合法性

    if (userFontClass && isValidFont) {
      if (!document.documentElement.classList.contains(userFontClass)) {
        document.documentElement.classList.add(userFontClass);
      }
      setSelectedFont(userFontClass);
    } else {
      const defaultFontClass = fontData.fonts[0].class;
      if (!document.documentElement.classList.contains(defaultFontClass)) {
        document.documentElement.classList.add(defaultFontClass);
      }
      setCookie('userFont', defaultFontClass, 365);
      setSelectedFont(defaultFontClass);
    }

    const handleContextMenu = (event) => {
      event.preventDefault();
      if (contextMenuRef.current) {
        const menuWidth = contextMenuRef.current.offsetWidth;
        const menuHeight = contextMenuRef.current.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const x = event.pageX + menuWidth > screenWidth ? event.pageX - menuWidth : event.pageX;
        const y = event.pageY + menuHeight > screenHeight ? event.pageY - menuHeight : event.pageY;

        contextMenuRef.current.style.display = 'block';
        contextMenuRef.current.style.left = `${x}px`;
        contextMenuRef.current.style.top = `${y}px`;
      }
    };

    const handleClick = (event) => {
      if (contextMenuRef.current && event.target.offsetParent !== contextMenuRef.current) {
        contextMenuRef.current.style.display = 'none';
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, [setSelectedFont]);

  const changeFont = (fontClass) => {
    document.documentElement.classList.remove(...fontData.fonts.map(f => f.class)); // 移除所有字体类
    document.documentElement.classList.add(fontClass); // 添加新的字体类
    setCookie('userFont', fontClass, 365); // 更新Cookie，持续365天
    setSelectedFont(fontClass); // 更新上下文状态
    if (contextMenuRef.current) {
      contextMenuRef.current.style.display = 'none'; // 隐藏菜单
    }
  };

  return (
    <div ref={contextMenuRef} className="hidden absolute z-50 w-36 rounded-xl p-1.5 backdrop-blur-xl text-[#773d31] dark:text-zinc-100 bg-[linear-gradient(165deg,rgba(255,255,255,0.92),rgba(241,248,255,0.9))] dark:bg-[linear-gradient(165deg,rgba(43,43,47,0.94),rgba(28,28,30,0.96))] border border-slate-300/90 dark:border-zinc-500/70 shadow-[0_8px_28px_rgba(71,85,105,0.18)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      <ul className="list-none m-0 p-0">
        {fontData.fonts.map((font) => (
          <li
            key={font.class}
            className={`px-3 py-2 rounded-lg cursor-pointer whitespace-nowrap preview-${font.class} transition-[background-color,color,border-color] duration-200 border ${selectedFont === font.class ? 'bg-orange-100/70 dark:bg-orange-500/20 text-[#773d31] dark:text-orange-300 border-orange-300/80 dark:border-orange-400/40' : 'border-transparent hover:bg-white/80 dark:hover:bg-zinc-700/60 hover:border-slate-300/80 dark:hover:border-zinc-500/70'}`}
            onClick={() => changeFont(font.class)}
          >
            {font.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FontMenu;
