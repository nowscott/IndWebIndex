// pages/_app.js
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import { FontProvider } from '../contexts/FontContext';
import { ThemeProvider } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <FontProvider>
                <>
                    <Component {...pageProps} />
                    <Analytics />
                </>
            </FontProvider>
        </ThemeProvider>
    );
}

export default MyApp;