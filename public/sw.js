const APP_PREFIX = 'pwa-personal-budget-';     
const VERSION = 'version_0.1';
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "./index.html",
    "./assets/css/style.css",
    "./assets/js/chart.css",
    "./assets/js/idb.css",
];  

//-- Install the Service Worker and manage FILES_TO_CACHE
    //-- If anything changed within the above cached files or they're not yet
    //--    cached, install them.
self.addEventListener('install', function (e) {
    // tell the browser to wait until the work is complete before terminating the service worker. 
        // This ensures that the service worker doesn't move on from the installing phase until
        // it's finished executing all of its code.
    e.waitUntil( 
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
    )
})

//-- Start the Service Worker
self.addEventListener('activate', function (e) {
    e.waitUntil(
        //-- returns an array of all cache names
        caches.keys().then(function (keyList) {
            //-- filter out just names with the value of const APP_PREFIX ( above )
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })
            
            cacheKeeplist.push(CACHE_NAME);
            
            //- returns a Promise that resolves once all old versions of the cache have been deleted.
            return Promise.all(
                keyList.map(function (key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        console.log('deleting cache : ' + keyList[i] );
                        return caches.delete(keyList[i]);
                    }
                })
            );
        })
    );
});


//-- Listen for Fetch Events
    //-- Listen for the fetch event, log the URL of the requested resource,
    //--    and then begin to define how we will respond to the request.
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
        if (request) { // if cache is available, respond with cache
            console.log('responding with cache : ' + e.request.url)
            return request
        } else {       // if there are no cache, try fetching request
            console.log('file is not cached, fetching : ' + e.request.url)
            return fetch(e.request)
        }
    
        //TODO:: omit if/else for console.log & put one line below like this too.
        // return request || fetch(e.request)
        })
    )
})
