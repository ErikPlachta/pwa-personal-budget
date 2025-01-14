const SITE_CACHE_PREFACE = "bt-site-cache"
const DATA_CACHE_PREFACE = "bt-data-cache"
const VERSION = "-v_1.0.0"
const SITE_CACHE_NAME = SITE_CACHE_PREFACE + VERSION
const DATA_CACHE_NAME = DATA_CACHE_PREFACE + VERSION


// create variable to hold db connection
let db;

// establish a connection to IndexedDB database called 'personal-budget-pwa' and set it to version 1
const request = indexedDB.open(DATA_CACHE_NAME, 1);

// upon a successful 
request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run uploadEntry() function to send all local db data to api
    if (navigator.onLine) {
      //-- when back online even happens, upload Entries created while offlne and stored in  IndexedDB
      uploadEntry();
    }
};
  
request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `entry`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('entry', { autoIncrement: true });
  };
  

// This function will be executed if we attempt to submit a new Entry and there's no internet connection
function saveRecord(record) {
    // open a new entry with the database with read and write permissions 
    const entry = db.transaction(['entry'], 'readwrite');
  
    // access the object store for `entry`
    const EntryObjectStore = entry.objectStore('entry');
  
    // add record to your store with add method
    EntryObjectStore.add(record);
}

function uploadEntry() {
    // open a entry on your pending db
    const entry = db.transaction(['entry'], 'readwrite');
  
    // access your pending object store
    const entryObjectStore = entry.objectStore('entry');
  
    // get all records from store and set to a variable
    const getAll = entryObjectStore.getAll();
  
    getAll.onsuccess = function() {
      // if there was data in indexedDb's store, let's send it to the api server
      if (getAll.result.length > 0) {
        fetch('/api/transaction/bulk', {
          method: 'POST',
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(serverResponse => {
            if (serverResponse.message) {
              throw new Error(serverResponse);
            }
  
            const entry = db.transaction(['entry'], 'readwrite');
            const entryObjectStore = entry.objectStore('entry');
            // clear all items in your store
            entryObjectStore.clear();
          })
          .catch(err => {
            // set reference to redirect back here
            console.log(err);
          });
      }
    };
  }
  
  // listen for app coming back online
  window.addEventListener('online', uploadEntry);