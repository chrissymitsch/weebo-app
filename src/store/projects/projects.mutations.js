export default {
  /* Project input name */
  setProjectNameToCreate: (state, projectNameToCreate) =>
    (state.projectNameToCreate = projectNameToCreate),

  /* Projects */
  setProjects: (state, projects) => (state.projects = projects),
  addProject: (state, project) => state.projects.push(project),
  removeProjectById: (state, projectId) => {
    const index = state.projects.findIndex(project => project.id === projectId)
    state.projects.splice(index, 1)
  },

  /* Projects deletion */
  addProjectDeletionPending: (state, projectId) =>
    state.projectDeletionPending.push(projectId),
  removeProjectDeletionPending: (state, projectId) => {
    const index = state.projects.findIndex(project => project.id === projectId)
    state.projectDeletionPending.splice(index, 1)
  },

  /* Project creation */
  setProjectCreationPending: (state, value) =>
    (state.projectCreationPending = value)
}
