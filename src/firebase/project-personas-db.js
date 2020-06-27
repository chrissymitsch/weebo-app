import GenericDB from './generic-db'

export default class ProjectPersonasDb extends GenericDB {
  constructor(projectId) {
    super(`projects/${projectId}/personas`)
  }
}
