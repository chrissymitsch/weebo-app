import GenericDB from './generic-db'

export default class ProjectRewardsDb extends GenericDB {
  constructor(projectId) {
    super(`projects/${projectId}/rewards`)
  }
}
