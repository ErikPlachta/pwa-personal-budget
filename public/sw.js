const SITE_CACHE_PREFACE = "pb-site-cache"
const DATA_CACHE_PREFACE = "pb-data-cache"
const VERSION = "-v_0.1.0"
const SITE_CACHE_NAME = SITE_CACHE_PREFACE + VERSION
const DATA_CACHE_NAME = DATA_CACHE_PREFACE + VERSION

//-- Files used within website
const FILES_TO_CACHE = [
    '/index.html',
    '/manifest.json',
    '/css/styles.css',
    '/js/idb.js',
    '/js/index.js',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
];
//-- Used for user input in offline events
const DATA_TO_CACHE = []; 


self.addEventListener('install', async function(e){
    //-- Cache Site Content
    await e.waitUntil(
        caches.open(SITE_CACHE_NAME)
            //-- Take anything that is meant to be cached and store it in Cache Storage
            .then( cache => {
                console.log(`//-- sw.js.install: Site Cache installed for ${FILES_TO_CACHE.length} files.`)
                return (cache.addAll(FILES_TO_CACHE))
            })
    )
    //-- Cache site data - which is used for user input in offline events
    await e.waitUntil(
        caches.open(DATA_CACHE_NAME)
            .then( cache => {
                console.log(`//-- sw.js.install: Data Cache installed for ${DATA_TO_CACHE.length} values.`)
                return (cache.addAll(DATA_TO_CACHE))
            })
    )

})

self.addEventListener('activate', async function(e){
    //-- Activate the Sevice Worker
    await e.waitUntil(
        caches.keys().then(keyList => {

            return Promise.all(
                keyList.map( key => {
                    if (key !== SITE_CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log(`//-- sw.js.activate: - Purging old cache data for ${key}`);
                        return caches.delete(key);
                    }
                })
            )
        })
    )
    //-- Claim the service worker
    self.clients.claim();
})

self.addEventListener('fetch', async function(evt) {
    
    //-- if making an API call
    if (evt.request.url.includes('/api/')) {
        //-- in response to the event request to the api
        await evt.respondWith(
          caches
            //-- open the data-cache
            .open(DATA_CACHE_NAME)
            .then(cache => { 
                //-- return the request to fetch assuming it's a fetch-request
                return fetch(evt.request)
                    // Verify if response is sucess or not and stores if 200 only.
                    .then(response => {
                        //-- If 200, save to Cache Storage.
                        if (response.status === 200) {
                            cache.put(evt.request.url, response.clone()); 
                        }
                        //-- Either way, return results to client
                        return response; 
                    })
                    //--  Network request failed, try to get it from the cache.
                    .catch(err => {
                        return cache.match(evt.request); 
                    });
            })
            .catch(err => console.log(err))
        );
        return;
    }

    //-- If making a NON API Call to any HTML file, send back to cached homepage
    if (!(evt.request.url.includes('/api/'))) {
        //-- in response to the event request to anything but the API
        evt.respondWith( 
            //-- review request
            fetch(evt.request)
                .catch(function() {
                    return caches.match(evt.request).then(function(response) {
                        //-- if got a response, EXIT - no fetch interception required but succesful
                        if (response) {  return response; }
                        //-- if response was made and not succesful, redirect to  cached homepage for all requests of filetype html 
                        if (evt.request.headers.get('accept').includes('text/html')) { return caches.match('/'); }
                    });
                })
        );
    }
});
