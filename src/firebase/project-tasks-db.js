import GenericDB from './generic-db'

export default class ProjectTasksDb extends GenericDB {
  constructor(projectId) {
    super(`projects/${projectId}/tasks`)
  }
}
