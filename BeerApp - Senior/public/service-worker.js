// public/service-worker.js
const CACHE_NAME = 'beer-app-cache';
self.addEventListener('install', (event) => {
        const urlsToCache = [
            '/',
            '/index.html',
            // Add other URLs you want to cache...
        ];
    
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(urlsToCache);
            })
        );
    });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Try to fetch the request from the network
        fetch(event.request).then((response) => {
            // If the fetch is successful, clone the response and cache it
            if (response.ok) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, clone);
                });
            }
            return response;
        }).catch(() => {
            // If the fetch fails (e.g., when offline), try to respond with the cached version
            return caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || new Response('', { status: 404, statusText: 'Not Found' });
            });
        })
    );
  });
  