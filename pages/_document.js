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
                  var isDark = storedTheme === 'dark' ||
                    (storedTheme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
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
