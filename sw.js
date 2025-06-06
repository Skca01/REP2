/**
 * Kent Carlo B. Amante Portfolio - Service Worker
 * 
 * @author: Kent Carlo B. Amante
 * @email: carloamante125@gmail.com
 * @github: https://github.com/Skca01
 * @description: Service Worker for offline functionality and caching
 * @copyright: © 2025 Kent Carlo B. Amante. All rights reserved.
 */

// Service Worker
const CACHE_NAME = 'kca-portfolio-v1';
const urlsToCache = [
  '.',
  'index.html',
  'styles.css',
  'script.js',
  'manifest.json',
  'kent.jpg',
  'thanks.html'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch Event Strategy (Cache First, then Network)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
}); 