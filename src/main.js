import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Chat from 'vue-beautiful-chat'
import zircle from 'zircle'
import 'zircle/dist/zircle.css'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(Chat);
Vue.use(zircle);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// eslint-disable-next-line no-console
console.info(`
🍱 This app was bootstrapped with bento-starter 🍱

👉 https://bento-starter.netlify.com/

`);
