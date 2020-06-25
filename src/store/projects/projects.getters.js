export default {
  /**
   * Check if a project has deletion pending
   */
  isProjectDeletionPending: state => projectId =>
    state.projectDeletionPending.includes(projectId),

  /**
   * Check if a project has unsubscription pending
   */
  isProjectUnsubscriptionPending: state => projectId =>
    state.projectUnsubscriptionPending.includes(projectId),

  /**
   * Check if a project has update pending
   */
  isProjectUpdatePending: state => projectId =>
    state.projectUpdatePending.includes(projectId),
}
