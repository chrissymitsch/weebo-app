export default {
  /* Tasks */
  setTasks: (state, tasks) => (state.tasks = tasks),
  addProjectTask: (state, task) => {
    if (state.tasks) {
      state.tasks.push(task);
    } else {
      state.tasks = [task];
    }
  },
  updateProjectTask: (state, updatedTask) => {
    const index = state.tasks.findIndex(task => task.id === updatedTask.id);
    state.tasks[index] = updatedTask;
  },
  deleteProjectTask: (state, taskId) => {
    const index = state.tasks.findIndex(task => task.id === taskId);
    state.tasks.splice(index, 1)
  },
  addProjectTaskDeletionPending: (state, taskId) =>
      state.projectTaskDeletionPending.push(taskId),
  removeProjectTaskDeletionPending: (state, taskId) => {
    const index = state.projectTaskDeletionPending.findIndex(task => task === taskId);
    state.projectTaskDeletionPending.splice(index, 1)
  },

}
