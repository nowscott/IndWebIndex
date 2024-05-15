if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // 新内容已下载，用户需要重新加载页面以获取更新
              if (confirm('新版本已更新，是否立即刷新页面？')) {
                window.location.reload();
              }
            } else {
              console.log('Content is now available offline!');
            }
          }
        };
      };
    }).catch(error => {
      console.log('Service Worker registration failed:', error);
    });
  });
}
