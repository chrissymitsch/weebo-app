import ProjectsTasksDB from '@/firebase/user-projects-db'

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
  createProjectTask: async ({ rootState }, task, projectId) => {
    const newTask = {
      title: task.title,
      creator: rootState.authentication.user.id,
      type: task.type,
      column: task.column
    };

    const projectsTasksDB = new ProjectsTasksDB(projectId);

    await projectsTasksDB.create(newTask);
  },

  /**
   * Create a new task for current project
   */
  triggerAddTaskAction: ({ dispatch, rootState }, projectId, task) => {
    console.log(projectId, task)
    const newTask = {
      projectId,
      title: task.title,
      creator: rootState.authentication.user.id,
      type: task.type,
      column: task.column
    };
    dispatch('createProjectTask', newTask)
  },

}
