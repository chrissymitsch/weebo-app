import state from './tasks.state'
import mutations from './tasks.mutations'
import actions from './tasks.actions'
import getters from './tasks.getters'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
