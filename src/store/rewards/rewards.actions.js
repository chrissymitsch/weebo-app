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

    const badges = await userRewardsDb.readAll({type: "badge"});
    commit('setUserBadges', badges)
  },

  /**
   * Created a badge to loggedin user
   */
  createUserBadge: async ({ commit, rootState }, badge) => {
    const userRewardsDb = new UserRewardsDb(rootState.authentication.user.id);

    const createdUserBadge = await userRewardsDb.create(badge);
    commit('addUserBadge', createdUserBadge);
  }
}
