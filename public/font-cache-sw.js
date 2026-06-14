const CACHE_PREFIX = 'indwebindex-fonts-';
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const FONT_ORIGIN = 'https://f.0211120.xyz';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )),
      self.clients.claim(),
    ])
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== FONT_ORIGIN || !url.pathname.startsWith('/font/')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;

      const networkResponse = await fetch(event.request);
      if (networkResponse.ok || networkResponse.type === 'opaque') {
        await cache.put(event.request, networkResponse.clone());
      }
      return networkResponse;
    })
  );
});
