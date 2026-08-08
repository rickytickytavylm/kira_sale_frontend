/* Kira Sale PWA — лёгкий shell + сеть для HTML/JS */
const CACHE = "kira-sale-v14";
const SHELL = [
  "/manifest.webmanifest",
  "/styles.css?v=17",
  "/config.js?v=3",
  "/products.js?v=4",
  "/app.js?v=23",
  "/logo_nav.webp",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isHtml(req, url) {
  return req.mode === "navigate" || (url.pathname.endsWith(".html") || url.pathname.endsWith("/"));
}

function isCode(url) {
  return /\.(?:js|css|webmanifest)$/i.test(url.pathname) || url.search.includes("v=");
}

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.pathname.startsWith("/api") || url.hostname.startsWith("api.")) return;
  if (e.request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // HTML / JS / CSS — network-first (чтобы деплой подхватывался без hard refresh)
  if (isHtml(e.request, url) || isCode(url)) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Картинки и прочее — cache-first, без прекеша тяжёлых ассетов
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      });
    })
  );
});
