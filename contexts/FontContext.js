import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getCookie, setCookie } from '../utils/cookies';
import {
  DEFAULT_FONT_CLASS,
  FONT_CLASS_NAMES,
  FONT_OPTIONS,
  getFontOption,
  getValidFontClass,
} from '../lib/fonts';

const FontContext = createContext();
const stylesheetPromises = new Map();

const getStylesheetId = fontClass => `font-stylesheet-${fontClass}`;

const ensureFontStylesheet = font => {
  if (typeof document === 'undefined') return Promise.resolve();

  const existingLink = document.getElementById(getStylesheetId(font.className));
  if (existingLink?.sheet) return Promise.resolve();

  if (stylesheetPromises.has(font.className)) {
    return stylesheetPromises.get(font.className);
  }

  const promise = new Promise((resolve, reject) => {
    const link = existingLink || document.createElement('link');

    const handleLoad = () => {
      cleanup();
      link.dataset.loaded = 'true';
      resolve();
    };
    const handleError = () => {
      cleanup();
      link.remove();
      reject(new Error(`Failed to load font stylesheet: ${font.className}`));
    };
    const timeoutId = window.setTimeout(handleError, 8000);
    const cleanup = () => {
      window.clearTimeout(timeoutId);
      link.removeEventListener('load', handleLoad);
      link.removeEventListener('error', handleError);
    };

    link.addEventListener('load', handleLoad);
    link.addEventListener('error', handleError);

    if (!existingLink) {
      link.id = getStylesheetId(font.className);
      link.rel = 'stylesheet';
      link.href = font.stylesheet;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }).finally(() => {
    stylesheetPromises.delete(font.className);
  });

  stylesheetPromises.set(font.className, promise);
  return promise;
};

const applyFontClass = fontClass => {
  document.documentElement.classList.remove(...FONT_CLASS_NAMES);
  document.documentElement.classList.add(fontClass);
};

export const FontProvider = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState(DEFAULT_FONT_CLASS);
  const [loadingFont, setLoadingFont] = useState(null);
  const [menuState, setMenuState] = useState({
    isOpen: false,
    isReady: false,
    x: 0,
    y: 0,
    alignX: 'start',
    requestId: null,
  });

  useEffect(() => {
    const fontClass = getValidFontClass(getCookie('userFont'));
    const font = getFontOption(fontClass);

    applyFontClass(fontClass);
    setSelectedFont(fontClass);
    setCookie('userFont', fontClass, 365);
    ensureFontStylesheet(font).catch(() => {});
  }, []);

  const openFontMenu = useCallback(({ x, y, alignX = 'start' }) => {
    const requestId = `${Date.now()}-${Math.random()}`;
    setMenuState({ isOpen: true, isReady: false, x, y, alignX, requestId });

    Promise.allSettled(
      FONT_OPTIONS.map(async font => {
        await ensureFontStylesheet(font);
        if (document.fonts?.load) {
          await document.fonts.load(`16px "${font.family}"`, `${font.displayName}Aa123`);
        }
      })
    ).finally(() => {
      setMenuState(current => (
        current.requestId === requestId
          ? { ...current, isReady: true }
          : current
      ));
    });
  }, []);

  const closeFontMenu = useCallback(() => {
    setMenuState(current => ({ ...current, isOpen: false }));
  }, []);

  const selectFont = useCallback(async fontClass => {
    const font = getFontOption(fontClass);
    if (!font) return;

    setLoadingFont(fontClass);
    try {
      await ensureFontStylesheet(font);
      if (document.fonts?.load) {
        await document.fonts.load(`16px "${font.family}"`, `${font.displayName}Aa123`);
      }
    } catch {
      // The CSS fallback remains usable when the remote font service is unavailable.
    } finally {
      applyFontClass(fontClass);
      setCookie('userFont', fontClass, 365);
      setSelectedFont(fontClass);
      setLoadingFont(null);
      closeFontMenu();
    }
  }, [closeFontMenu]);

  const prepareFont = useCallback(fontClass => {
    const font = getFontOption(fontClass);
    if (font) {
      ensureFontStylesheet(font).catch(() => {});
    }
  }, []);

  return (
    <FontContext.Provider
      value={{
        selectedFont,
        loadingFont,
        menuState,
        openFontMenu,
        closeFontMenu,
        selectFont,
        prepareFont,
      }}
    >
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
