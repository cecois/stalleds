// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css' // Optional CSS

// bulma stuff via buefy
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import moment from 'moment'
import VTooltip from 'v-tooltip'


import App from './App'
import router from './router'
import underscore from 'vue-underscore'

// firebase stuff
// import VueFire from 'vuefire'
// import VUEFIRESTORE from 'vue-firestore'
// import firebase from 'firebase/app'
// import 'firebase/firestore'

// import {_} from 'vue-underscore'

// import {__} from 'levenshtein-dist';
// Vue.use(levenshtein);

// import levenshtein from 'levenshtein-dist';
// import moment from 'moment';
// Object.defineProperty(Vue.prototype, '$levenshtein', { value: levenshtein });
Vue.use(underscore)
Vue.use(VTooltip)

// Object.defineProperty(Vue.prototype, '$moment', { value: moment })

// import VueFormWizard from 'vue-form-wizard'
// https://www.npmjs.com/package/vue-form-wizard
// import 'vue-form-wizard/dist/vue-form-wizard.min.css'
// Vue.use(VueFormWizard)

Vue.config.productionTip = false

// console.log("process.env.G_*:");
// console.log(process.env.G_CLIENT_ID);
// console.log(process.env.G_API_KEY);

Vue.use(Buefy)

// Vue.use(VueFire)
// Vue.use(VUEFIRESTORE)
Vue.component('vue-simple-suggest', VueSimpleSuggest)

Object.defineProperty(Vue.prototype, '$MOMENT', { value: moment })

// var firebaseApp = firebase.initializeApp({
//   projectId: 'nlfbma',
//   databaseURL: 'https://nlfbma.firebaseio.com'
// })

// export const db = firebase.firestore()
// const settings = {timestampsInSnapshots: true}
// db.settings(settings)
// const firestore = firebaseApp.firestore();
// const settings = {
/* your settings... */
// timestampsInSnapshots: true}
// firestore.settings(settings);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, VueSimpleSuggest },
  template: '<App/>'
// firestore() {
//   return {
//       // Collection
//       appointments: firestore.collection('appointments'),
//       agencies: firestore.collection('agencies')
//       // Doc
//       // ford: firestore.collection('cars').doc('ford')
//   }
// }
})
