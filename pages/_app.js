// pages/_app.js
import '../styles/globals.css';
import { FontProvider } from '../contexts/FontContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <FontProvider>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>IndWebIndex - 网页索引</title>
                    <meta name="description" content="探索IndWebIndex——您的个性化中文网站索引！我们提供一个简单且高效的方法，让您可以快速访问和管理您常用的网站。无论是学习资源、购物平台还是娱乐网站，您都可以一目了然。" />
                </Head>
                <Component {...pageProps} />
            </FontProvider>
        </ThemeProvider>
    );
}

export default MyApp;