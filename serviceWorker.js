self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("tv-app-cache").then(function (cache) {
      return cache.addAll([
        ".",
        "index.html",
        "ps.js",
        "ui.js",
        "info.js",
        "tv.js",
        "https://cdn.jsdelivr.net/npm/disable-devtool@latest"
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
