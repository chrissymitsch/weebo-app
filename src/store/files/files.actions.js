import ProjectsFilesDB from '@/firebase/project-files-db'

export default {
  /**
   * Fetch tasks for project id
   */
  getFiles: async ({ commit }, projectId) => {
    const projectFilesDb = new ProjectsFilesDB(projectId);

    const files = await projectFilesDb.readAll();
    commit('setFiles', files)
  },

  /**
   * Create an entry for a storage file for current project
   */
  createProjectFile: async ({ rootState, commit }, file) => {
    const newFile = {
      phase: file.phase,
      creator: rootState.authentication.user.id,
      url: file.url,
      name: file.name,
      size: file.size,
      type: file.type
    };

    const projectFilesDb = new ProjectsFilesDB(file.projectId);
    const createdFile = await projectFilesDb.create(newFile);
    commit('addProjectFile', createdFile);
  }
}
