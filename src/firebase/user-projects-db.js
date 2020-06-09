import GenericDB from './generic-db'

export default class UserProjectsDb extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/projects`)
  }

  // Here you can extend UserProjectsDb with custom methods
}
