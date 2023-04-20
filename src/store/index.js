import Vue from 'vue'
import Vuex from 'vuex'
import VueSocialSharing from 'vue-social-sharing'

import authentication from './authentication'
import app from './app'
import events from './events'
import files from './files'
import messages from './messages'
import personas from './personas'
import projects from './projects'
import rewards from './rewards'
import tasks from './tasks'

Vue.use(Vuex);
Vue.use(VueSocialSharing);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication,
    app,
    events,
    files,
    messages,
    personas,
    projects,
    rewards,
    tasks
  }
})
