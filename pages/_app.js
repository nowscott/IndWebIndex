// pages/_app.js
import '../styles/globals.css';
import { FontProvider } from '../contexts/FontContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { StatsProvider } from '../contexts/StatsContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <StatsProvider>
                <FontProvider>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>IndWebIndex - 网页索引</title>
                    </Head>
                    <Component {...pageProps} />
                </FontProvider>
            </StatsProvider>
        </ThemeProvider>
    );
}

export default MyApp;