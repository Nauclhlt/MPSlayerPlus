const CACHE_NAME = "script-viewer-v1";
const ASSETS = [
  "index.html",
  "styles.css",
  "app.js",
  "script.txt",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "audio/explode.mp3"
  // 必要に応じて audio/ 内のファイルも追加
];

// インストール時にキャッシュ
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// 古いキャッシュを削除
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// オフライン対応
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      fetch(e.request).then(res => {
        cache.put(e.request, res.clone());
        return res;
      }).catch(() => caches.match(e.request))
    )
  );
});
