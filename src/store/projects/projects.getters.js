import { find } from 'lodash'

export default {
  /**
   * Check if a project has deletion pending
   */
  isProjectDeletionPending: state => projectId =>
    state.projectDeletionPending.includes(projectId),

  /**
   * Get user's project by id
   */
  getUserProjectByProjectId: state => projectId =>
    find(state.userProjects, project => project.projectId === projectId),
}
