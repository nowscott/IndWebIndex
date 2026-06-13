import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useFont } from '../contexts/FontContext';
import { FONT_OPTIONS } from '../lib/fonts';

const VIEWPORT_PADDING = 8;

const FontMenu = () => {
  const {
    selectedFont,
    loadingFont,
    menuState,
    openFontMenu,
    closeFontMenu,
    selectFont,
    prepareFont,
  } = useFont();
  const menuRef = useRef(null);
  const selectedButtonRef = useRef(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const handleContextMenu = event => {
      const interactiveTarget = event.target instanceof Element && event.target.closest(
        'a, button, input, textarea, select, [contenteditable="true"], [role="menu"]'
      );

      if (interactiveTarget) return;

      event.preventDefault();
      openFontMenu({
        x: event.clientX,
        y: event.clientY,
      });
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [openFontMenu]);

  useLayoutEffect(() => {
    if (!menuState.isOpen || !menuRef.current) return;

    const menuRect = menuRef.current.getBoundingClientRect();
    const requestedLeft = menuState.alignX === 'end'
      ? menuState.x - menuRect.width
      : menuState.x;
    const maxLeft = Math.max(VIEWPORT_PADDING, window.innerWidth - menuRect.width - VIEWPORT_PADDING);
    const maxTop = Math.max(VIEWPORT_PADDING, window.innerHeight - menuRect.height - VIEWPORT_PADDING);

    setPosition({
      left: Math.min(Math.max(VIEWPORT_PADDING, requestedLeft), maxLeft),
      top: Math.min(Math.max(VIEWPORT_PADDING, menuState.y), maxTop),
    });
    selectedButtonRef.current?.focus({ preventScroll: true });
  }, [menuState]);

  useEffect(() => {
    if (!menuState.isOpen) return;

    const handlePointerDown = event => {
      if (!menuRef.current?.contains(event.target)) {
        closeFontMenu();
      }
    };
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeFontMenu();
        return;
      }

      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        return;
      }

      const menuItems = Array.from(
        menuRef.current?.querySelectorAll('[role="menuitemradio"]:not(:disabled)') || []
      );
      if (menuItems.length === 0) return;

      event.preventDefault();
      const currentIndex = menuItems.indexOf(document.activeElement);
      let nextIndex;

      if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = menuItems.length - 1;
      } else if (event.key === 'ArrowDown') {
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % menuItems.length;
      } else {
        nextIndex = currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
      }

      const nextItem = menuItems[nextIndex];
      nextItem.focus();
      prepareFont(nextItem.dataset.fontClass);
    };
    const handleViewportChange = () => closeFontMenu();

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [menuState.isOpen, closeFontMenu, prepareFont]);

  if (!menuState.isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="选择网页字体"
      className="fixed z-50 w-36 rounded-xl p-1.5 backdrop-blur-xl text-[#773d31] dark:text-zinc-100 bg-[linear-gradient(165deg,rgba(255,255,255,0.96),rgba(241,248,255,0.94))] dark:bg-[linear-gradient(165deg,rgba(43,43,47,0.96),rgba(28,28,30,0.98))] border border-slate-300/90 dark:border-zinc-500/70 shadow-[0_8px_28px_rgba(71,85,105,0.18)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
      style={position}
    >
      <div className="px-2 pb-1.5 text-[10px] font-bold text-slate-500 dark:text-zinc-400">
        选择字体
      </div>
      {menuState.isReady ? (
        <div className="space-y-0.5">
          {FONT_OPTIONS.map(font => {
            const isSelected = selectedFont === font.className;
            const isLoading = loadingFont === font.className;

            return (
              <button
                key={font.className}
                ref={isSelected ? selectedButtonRef : null}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                data-font-class={font.className}
                disabled={loadingFont !== null}
                className={`w-full px-3 py-2 rounded-lg text-left whitespace-nowrap preview-${font.className} transition-[background-color,color,border-color] duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 disabled:cursor-wait ${isSelected
                  ? 'bg-orange-100/70 dark:bg-orange-500/20 text-[#773d31] dark:text-orange-300 border-orange-300/80 dark:border-orange-400/40'
                  : 'border-transparent hover:bg-white/80 dark:hover:bg-zinc-700/60 hover:border-slate-300/80 dark:hover:border-zinc-500/70'
                }`}
                onFocus={() => prepareFont(font.className)}
                onPointerEnter={() => prepareFont(font.className)}
                onClick={() => selectFont(font.className)}
              >
                <span className="flex items-center justify-between gap-2">
                  <span>{font.displayName}</span>
                  <span aria-hidden="true" className="w-3 text-center text-[10px] font-sans">
                    {isLoading ? '…' : isSelected ? '✓' : ''}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div
          role="status"
          className="px-3 py-4 text-center text-xs text-slate-500 dark:text-zinc-400 animate-pulse"
        >
          字体加载中…
        </div>
      )}
    </div>
  );
};

export default FontMenu;
