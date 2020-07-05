import GenericDB from './generic-db'

export default class ProjectEventsDb extends GenericDB {
  constructor(projectId) {
    super(`projects/${projectId}/events`)
  }
}
