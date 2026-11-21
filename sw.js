// 인터넷이 되면 항상 최신 버전, 안 되면 마지막으로 본 버전
const CACHE = "osaka-guide";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    fetch(req, { cache: "no-store" }).then(r => {
      if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return r;
    }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
  );
});
