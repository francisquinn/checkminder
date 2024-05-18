const assets = ['/', 'style.css', 'src/App.jsx'];

self.addEventListener('install', event => {
    console.log('registering service worker')
    event.waitUntil(
        (async () => {
            caches.open('assets').then(cache => {
                cache.addAll(assets);
            })
        })(),
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        (async () => {
            const cacheResponse = await caches.match(event.request);
            
            if (cacheResponse) {
                return cacheResponse;
            }

            const response = await fetch(event.request);
            const cache = await caches.open('assets');
            cache.put(event.request, response.clone());
            return response;
        })(),
    );
});