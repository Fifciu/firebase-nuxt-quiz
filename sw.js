importScripts('/static/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/staticapp.ff7b17cab5d95171bebc.js",
    "revision": "d0f01bdf2a133acc99c6c5917136a08e"
  },
  {
    "url": "/staticlayouts/default.ea51cb69252f45388b2a.js",
    "revision": "48583a0c51f8605de595b64eb4c887cb"
  },
  {
    "url": "/staticmanifest.f80c5b9d6eca9d205c34.js",
    "revision": "ab069cb58758f590a7cf479090d75bd2"
  },
  {
    "url": "/staticpages/auth.38c093c498f5af260b1d.js",
    "revision": "a14a45a04f419f3688ae81abb3eca173"
  },
  {
    "url": "/staticpages/index.7174e6c74cc9daeb6268.js",
    "revision": "394cb12485aeed02bb81ac7b83bc4c08"
  },
  {
    "url": "/staticpages/pick-quiz/index.4ea666d973cb557e6173.js",
    "revision": "67c7c46c824288be814f475cccc66b6f"
  },
  {
    "url": "/staticpages/quiz/_quizname.a4900f0f0c053fc215c5.js",
    "revision": "79b0f051c8fa8bec63a2f45b4a413d22"
  },
  {
    "url": "/staticpages/quiz/index.8b280bf49c5f82db849d.js",
    "revision": "067994f15c08df63eb647778e6f94300"
  },
  {
    "url": "/staticvendor.162dc88b14870ddf4695.js",
    "revision": "69505432a211f7d144478a048d801b84"
  }
], {
  "cacheId": "firebase-nuxt-quiz",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.precaching.precacheAndRoute(['https://fonts.googleapis.com/css?family=Lora|Ubuntu', 'https://fonts.gstatic.com/s/lora/v12/0QIvMX1D_JOuMwr7Iw.woff2', 'https://fonts.gstatic.com/s/ubuntu/v12/4iCs6KVjbNBYlgoKfw72.woff2', '/go.png', '/gui.png', '/php.png', '/reactivity.png', '/vue.png'])

workbox.precaching.precacheAndRoute(['/index.html'])

workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/static/.*'), workbox.strategies.cacheFirst({}), 'GET')



// offlinePage support
const strategy = workbox.strategies.networkOnly()
workbox.routing.registerRoute(new RegExp('/.*'), ({event}) => {
  return strategy.handle({event})
    .catch(() => caches.match('/index.html'))
})


