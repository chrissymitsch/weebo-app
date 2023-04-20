import GenericDB from './generic-db'

export default class MessagesDb extends GenericDB {
  constructor(projectId) {
    super(`projects/${projectId}/messages`)
  }
}
