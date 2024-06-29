// pages/_app.js
import { Analytics } from '@vercel/analytics/react';
import '../public/css/style.css';
import '../public/css/context-menu.css';
import '../public/css/daytime.css';
import '../public/css/dark.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}

export default MyApp;