//pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <title>网站索引</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="探索IndWebIndex——您的个性化中文网站索引！我们提供一个简单且高效的方法，让您可以快速访问和管理您常用的网站。无论是学习资源、购物平台还是娱乐网站，您都可以一目了然。" />
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