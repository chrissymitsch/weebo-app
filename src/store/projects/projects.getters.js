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
   * Check if a project has unsubscription of a member pending
   */
  isProjectMemberUnsubscriptionPending: state => userId =>
    state.projectMemberUnsubscriptionPending.includes(userId),

  /**
   * Check if a project has update pending
   */
  isProjectUpdatePending: state => projectId =>
    state.projectUpdatePending.includes(projectId),

  /**
   * Check if a project member is loading
   */
  isProjectMemberLoading: state => memberId =>
    state.projectMemberLoading.includes(memberId),
}
