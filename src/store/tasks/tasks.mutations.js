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
  }
}
