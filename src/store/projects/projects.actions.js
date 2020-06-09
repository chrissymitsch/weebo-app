import UserProjectsDB from '@/firebase/user-projects-db'

export default {
  /**
   * Fetch projects of current loggedin user
   */
  getUserProjects: async ({ rootState, commit }) => {
    const userProjectDb = new UserProjectsDB(rootState.authentication.user.id)

    const projects = await userProjectDb.readAll()
    commit('setProjects', projects)
  },

  /**
   * Create a project for current loggedin user
   */
  createUserProject: async ({ commit, rootState }, project) => {
    const userProjectDb = new UserProjectsDB(rootState.authentication.user.id)

    commit('setProjectCreationPending', true)
    const createdProject = await userProjectDb.create(project)
    commit('addProject', createdProject)
    commit('setProjectCreationPending', false)
  },

  /**
   * Create a new project for current loggedin user and reset project name input
   */
  triggerAddProjectAction: ({ dispatch, state, commit }) => {
    if (state.projectNameToCreate === '') return

    const project = { name: state.projectNameToCreate }
    commit('setProjectNameToCreate', '')
    dispatch('createUserProject', project)
  },

  /**
   * Delete a user project from its id
   */
  deleteUserProject: async ({ rootState, commit, getters }, projectId) => {
    if (getters.isProjectDeletionPending(projectId)) return

    const userProjectsDb = new UserProjectsDB(rootState.authentication.user.id)

    commit('addProjectDeletionPending', projectId)
    await userProjectsDb.delete(projectId)
    commit('removeProjectById', projectId)
    commit('removeProjectDeletionPending', projectId)
  }
}
