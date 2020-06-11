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
   * Create a new project for current loggedin user and reset project name input
   */
  triggerAddProjectAction: ({ dispatch, state, commit }) => {
    if (state.projectNameToCreate === '') return;

    const project = { name: state.projectNameToCreate, creator: 1 };
    commit('setProjectNameToCreate', '');
    dispatch('createUserProject', project)
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
  }
}
