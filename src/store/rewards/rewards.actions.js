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
  getBadges: async ({ commit }, userId) => {
    const userRewardsDb = new UserRewardsDb(userId);

    const badges = await userRewardsDb.readAll({type: "badge"});
    commit('setBadges', badges)
  },

}
