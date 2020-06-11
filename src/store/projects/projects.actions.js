import UserProjectsDB from '@/firebase/user-projects-db'
import ProjectsDB from '@/firebase/projects-db'

export default {
  /**
   * Fetch projects of current loggedin user
   */
  getUserProjects: async ({ rootState, commit }) => {
    const userProjectDb = new UserProjectsDB(rootState.authentication.user.id);

    const projects = await userProjectDb.readAll();
    commit('setUserProjects', projects)
  },

  /**
   * Fetch projects
   */
  getProjectById: async ({ commit }, projectId) => {
    const projectDb = new ProjectsDB();

    const project = await projectDb.read(projectId);
    commit('setCurrentProject', project)
  },

  /**
   * Create a project for current loggedin user
   */
  createUserProject: async ({ commit, rootState }, project) => {
    const userProjectDb = new UserProjectsDB(rootState.authentication.user.id);
    const projectDb = new ProjectsDB();

    commit('setProjectCreationPending', true);
    const createdProject = await projectDb.create(project);
    const newProject = {
      createTimestamp: createdProject.createTimestamp,
      creator: createdProject.creator,
      projectId: createdProject.id,
      name: createdProject.name,
      updateTimestamp: createdProject.updateTimestamp
    };
    const createdUserProject = await userProjectDb.create(newProject);
    commit('addUserProject', createdUserProject);
    commit('setProjectCreationPending', false)
  },

  /**
   * Subscribes current loggedin user to a project.
   */
  subscribeUserToProject: async ({ commit, rootState, getters }, project) => {
    const userProjectDb = new UserProjectsDB(rootState.authentication.user.id);

    commit('setSubscriptionPending', true);
    if (!getters.getUserProjectByProjectId(project.id)) {
      const newProject = {
        createTimestamp: project.createTimestamp,
        creator: project.creator,
        projectId: project.id,
        name: project.name,
        updateTimestamp: project.updateTimestamp
      };
      const createdUserProject = await userProjectDb.create(newProject);
      commit('addUserProject', createdUserProject);
    }
    commit('setSubscriptionPending', false)
  },

  /**
   * Create a new project for current loggedin user and reset project name input
   */
  triggerAddProjectAction: ({ dispatch, rootState, state, commit }) => {
    if (state.projectNameToCreate === '') return;

    const project = { name: state.projectNameToCreate, creator: rootState.authentication.user.id};
    commit('setProjectNameToCreate', '');
    dispatch('createUserProject', project)
  },

  /**
   * Subscribes to an existing project for current loggedin user
   */
  triggerSubscribeProjectAction: ({ dispatch, state }) => {
    const project = state.currentProject;
    dispatch('subscribeUserToProject', project)
  },

  /**
   * Delete a user project from its id
   */
  deleteUserProject: async ({ rootState, commit, getters }, projectId) => {
    if (getters.isProjectDeletionPending(projectId)) return;

    const userProjectsDb = new UserProjectsDB(rootState.authentication.user.id);
    const projectsDb = new ProjectsDB();

    commit('addProjectDeletionPending', projectId);
    await userProjectsDb.delete(getters.getUserProjectByProjectId(projectId).id);
    await projectsDb.delete(projectId);
    commit('removeProjectById', projectId);
    commit('removeProjectDeletionPending', projectId)
  },

  /**
   * Unsubscribe a user project from its id
   */
  unsubscribeUserProject: async ({ rootState, commit, getters }, projectId) => {
    if (getters.isProjectUnsubscriptionPending(projectId)) return;

    const userProjectsDb = new UserProjectsDB(rootState.authentication.user.id);
    commit('addProjectUnsubscriptionPending', projectId);
    await userProjectsDb.delete(getters.getUserProjectByProjectId(projectId).id);
    commit('removeProjectById', getters.getUserProjectByProjectId(projectId).id);
    commit('removeProjectUnsubscriptionPending', projectId)
  }
}
