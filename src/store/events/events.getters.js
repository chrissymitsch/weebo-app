export default {
    /**
     * Check if a project has deletion of an event pending
     */
    isProjectEventDeletionPending: state => eventId =>
        state.projectEventDeletionPending.includes(eventId),
}
