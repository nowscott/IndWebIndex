const CACHE_NAME = 'indwebindex-cache-v2';  // 更新缓存版本
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
    caches.match(event.request).then(response => {
      if (response) {
        // 检查缓存版本是否过期
        return caches.open(CACHE_NAME).then(cache => {
          return fetch(event.request).then(fetchResponse => {
            if (fetchResponse && fetchResponse.status === 200) {
              cache.put(event.request, fetchResponse.clone());
            }
            return fetchResponse;
          }).catch(() => {
            console.error('Fetch failed, returning cached response', event.request.url);
            return response;
          });  // 如果网络请求失败，使用缓存
        });
      } else {
        return fetch(event.request).then(fetchResponse => {
          if (fetchResponse && fetchResponse.status === 200) {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          } else {
            return fetchResponse;
          }
        }).catch(error => {
          console.error('Fetch failed for:', event.request.url, error);
          throw error;  // 处理错误并返回
        });
      }
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
