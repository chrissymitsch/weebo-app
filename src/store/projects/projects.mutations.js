export default {
  /* Project input name */
  setProjectNameToCreate: (state, projectNameToCreate) =>
    (state.projectNameToCreate = projectNameToCreate),

  /* Projects */
  setUserProjects: (state, projects) => (state.userProjects = projects),
  setCurrentProject: (state, project) => (state.currentProject = project),
  addUserProject: (state, project) => state.userProjects.push(project),
  removeProjectById: (state, projectId) => {
    const index = state.userProjects.findIndex(project => project.id === projectId);
    state.userProjects.splice(index, 1);
    if (state.currentProject && state.currentProject.id === projectId) {
      state.currentProject = null;
    }
  },

  /* Projects deletion */
  addProjectDeletionPending: (state, projectId) =>
    state.projectDeletionPending.push(projectId),
  removeProjectDeletionPending: (state, projectId) => {
    const index = state.userProjects.findIndex(project => project.id === projectId);
    state.projectDeletionPending.splice(index, 1)
  },

  /* Projects deletion */
  addProjectUnsubscriptionPending: (state, projectId) =>
    state.projectUnsubscriptionPending.push(projectId),
  removeProjectUnsubscriptionPending: (state, projectId) => {
    const index = state.userProjects.findIndex(project => project.id === projectId);
    state.projectUnsubscriptionPending.splice(index, 1)
  },

  /* Project creation */
  setProjectCreationPending: (state, value) =>
    (state.projectCreationPending = value),

  /* Project subscription */
  setSubscriptionPending: (state, value) =>
    (state.subscriptionPending = value)
}
