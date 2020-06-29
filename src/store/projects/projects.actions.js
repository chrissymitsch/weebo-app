import ProjectsDB from '@/firebase/projects-db'
import UsersDB from "@/firebase/users-db";
import moment from 'moment'

export default {
  /**
   * Fetch project member
   */
  getProjectMember: async ({ commit }, userId) => {
    commit('addProjectMemberLoading', userId);
    const userDb = new UsersDB();
    const user = await userDb.read(userId);
    commit('removeProjectMemberLoading', userId);
    return user;
  },

  /**
   * Updates a thank you score for project member
   */
  updateThankYouScore: async ({ commit }, {projectMemberId, projectId}) => {
    commit('addProjectMemberUpdatePending', projectMemberId);
    const userDb = new UsersDB();
    const user = await userDb.read(projectMemberId);
    const userToUpdate = JSON.parse(JSON.stringify(user));
    const today = moment().format("DD.MM.YYYY");
    if (userToUpdate.thankYou) {
      const checkTodaysScore = userToUpdate.thankYou.findIndex(elem => elem.date === today && elem.projectId === projectId);
      if (checkTodaysScore > -1) {
        userToUpdate.thankYou[checkTodaysScore] = {
          "score": Number(userToUpdate.thankYou[checkTodaysScore].score) + 1,
          "date": today,
          "projectId": projectId
        }
      } else {
        userToUpdate.thankYou.push({
          "score": 1,
          "date": today,
          "projectId": projectId
        });
      }
    } else {
      userToUpdate.thankYou = [{
        "score": 1,
        "date": today,
        "projectId": projectId
      }];
    }
    await userDb.update(userToUpdate);
    commit('removeProjectMemberUpdatePending', projectMemberId);
  },

  /**
   * Fetch project
   */
  getProject: async ({ rootState }, projectId) => {
    console.log("getProject", rootState.authentication.user.id);
    const projectDb = new ProjectsDB();
    return projectDb.read(projectId);
  },

  /**
   * Fetch projects
   */
  getProjects: async ({ rootState, commit }) => {
    const usersDb = new UsersDB();
    const user = await usersDb.read(rootState.authentication.user.id);
    commit('setUserProjects', user.projects);
  },

  /**
   * Fetch current project
   */
  getProjectById: async ({ commit, dispatch }, projectId) => {
    const projectDb = new ProjectsDB();

    const project = await projectDb.read(projectId);
    commit('setCurrentProject', project);

    if (project.members) {
      for (let i = 0; i < project.members.length; i += 1) {
        dispatch('getProjectMember', project.members[i]).then(data => {
          commit('addProjectMember', data);
        });
      }
    }
  },

  /**
   * Updates project list for current loggedin user
   */
  updateUserProjects: async ({ commit, rootState }, project) => {
    const usersDb = new UsersDB();

    const user = await usersDb.read(rootState.authentication.user.id);
    if (user.projects) {
      user.projects.push(project.id);
    } else {
      user.projects = [project.id];
    }
    await usersDb.update(user);
    commit('setUserProjects', user.projects);
    commit('setProjectCreationPending', false)
  },

  /**
   * Create a project for current loggedin user
   */
  createUserProject: async ({ commit, dispatch, rootState }, project) => {
    const projectDb = new ProjectsDB();

    commit('setProjectCreationPending', true);
    project.members = [rootState.authentication.user.id];
    const createdProject = await projectDb.create(project);
    dispatch("updateUserProjects", createdProject);
  },

  /**
   * Subscribes current loggedin user to a project.
   */
  subscribeUserToProject: async ({ commit, rootState }, project) => {
    const usersDb = new UsersDB();
    const projectDb = new ProjectsDB();

    commit('setSubscriptionPending', true);
    const user = await usersDb.read(rootState.authentication.user.id);
    if ((user.projects && !user.projects.includes(project.id)) || !user.projects) {
      const updateProject = JSON.parse(JSON.stringify(project));

      if (updateProject.members) {
        updateProject.members.push(rootState.authentication.user.id);
      } else {
        updateProject.members = [rootState.authentication.user.id];
      }
      const updatedProject = await projectDb.update(updateProject);
      if (user.projects) {
        user.projects.push(project.id);
      } else {
        user.projects = [project.id];
      }
      await usersDb.update(user);
      commit('updateProject', updatedProject);
      commit('setUserProjects', user.projects)
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

    const usersDb = new UsersDB();
    const projectsDb = new ProjectsDB();

    commit('addProjectDeletionPending', projectId);
    const user = await usersDb.read(rootState.authentication.user.id);
    user.projects = user.projects.filter(e => e !== projectId);

    await usersDb.update(user);
    await projectsDb.delete(projectId);

    commit('setUserProjects', user.projects);
    commit('removeProjectById', projectId);
    commit('removeProjectDeletionPending', projectId)
  },

  /**
   * Update a user project from its id
   */
  updateUserProject: async ({ commit, getters }, project) => {
    if (getters.isProjectUpdatePending(project.id)) return;

    const projectsDb = new ProjectsDB();

    commit('addProjectUpdatePending', project.id);
    await projectsDb.update(project);
    commit('updateProject', project);
    commit('removeProjectUpdatePending', project)
  },

  /**
   * Unsubscribe a user project from its id
   */
  unsubscribeUserProject: async ({ rootState, commit, getters }, projectId) => {
    if (getters.isProjectUnsubscriptionPending(projectId)) return;

    const usersDb = new UsersDB();
    const projectsDb = new ProjectsDB();

    commit('addProjectUnsubscriptionPending', projectId);
    const user = await usersDb.read(rootState.authentication.user.id);
    user.projects = user.projects.filter(e => e !== projectId);
    await usersDb.update(user);
    const project = await projectsDb.read(projectId);
    project.members = project.members.filter(e => e !== rootState.authentication.user.id);
    const updatedProject = await projectsDb.update(project);

    commit('setUserProjects', user.projects);
    commit('removeProjectById', updatedProject);
    commit('removeProjectUnsubscriptionPending', projectId)
  },

  /**
   * Subscribes to update an existing project.
   */
  triggerUpdateProjectAction: ({ dispatch }, project) => {
    dispatch('updateUserProject', project)
  },

  /**
   * Subscribes to update thank you score an project member.
   */
  triggerUpdateThankYouAction: ({ dispatch }, {projectMemberId, projectId}) => {
    dispatch('updateThankYouScore', {projectMemberId, projectId});
  }
}
