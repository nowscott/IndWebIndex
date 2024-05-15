const CACHE_NAME = 'indwebindex-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/dark.css',
  '/css/context-menu.css',
  '/css/style.css',
  '/css/daytime.css',
  '/js/data-loader.js',
  '/js/theme.js',
  '/js/context-menu.js',
  '/js/main.js',
  '/image/favicon.ico',
  '/assets/svg/search.svg',
  '/assets/svg/sun.svg',
  '/assets/svg/moon.svg',
  '/assets/data.json',
  'https://cdn.jsdelivr.net/npm/cn-fontsource-smiley-sans-oblique-regular@1.0.1/font.min.css',
  'https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css',
  'https://jhlst.nowscott.top/result.css',
  'https://zqfs.nowscott.top/result.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // 检查请求的来源是否为 chrome-extension 或者其他不支持的协议
  if (event.request.url.startsWith('chrome-extension://') || 
      !event.request.url.startsWith('http') ||
      event.request.method !== 'GET') {
    return; // 直接返回，不处理此请求
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(fetchRequest, responseToCache);
            });

          return response;
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
