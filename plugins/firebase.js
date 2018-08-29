import Vue from 'vue'
import Firebase from 'firebase'
import 'firebase/firestore'

const firebasePlugin = {
  install () {
    if (Vue.__nuxt_firebase_installed__) {
      return
    }
    Vue.__nuxt_firebase_installed__ = true

    if (!Vue.prototype.$fir) {
      Vue.prototype.$fir = Firebase.initializeApp({
        apiKey: "AIzaSyBU3HqYWDw03NWPMdv9GALvJuIP65LUZW8",
        authDomain: "fir-nuxt-quiz.firebaseapp.com",
        databaseURL: "https://fir-nuxt-quiz.firebaseio.com",
        projectId: "fir-nuxt-quiz",
        storageBucket: "fir-nuxt-quiz.appspot.com",
        messagingSenderId: "83110563501"
      })
    }
  }

}

Vue.use(firebasePlugin)

export default (ctx) => {
  const { app, store } = ctx

  app.$fir = Vue.prototype.$fir
  ctx.$fir = Vue.prototype.$fir
  if (store) {
    store.$fir = Vue.prototype.$fir
  }
}