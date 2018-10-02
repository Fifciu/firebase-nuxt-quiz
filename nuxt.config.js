module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  head: {
    title: 'Firebase Nuxt Quiz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Simple firebase nuxt quiz app.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Lora|Ubuntu"
      }
    ]
  },
  css:[
      '@/assets/global.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
	publicPath: '/static'
  },
  plugins:[
      './plugins/firebase.js',
   { src: '~/plugins/localStorage.js', ssr: false },
   { src: '~/plugins/rwd.js', ssr: false }
  ],
  modules: [
      'nuxt-material-design-icons',
      [ '@nuxtjs/pwa', { meta: false }]
  ],
   router:{
     middleware: 'global',
	base: '/firebase-nuxt-quiz/'
   },

  workbox: {
    offlineAssets:[
        'https://fonts.googleapis.com/css?family=Lora|Ubuntu',
        'https://fonts.gstatic.com/s/lora/v12/0QIvMX1D_JOuMwr7Iw.woff2',
        'https://fonts.gstatic.com/s/ubuntu/v12/4iCs6KVjbNBYlgoKfw72.woff2',
        '/go.png', '/gui.png', '/php.png', '/reactivity.png', '/vue.png'
    ],
    offlinePage:[
        '/index.html'
    ]
  },
  manifest:{
    name: 'Fuxt',
    description: 'Simple PWA Quiz using Firebase&Nuxt',
    lang: 'en',
    background_color: "#ba375d"
  },
  icon: {
    iconSrc: '/static/firebase.png'
  }
}

