importScripts('/firebase-nuxt-quiz/static/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/firebase-nuxt-quiz/static/app.e505bfba56bf31cccc35.js",
    "revision": "d399152a0c276dd0d39c2ca8481cfc14"
  },
  {
    "url": "/firebase-nuxt-quiz/static/layouts/default.ea51cb69252f45388b2a.js",
    "revision": "48583a0c51f8605de595b64eb4c887cb"
  },
  {
    "url": "/firebase-nuxt-quiz/static/manifest.ce7586751803ceda11e1.js",
    "revision": "7ace62f1ec9189bc2bf84b2ec3960654"
  },
  {
    "url": "/firebase-nuxt-quiz/static/pages/auth.38c093c498f5af260b1d.js",
    "revision": "a14a45a04f419f3688ae81abb3eca173"
  },
  {
    "url": "/firebase-nuxt-quiz/static/pages/index.7174e6c74cc9daeb6268.js",
    "revision": "394cb12485aeed02bb81ac7b83bc4c08"
  },
  {
    "url": "/firebase-nuxt-quiz/static/pages/pick-quiz/index.4ea666d973cb557e6173.js",
    "revision": "67c7c46c824288be814f475cccc66b6f"
  },
  {
    "url": "/firebase-nuxt-quiz/static/pages/quiz/_quizname.a4900f0f0c053fc215c5.js",
    "revision": "79b0f051c8fa8bec63a2f45b4a413d22"
  },
  {
    "url": "/firebase-nuxt-quiz/static/pages/quiz/index.8b280bf49c5f82db849d.js",
    "revision": "067994f15c08df63eb647778e6f94300"
  },
  {
    "url": "/firebase-nuxt-quiz/static/vendor.0d3048b754e7e8b1ae16.js",
    "revision": "4d53dfe7fee5cfb3d2b2bcdbf428c0cc"
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


workbox.routing.registerRoute(new RegExp('/firebase-nuxt-quiz/static/.*'), workbox.strategies.cacheFirst({}), 'GET')



// offlinePage support
const strategy = workbox.strategies.networkOnly()
workbox.routing.registerRoute(new RegExp('/.*'), ({event}) => {
  return strategy.handle({event})
    .catch(() => caches.match('/index.html'))
})


