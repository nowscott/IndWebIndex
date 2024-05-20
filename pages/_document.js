import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="stylesheet" href="/css/style.css" />
          <link rel="stylesheet" href="/css/context-menu.css" />
          <link rel="stylesheet" id="darkcss" href="/css/daytime.css" />
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
