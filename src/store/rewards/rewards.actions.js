import UserRewardsDb from '@/firebase/user-rewards-db'

export default {
  /**
   * Fetch scores for user
   */
  getScore: async ({ commit }, userId) => {
    const userRewardsDb = new UserRewardsDb(userId);

    const scores = await userRewardsDb.readAll({type: "score"});
    commit('setScores', scores)
  },

  /**
   * Fetch badges for user
   */
  getUserBadges: async ({ commit }, userId) => {
    const userRewardsDb = new UserRewardsDb(userId);

    const badges = await userRewardsDb.readAll([['type', '==', 'badge']]);
    commit('setUserBadges', badges)
  },

  /**
   * Fetch finished tutorials for user
   */
  getFinishedTutorials: async ({ commit }, userId) => {
    const userRewardsDb = new UserRewardsDb(userId);

    const tutorials = await userRewardsDb.readAll([['type', '==', 'tutorial']]);
    commit('setFinishedTutorials', tutorials)
  },

  /**
   * Creates a badge to loggedin user
   */
  createUserBadge: async ({ commit, rootState }, badge) => {
    const userRewardsDb = new UserRewardsDb(rootState.authentication.user.id);

    const createdUserBadge = await userRewardsDb.create(badge);
    commit('addUserBadge', createdUserBadge);
  },

  /**
   * Creates a tutorial object to loggedin user
   */
  createFinishedTutorial: async ({ commit, rootState }, tutorial) => {
    const userRewardsDb = new UserRewardsDb(rootState.authentication.user.id);

    const createdFinishedTutorial = await userRewardsDb.create(tutorial);
    commit('addFinishedTutorial', createdFinishedTutorial);
  }
}
