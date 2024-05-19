const assets = ['/', 'style.css', 'src/App.jsx'];

self.addEventListener('install', event => {
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
            const fetchResponse = await fetch(event.request);
            const cache = await caches.open('assets');
            cache.put(event.request, fetchResponse.clone());
            
            return cacheResponse || fetchResponse;
        })(),
    );
});