// Push handler for Macro Tracker. Loaded by sw.js via importScripts("/push-handler.js");
self.addEventListener("push", (event) => {
  let d = {};
  try { d = (event.data && event.data.json()) || {}; } catch (e) {}
  const data = d.data || d;
  const title = data.title || "Macro Tracker";
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: data.tag || title,
      vibrate: [100, 50, 100],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ("focus" in c) return c.focus(); }
      return self.clients.openWindow("/");
    })
  );
});
