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
  ],
};

const FontMenu = () => {
  const { selectedFont, setSelectedFont } = useFont();
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const userFontClass = getCookie('userFont');
    if (userFontClass) {
      document.documentElement.classList.add(userFontClass);
      setSelectedFont(userFontClass);
    } else {
      const defaultFontClass = fontData.fonts[0].class;
      document.documentElement.classList.add(defaultFontClass);
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
    <div ref={contextMenuRef} className="hidden absolute z-50 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 border border-gray-300 shadow-lg rounded-md p-0 w-32">
      <ul className="list-none m-0 p-0">
        {fontData.fonts.map((font) => (
          <li
            key={font.class}
            className={`px-2 py-2 cursor-pointer white-space: nowrap ${selectedFont === font.class ? 'shadow-md bg-gray-100 dark:bg-slate-800' : ''}`}
            style={{ fontFamily: font.name }}
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