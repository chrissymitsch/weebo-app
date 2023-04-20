import GenericDB from './generic-db'

export default class UserRewardsDb extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/rewards`)
  }
}
