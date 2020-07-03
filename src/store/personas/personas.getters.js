export default {
    /**
     * Check if a project has deletion of a persona pending
     */
    isProjectPersonaDeletionPending: state => personaId =>
        state.projectPersonaDeletionPending.includes(personaId),
}
