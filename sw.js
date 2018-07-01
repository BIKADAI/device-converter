/**
 * 
 *RADIUS BIKADAI 
 */
var staticCacheName = 'radius-currency-converter-v0';
var allCaches = [staticCacheName];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('radius-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
	    caches.open(staticCacheName).then(function(cache) {
          if(!event.request.url.endsWith("sw.js"))
          {
              return fetch(event.request).then(function(response){
				  if(response){
				  cache.delete(event.request);
                  cache.put(event.request,response.clone());
                  return response;
				  }
				  
			  }).catch(function(err){
			  
			   return cache.match(event.request);
			  
		  })
          }else return fetch(event.request);
		}));
		});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});