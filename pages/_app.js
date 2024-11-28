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
                    <title>IndWebIndex - 首页</title>
                    <meta name="description" content="探索IndWebIndex——您的个性化中文网站索引！提供快速访问和管理常用网站的简单方法。" />
                </Head>
                <Component {...pageProps} />
            </FontProvider>
        </ThemeProvider>
    );
}

export default MyApp;