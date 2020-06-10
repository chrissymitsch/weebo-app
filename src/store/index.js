import Vue from 'vue'
import Vuex from 'vuex'
import VueSocialSharing from 'vue-social-sharing'

import authentication from './authentication'
import app from './app'
import projects from './projects'

Vue.use(Vuex);
Vue.use(VueSocialSharing);

/* If you don't know about Vuex, please refer to https://vuex.vuejs.org/ */

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication,
    app,
    projects
  }
})
