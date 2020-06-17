export default {
  /* Project input name */
  setProjectNameToCreate: (state, projectNameToCreate) =>
    (state.projectNameToCreate = projectNameToCreate),

  /* Projects */
  setUserProjects: (state, projects) => (state.userProjects = projects),
  setCurrentProject: (state, project) => (state.currentProject = project),
  addUserProject: (state, project) => state.userProjects.push(project),
  setProjectMembers: (state, members) => (state.projectMembers =  members),
  updateProject: (state, updatedProject) => {
    const index = state.userProjects.findIndex(project => project.id === updatedProject.id);
    state.userProjects[index] = updatedProject;
    state.currentProject = updatedProject;
  },
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

  /* Projects unsubscription */
  addProjectUnsubscriptionPending: (state, projectId) =>
    state.projectUnsubscriptionPending.push(projectId),
  removeProjectUnsubscriptionPending: (state, projectId) => {
    const index = state.userProjects.findIndex(project => project.id === projectId);
    state.projectUnsubscriptionPending.splice(index, 1)
  },

  /* Projects update */
  addProjectUpdatePending: (state, project) =>
    state.projectUpdatePending.push(project),
  removeProjectUpdatePending: (state, updatedProject) => {
    const index = state.userProjects.findIndex(project => project.id === updatedProject.id);
    state.projectUpdatePending.splice(index, 1)
  },

  /* Project creation */
  setProjectCreationPending: (state, value) =>
    (state.projectCreationPending = value),

  /* Project subscription */
  setSubscriptionPending: (state, value) =>
    (state.subscriptionPending = value)
}
