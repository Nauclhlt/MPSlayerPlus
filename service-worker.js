const CACHE_NAME = "script-viewer-v111";
const ASSETS = [
  "index.html",
  "styles.css",
  "app.js",
  "script.txt",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "audio/explode.mp3",
  "audio/taihou.mp3",
  "audio/wind.mp3",
  "audio/minsyu.mp3",
  "audio/redandblack.mp3",
  "audio/whoami.m4a",
  "audio/yume.mp3",
  "audio/ichinichi.mp3",
  "audio/syujin.mp3",
  "audio/onmyown.mp3",
  "audio/handgun.mp3",
  "audio/shotgun.mp3",
  "audio/puryume.wav"
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
