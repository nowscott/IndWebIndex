// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { DEFAULT_FONT_CLASS, FONT_OPTIONS } from '../lib/fonts';

class MyDocument extends Document {
  render() {
    const fontOptions = JSON.stringify(FONT_OPTIONS);

    return (
      <Html lang="zh-CN">
        <Head>
          <link id="favicon" rel="icon" type="image/svg+xml" href="/images/favicon-light.svg" />
          <meta charSet="UTF-8" />
          <meta id="theme-color" name="theme-color" content="#faf6ef" /> {/* warm-neutral */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="探索IndWebIndex——您的个性化中文网站索引！我们提供一个简单且高效的方法，让您可以快速访问和管理您常用的网站。无论是学习资源、购物平台还是娱乐网站，您都可以一目了然。" />
          <link rel="preconnect" href="https://f.0211120.xyz" crossOrigin="anonymous" />
          
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  // Handle Theme
                  var storedTheme = window.localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var systemTheme = systemDark ? 'dark' : 'light';
                  if (storedTheme === systemTheme) {
                    window.localStorage.removeItem('theme');
                    storedTheme = null;
                  }
                  var isDark = storedTheme === 'dark' ||
                    (storedTheme !== 'light' && systemDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    var favicon = document.getElementById('favicon');
                    if (favicon) favicon.href = '/images/favicon-dark.svg';
                    var themeColor = document.getElementById('theme-color');
                    if (themeColor) themeColor.content = '#000000';
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // Handle Font
                  var fontOptions = ${fontOptions};
                  var userFontCookie = document.cookie
                    .split(';')
                    .map(function (cookie) { return cookie.trim(); })
                    .find(function (cookie) { return cookie.split('=')[0] === 'userFont'; });
                  var requestedFont = '${DEFAULT_FONT_CLASS}';
                  if (userFontCookie) {
                    try {
                      requestedFont = decodeURIComponent(
                        userFontCookie.slice(userFontCookie.indexOf('=') + 1)
                      );
                    } catch (e) {}
                  }
                  var selectedFont = fontOptions.find(function (font) {
                    return font.className === requestedFont;
                  }) || fontOptions.find(function (font) {
                    return font.className === '${DEFAULT_FONT_CLASS}';
                  });

                  document.documentElement.classList.add(selectedFont.className);

                  var fontStylesheet = document.createElement('link');
                  fontStylesheet.id = 'font-stylesheet-' + selectedFont.className;
                  fontStylesheet.rel = 'stylesheet';
                  fontStylesheet.href = selectedFont.stylesheet;
                  fontStylesheet.crossOrigin = 'anonymous';
                  fontStylesheet.onerror = function () { this.remove(); };
                  document.head.appendChild(fontStylesheet);

                  // Initialize decorative variables before first paint.
                  var root = document.documentElement;
                  var random = function (min, max) { return Math.random() * (max - min) + min; };
                  var randomInt = function (min, max) { return Math.floor(random(min, max + 1)); };
                  root.style.setProperty('--paper-fiber-angle', randomInt(12, 42) + 'deg');
                  root.style.setProperty('--paper-fiber-gap', randomInt(7, 14) + 'px');
                  root.style.setProperty('--paper-fiber-alpha', random(0.18, 0.34).toFixed(3));
                  root.style.setProperty('--paper-grain-alpha', random(0.06, 0.14).toFixed(3));
                  root.style.setProperty('--paper-warp-alpha', random(0.05, 0.12).toFixed(3));
                  root.style.setProperty('--paper-glow-alpha', random(0.48, 0.74).toFixed(3));
                  root.style.setProperty('--paper-glow-x', randomInt(4, 34) + '%');
                  root.style.setProperty('--paper-glow-y', randomInt(2, 24) + '%');
                  root.style.setProperty('--paper-patch-x', randomInt(46, 92) + '%');
                  root.style.setProperty('--paper-patch-y', randomInt(36, 92) + '%');
                  root.style.setProperty('--paper-gradient-angle', randomInt(0, 360) + 'deg');
                  root.style.setProperty('--paper-gradient-alpha-1', random(0.92, 0.98).toFixed(3));
                  root.style.setProperty('--paper-gradient-alpha-2', random(0.94, 0.99).toFixed(3));
                  root.style.setProperty('--paper-gradient-alpha-3', random(0.90, 0.96).toFixed(3));
                  root.style.setProperty('--shadow-beam-angle', randomInt(100, 160) + 'deg');
                  root.style.setProperty('--shadow-beam-alpha', random(0.08, 0.2).toFixed(3));
                  root.style.setProperty('--shadow-line-gap', randomInt(20, 60) + 'px');
                  root.style.setProperty('--shadow-line-alpha', random(0.14, 0.3).toFixed(3));
                  root.style.setProperty('--shadow-glow-alpha', random(0.1, 0.3).toFixed(3));
                  root.style.setProperty('--shadow-glow-x', randomInt(0, 100) + '%');
                  root.style.setProperty('--shadow-glow-y', randomInt(0, 100) + '%');
                  root.style.setProperty('--shadow-patch-x', randomInt(0, 100) + '%');
                  root.style.setProperty('--shadow-patch-y', randomInt(0, 100) + '%');
                  root.style.setProperty('--shadow-conic-x', randomInt(10, 90) + '%');
                  root.style.setProperty('--shadow-conic-y', randomInt(-10, 40) + '%');

                  var rainbowColors = [
                    'rgb(239 68 68 / 0.16)',
                    'rgb(249 115 22 / 0.16)',
                    'rgb(234 179 8 / 0.16)',
                    'rgb(34 197 94 / 0.16)',
                    'rgb(59 130 246 / 0.16)',
                    'rgb(99 102 241 / 0.16)',
                    'rgb(168 85 247 / 0.16)',
                  ];
                  var shuffled = rainbowColors.sort(function () { return 0.5 - Math.random(); });
                  root.style.setProperty('--shadow-rainbow-1', shuffled[0]);
                  root.style.setProperty('--shadow-rainbow-2', shuffled[1]);
                  root.style.setProperty('--shadow-rainbow-3', shuffled[2]);
                } catch (e) {}
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
