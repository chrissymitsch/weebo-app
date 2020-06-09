import { find } from 'lodash'

export default {
  /**
   * Check if a project has deletion pending
   */
  isProjectDeletionPending: state => projectId =>
    state.projectDeletionPending.includes(projectId),

  /**
   * Get project by id
   */
  getProjectById: state => projectId =>
    find(state.projects, project => project.id === projectId)
}
