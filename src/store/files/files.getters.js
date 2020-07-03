export default {
    /**
     * Check if a project has deletion of a file pending
     */
    isProjectFileDeletionPending: state => fileId =>
        state.projectFileDeletionPending.includes(fileId),
}
