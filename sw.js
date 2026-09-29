// ============================================================
// NOUR AGRI AI
// SERVICE WORKER - PWA / OFFLINE SUPPORT
// ============================================================

const CACHE_NAME = "nour-agri-ai-v1";

// Main files needed by the app
const APP_FILES = [
  "./",
  "./Index.html",
  "./style.css",
  "./script.js",
  "./manifest.json"
];

// ------------------------------------------------------------
// INSTALL
// ------------------------------------------------------------

self.addEventListener("install", (event) => {
  console.log("[NOUR AGRI AI] Service Worker installing...");

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(APP_FILES);
      })
      .then(() => {
        console.log("[NOUR AGRI AI] App files cached successfully.");

        // Activate the new service worker immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error(
          "[NOUR AGRI AI] Cache installation failed:",
          error
        );
      })
  );
});

// ------------------------------------------------------------
// ACTIVATE
// ------------------------------------------------------------

self.addEventListener("activate", (event) => {
  console.log("[NOUR AGRI AI] Service Worker activated.");

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log(
                "[NOUR AGRI AI] Removing old cache:",
                cacheName
              );

              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // Take control of open pages immediately
        return self.clients.claim();
      })
  );
});

// ------------------------------------------------------------
// FETCH
// ------------------------------------------------------------

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached file if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise request it from the internet
        return fetch(request)
          .then((networkResponse) => {

            // Don't cache unsuccessful responses
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type === "opaque"
            ) {
              return networkResponse;
            }

            // Save a copy in the cache
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // If internet is unavailable, try Index.html
            return caches.match("./Index.html");
          });
      })
  );
});

// ------------------------------------------------------------
// MESSAGE
// ------------------------------------------------------------

self.addEventListener("message", (event) => {
  if (!event.data) {
    return;
  }

  // Allow the main app to force an update
  if (event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  // Clear all cached files
  if (event.data.type === "CLEAR_CACHE") {
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        console.log("[NOUR AGRI AI] Cache cleared.");
      });
  }
});

// ------------------------------------------------------------
// ERROR HANDLING
// ------------------------------------------------------------

self.addEventListener("error", (error) => {
  console.error(
    "[NOUR AGRI AI] Service Worker error:",
    error
  );
});

self.addEventListener("unhandledrejection", (event) => {
  console.error(
    "[NOUR AGRI AI] Unhandled Service Worker promise:",
    event.reason
  );
});