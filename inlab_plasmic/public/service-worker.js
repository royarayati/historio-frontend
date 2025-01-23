// // Install event - activates the service worker and skips waiting state
// self.addEventListener('install', (event) => {
//     self.skipWaiting();
//   });
  
//   // Activate event - takes control immediately after activation
//   self.addEventListener('activate', (event) => {
//     event.waitUntil(self.clients.claim());
//   });
  
//   // Fetch event - manages requests (for dynamic data, no caching)
//   self.addEventListener('fetch', (event) => {
//     // Allow requests to continue without caching
//     event.respondWith(fetch(event.request));
//   });

// Import Workbox from CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// Ensure Workbox is loaded
if (workbox) {
    console.log('Workbox is loaded');

    // Claim clients immediately after activation
    workbox.core.clientsClaim();

    // Precache assets (populated during the build process)
    self.__precacheManifest = [].concat(self.__precacheManifest || []);
    workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

    // Caching strategies
    // Cache HTML pages with StaleWhileRevalidate strategy
    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'document',
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'pages',
        })
    );

    // Cache images with CacheFirst strategy
    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'image',
        new workbox.strategies.CacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 50, // Limit cache to 50 images
                    maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
                }),
            ],
        })
    );
} else {
    console.error('Workbox failed to load');
}

// Service Worker Lifecycle Events

// Install event - Activate immediately after installation
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installed');
    self.skipWaiting();
});

// Activate event - Take control of all clients immediately
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activated');
    event.waitUntil(self.clients.claim());
});

// Fetch event - Default behavior for uncached requests
self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] Fetching:', event.request.url);
    event.respondWith(fetch(event.request));
});

// Firebase Messaging Integration

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

// Initialize Firebase app with your configuration
firebase.initializeApp({
    apiKey: 'AIzaSyAfnOBK6JHsp9SSdyhx4h84cFq3VZBkks0',
    authDomain: 'inlab-project.firebaseapp.com',
    databaseURL: 'https://inlab-project.firebaseio.com',
    projectId: 'inlab-project',
    storageBucket: 'inlab-project.appspot.com',
    messagingSenderId: '2389489938',
    appId: '1:2389489938:web:63f05949bcde8f60',
    measurementId: 'G-MREJC9FHT8'
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages from Firebase
messaging.onBackgroundMessage((payload) => {
    console.log('[Service Worker] Received background message:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/inlab/assets/images/icons/icon-96x96.png',
        tag: 'inlab-background-notification',
        data: payload.data,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked:', event);

    const data = event.notification.data;
    
    // Construct the URL with "new_inlab"
    let url = '/new_inlab'; // Default URL

    if (data && data.url) {
        url = `/new_inlab${data.url}`; // Use the URL from the notification data if available, prefixed with /new_inlab
    }

    event.notification.close(); // Close the notification

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === url && 'focus' in client) {
                    return client.focus().then(() => client.navigate(url));
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

// Skip waiting message handler
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
        console.log('[Service Worker] SKIP_WAITING triggered');
    }
});
