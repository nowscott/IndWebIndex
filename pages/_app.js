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
        
        // Dark mode background position randomization
        // Beam angle: 100-160 deg
        root.style.setProperty('--shadow-beam-angle', `${randomInt(100, 160)}deg`);
        root.style.setProperty('--shadow-beam-alpha', random(0.08, 0.2).toFixed(3));
        
        // Line gap: 20-60px
        root.style.setProperty('--shadow-line-gap', `${randomInt(20, 60)}px`);
        root.style.setProperty('--shadow-line-alpha', random(0.14, 0.3).toFixed(3));
        
        // Glow alpha: 0.1-0.3
        root.style.setProperty('--shadow-glow-alpha', random(0.1, 0.3).toFixed(3));
        
        // Main Glow Position (Full Screen Random): X: 0-100%, Y: 0-100%
        root.style.setProperty('--shadow-glow-x', `${randomInt(0, 100)}%`);
        root.style.setProperty('--shadow-glow-y', `${randomInt(0, 100)}%`);
        
        // Patch Position (Full Screen Random): X: 0-100%, Y: 0-100%
        root.style.setProperty('--shadow-patch-x', `${randomInt(0, 100)}%`);
        root.style.setProperty('--shadow-patch-y', `${randomInt(0, 100)}%`);
        
        // Conic Gradient Focal Point (Randomized along top edge): X: 10-90%, Y: -10-40%
        root.style.setProperty('--shadow-conic-x', `${randomInt(10, 90)}%`);
        root.style.setProperty('--shadow-conic-y', `${randomInt(-10, 40)}%`);
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
