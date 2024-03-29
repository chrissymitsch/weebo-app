export default {
  /* Project input name */
  setProjectNameToCreate: (state, projectNameToCreate) =>
    (state.projectNameToCreate = projectNameToCreate),

  /* Projects */
  setCurrentProject: (state, project) => (state.currentProject = project),
  setUserProjects: (state, projects) => (state.userProjects = projects),
  updateProject: (state, updatedProject) => (state.currentProject = updatedProject),
  removeProjectById: (state, projectId) => {
    if (state.currentProject && state.currentProject.id === projectId) {
      state.currentProject = null;
    }
  },
  setProjectLoading: (state, projectId) => state.projectLoading.push(projectId),

  /* Project members */
  addProjectMember: (state, memberToAdd) => {
    if (state.projectMembers && state.projectMembers.length > 0) {
      const index = state.projectMembers.findIndex(member => member.id === memberToAdd.id);
      if (index < 0) {
        state.projectMembers.push(memberToAdd)
      }
    } else {
      state.projectMembers = [memberToAdd]
    }
  },
  removeProjectMember: (state, memberId) => {
    const index = state.projectMembers.findIndex(member => member.id === memberId);
    state.projectMembers.splice(index, 1)
  },
  addProjectMemberLoading: (state, memberId) =>
      state.projectMemberLoading.push(memberId),
  removeProjectMemberLoading: (state, memberId) => {
    const index = state.projectMemberLoading.findIndex(member => member.id === memberId);
    state.projectMemberLoading.splice(index, 1)
  },
  addProjectMemberUnsubscriptionPending: (state, memberId) => state.projectMemberUnsubscriptionPending.push(memberId),
  removeProjectMemberUnsubscriptionPending: (state, memberId) => {
    const index = state.projectMemberUnsubscriptionPending.findIndex(member => member.id === memberId);
    state.projectMemberUnsubscriptionPending.splice(index, 1)
  },

  addProjectMemberUpdatePending: (state, memberId) =>
      state.projectMemberUpdatePending.push(memberId),
  removeProjectMemberUpdatePending: (state, memberId) => {
    const index = state.projectMemberUpdatePending.findIndex(member => member.id === memberId);
    state.projectMemberUpdatePending.splice(index, 1)
  },

  /* Projects deletion */
  addProjectDeletionPending: (state, projectId) =>
    state.projectDeletionPending.push(projectId),
  removeProjectDeletionPending: (state, projectId) => {
    const index = state.projectDeletionPending.findIndex(project => project === projectId);
    state.projectDeletionPending.splice(index, 1)
  },

  /* Projects unsubscription */
  addProjectUnsubscriptionPending: (state, projectId) =>
    state.projectUnsubscriptionPending.push(projectId),
  removeProjectUnsubscriptionPending: (state, projectId) => {
    const index = state.projectUnsubscriptionPending.findIndex(project => project.id === projectId);
    state.projectUnsubscriptionPending.splice(index, 1)
  },

  /* Projects update */
  addProjectUpdatePending: (state, project) =>
    state.projectUpdatePending.push(project),
  removeProjectUpdatePending: (state, updatedProject) => {
    const index = state.projectUpdatePending.findIndex(project => project.id === updatedProject.id);
    state.projectUpdatePending.splice(index, 1)
  },

  /* Project creation */
  setProjectCreationPending: (state, value) =>
    (state.projectCreationPending = value),

  /* Project subscription */
  setSubscriptionPending: (state, value) =>
    (state.subscriptionPending = value)
}
