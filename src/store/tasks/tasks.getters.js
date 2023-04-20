export default {
    /**
     * Check if a project has deletion of a task pending
     */
    isProjectTaskDeletionPending: state => taskId =>
        state.projectTaskDeletionPending.includes(taskId),
}
