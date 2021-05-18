let CACHE_NAME='version-1'
let urlsToCatch=['/index.html',"/static/media/hero.86c45f18.png","/static/js/2.1f39c55b.chunk.js",'/static/css/main.f78836fa.chunk.css','/static/css/2.65af8127.chunk.css','/offline.html','/static/js/main.chunk.js','/static/js/0.chunk.js','/static/js/bundle.js','/','/manifest.json','/serviceworker.js']

let self=this


//install service worker
self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log('cache opend');
            return cache.addAll(urlsToCatch)
        })
    )
})

//listen for request
self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request)
        .then((result)=>{
            if(result){
                return result
            }
            return fetch(event.request)
            // .catch(()=>{
            //     caches.match('offline.html')
            // })
        })
    
    
    
    )
})

//active service worker
self.addEventListener('activate',(event)=>{
    let cacheWhiteLists=[]
    cacheWhiteLists.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames)=>Promise.all(
            cacheNames.map((cacheNames)=>{
                if(!cacheWhiteLists.includes(cacheNames)){
                    return caches.delete(cacheNames)
                }
            })
        ))
    )
})
// self.addEventListener('activate', (event) => {
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames.map((cache) => {
//                     if (cache !== CACHE_NAME) {
//                         return caches.delete(cache); //Deleting the old cache (cache v1)
//                     }
//                 })
//             );
//         })
//             .then(function () {
//                 console.info("Old caches are cleared!");
//                 return self.clients.claim();
//             })
//     );
// });