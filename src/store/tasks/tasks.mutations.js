export default {
  /* Tasks */
  setTasks: (state, tasks) => (state.tasks = tasks),
  updateProjectTask: (state, updatedTask) => {
    const index = state.tasks.findIndex(task => task.id === updatedTask.id);
    state.tasks[index] = updatedTask;
  }
}
