import GenericDB from './generic-db'

export default class ProjectFilesDb extends GenericDB {
  constructor(projectId) {
    super(`projects/${projectId}/files`)
  }
}
