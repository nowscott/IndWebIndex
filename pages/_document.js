// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="探索IndWebIndex——您的个性化中文网站索引！我们提供一个简单且高效的方法，让您可以快速访问和管理您常用的网站。无论是学习资源、购物平台还是娱乐网站，您都可以一目了然。" />
          
          {/* External Fonts */}
          <link rel="stylesheet" href="https://f.0211120.xyz/font/得意黑/result.css" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://f.0211120.xyz/font/京華老宋体/result.css" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://f.0211120.xyz/font/霞鹜文楷/result.css" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://f.0211120.xyz/font/霞鹜漫黑/result.css" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://f.0211120.xyz/font/芫荽/result.css" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://f.0211120.xyz/font/汇文明朝体/result.css" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://f.0211120.xyz/font/目哉像素/result.css" crossorigin="anonymous"/>
          
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  // Handle Theme
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                  
                  // Handle Font
                  var userFont = document.cookie.split('; ').find(row => row.startsWith('userFont='));
                  if (userFont) {
                    var fontClass = userFont.split('=')[1];
                    document.documentElement.classList.add(fontClass);
                  } else {
                    document.documentElement.classList.add('font-smiley');
                  }
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