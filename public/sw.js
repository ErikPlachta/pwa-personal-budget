
const APP_PREFIX = 'pwa-personal-budget-';     
const VERSION = 'version_0.1.0';
const SITE_CACHE = APP_PREFIX + VERSION;
const DATA_CACHE = APP_PREFIX + "DATA_" + VERSION
const FILES_TO_CACHE = [
    "/",
    "./index.html",
    "./assets/css/style.css",
    "./assets/js/chart.js",
    "./assets/js/idb.js",
];  


/* -- Install the Service Worker and manage FILES_TO_CACHE
        -- If anything changed within the above cached files or they're not yet
            cached, install them.
*/
self.addEventListener('install', function (e) {
    // tell the browser to wait until the work is complete before terminating the service worker. 
        // This ensures that the service worker doesn't move on from the installing phase until
        // it's finished executing all of its code.
    e.waitUntil( 
        caches.open(SITE_CACHE).then(function (cache) {
          console.log(`//-- sw.js -> ${SITE_CACHE} installed`)
          return cache.addAll(FILES_TO_CACHE)
        })
    )

})

self.addEventListener('activate', function(evt){
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map( key => {
                    if (key !== SITE_CACHE && key !== DATA_CACHE) {
                        console.log(`Removing old cache data ${key}`);
                        return caches.delete(key);
                    }
                })
            )
        })
    )
    // ??
    self.clients.claim();
});


self.addEventListener('fetch', function(evt) {
    if (evt.request.url.includes('/api/')) {
        evt.respondWith(
          caches
            .open(DATA_CACHE)
            .then(cache => {
              return fetch(evt.request)
                .then(response => {
                  // If the response was good, clone it and store it in the cache.
                  if (response.status === 200) {
                    cache.put(evt.request.url, response.clone());
                  }
      
                  return response;
                })
                .catch(err => {
                  // Network request failed, try to get it from the cache.
                  return cache.match(evt.request);
                });
            })
            .catch(err => console.log(err))
        );
      
        return;
      }

    else{
      evt.respondWith(
        fetch(evt.request).catch(function() {
            return caches.match(evt.request).then(function(response) {
                if (response) {
                    return response;
                } else if (evt.request.headers.get('accept').includes('text/html')) {
                    // return the cached home page for all requests for html pages
                    return caches.match('/');
                }
                });
            })
        );
    }
});
