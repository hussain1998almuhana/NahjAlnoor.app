
const CACHE_NAME = 'nahj-al-noor-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  clients.claim();
});

self.addEventListener('fetch', (event) => {
  // استراتيجية Cache First للملفات الثابتة، و Network First للـ APIs
  if (event.request.url.includes('api.aladhan.com') || event.request.url.includes('api.alquran.cloud')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

const ADHAN_SOUNDS = {
  custom: 'https://www.mediafire.com/file/srdyuzxp7vt1pzq/%25D8%25A7%25D9%2584%25D8%25A7%25D8%25B0%25D8%25A7%25D9%2584%25D8%25A7%25D9%2586_%25D8%25A7%25D9%2584%25D8%25B1%25D8%25A7%25D9%2581%25D8%25B6%25D9%258A_%25D8%25A7%25D9%2584%25D9%2585%25D9%2582%25D8%25AF%25D8%25B3_%25D8%25B1%25D8%25A7%25D9%2581%25D8%25B6%25D9%258A.mp3',
  osama: 'https://ia801007.us.archive.org/1/items/AdanCollection/Osama_Al_Karbalai.mp3',
  abather: 'https://ia600205.us.archive.org/21/items/Abather-Adhan/Abather-Adhan.mp3',
  standard: 'https://ia801509.us.archive.org/32/items/ShiaAdhan/ShiaAdhan.mp3',
  beep: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
};

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});
