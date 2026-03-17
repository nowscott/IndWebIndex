// pages/_app.js
import '../styles/globals.css';
import { FontProvider } from '../contexts/FontContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { StatsProvider } from '../contexts/StatsContext';
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const root = document.documentElement;
        const random = (min, max) => Math.random() * (max - min) + min;
        const randomInt = (min, max) => Math.floor(random(min, max + 1));
        root.style.setProperty('--paper-fiber-angle', `${randomInt(12, 42)}deg`);
        root.style.setProperty('--paper-fiber-gap', `${randomInt(7, 14)}px`);
        root.style.setProperty('--paper-fiber-alpha', random(0.18, 0.34).toFixed(3));
        root.style.setProperty('--paper-grain-alpha', random(0.06, 0.14).toFixed(3));
        root.style.setProperty('--paper-warp-alpha', random(0.05, 0.12).toFixed(3));
        root.style.setProperty('--paper-glow-alpha', random(0.48, 0.74).toFixed(3));
        root.style.setProperty('--paper-glow-x', `${randomInt(4, 34)}%`);
        root.style.setProperty('--paper-glow-y', `${randomInt(2, 24)}%`);
        root.style.setProperty('--paper-patch-x', `${randomInt(46, 92)}%`);
        root.style.setProperty('--paper-patch-y', `${randomInt(36, 92)}%`);
        root.style.setProperty('--shadow-beam-angle', `${randomInt(104, 156)}deg`);
        root.style.setProperty('--shadow-beam-alpha', random(0.08, 0.2).toFixed(3));
        root.style.setProperty('--shadow-line-gap', `${randomInt(26, 56)}px`);
        root.style.setProperty('--shadow-line-alpha', random(0.14, 0.3).toFixed(3));
        root.style.setProperty('--shadow-glow-alpha', random(0.12, 0.28).toFixed(3));
        root.style.setProperty('--shadow-glow-x', `${randomInt(6, 36)}%`);
        root.style.setProperty('--shadow-glow-y', `${randomInt(2, 30)}%`);
        root.style.setProperty('--shadow-patch-x', `${randomInt(52, 94)}%`);
        root.style.setProperty('--shadow-patch-y', `${randomInt(34, 92)}%`);
    }, []);

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
