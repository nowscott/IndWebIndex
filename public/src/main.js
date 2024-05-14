if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('Service Worker registered with scope: ', registration.scope);
        }, err => {
            console.log('Service Worker registration failed: ', err);
        });
    });
}
