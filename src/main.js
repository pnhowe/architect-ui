import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from 'vuetify'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
// import Chart from 'chart.js'

import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.use(vuetify)
Vue.use(VueChartkick, { Chartkick })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
