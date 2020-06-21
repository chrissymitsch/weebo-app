import Vue from 'vue'
import Vuex from 'vuex'
import VueSocialSharing from 'vue-social-sharing'

import authentication from './authentication'
import app from './app'
import messages from './messages'
import projects from './projects'
import tasks from './tasks'
import rewards from './rewards'

Vue.use(Vuex);
Vue.use(VueSocialSharing);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication,
    app,
    messages,
    projects,
    tasks,
    rewards
  }
})
