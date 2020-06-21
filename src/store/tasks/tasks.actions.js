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
  createProjectTask: async ({ rootState }, task) => {
    const newTask = {
      title: task.title,
      creator: rootState.authentication.user.id,
      type: task.type,
      column: task.column
    };

    const projectsTasksDB = new ProjectsTasksDB(task.projectId);
    await projectsTasksDB.create(newTask);
  },

  /**
   * Update task for current project
   */
  updateProjectTask: async ({ commit }, {projectId, task}) => {
    const projectsTasksDB = new ProjectsTasksDB(projectId);
    const updatedTask = await projectsTasksDB.update(task);
    commit('updateProjectTask', updatedTask);
  },

}
