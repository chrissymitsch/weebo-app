import ProjectsTasksDB from '@/firebase/project-tasks-db'

export default {
  /**
   * Fetch tasks for project id
   */
  getTasks: async ({ commit }, projectId) => {
    const projectTasksDb = new ProjectsTasksDB(projectId);

    const tasks = await projectTasksDb.readAll();
    commit('setTasks', tasks)
  },

  /**
   * Create a task for current project
   */
  createProjectTask: async ({ rootState, commit }, task) => {
    const newTask = {
      title: task.title,
      creator: rootState.authentication.user.id,
      position: task.position,
      type: task.type,
      column: task.column
    };

    const projectsTasksDB = new ProjectsTasksDB(task.projectId);
    await projectsTasksDB.create(newTask);
    commit('addProjectTask', newTask);
  },

  /**
   * Update task for current project
   */
  updateProjectTask: async ({ commit }, {projectId, task}) => {
    const projectsTasksDB = new ProjectsTasksDB(projectId);
    await projectsTasksDB.update(task);
    commit('updateProjectTask', task);
  },

  /**
   * Delete task for current project
   */
  deleteProjectTask: async ({ commit }, {projectId, taskId}) => {
    commit('addProjectTaskDeletionPending', taskId);
    const projectsTasksDB = new ProjectsTasksDB(projectId);
    await projectsTasksDB.delete(taskId);
    commit('deleteProjectTask', taskId);
    commit('removeProjectTaskDeletionPending', taskId);
  },

}
