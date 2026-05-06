const CACHE_NAME = 'escape-v3';
const ASSETS = [
  '1.html',
  '2.html',
  '3.html',
  '4.html',
  'autor.html',
  'produtos.html',
  'index.html',
  'logo-512.png',
  'perfil.png',
  'manifest.json'
];

// Instalação do Service Worker e armazenamento em cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache atualizado: Arquivos e perfil.png armazenados.');
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação e limpeza de caches antigos para evitar erros
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Responde com o cache quando estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});