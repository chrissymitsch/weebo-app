import UserRewardsDb from '@/firebase/user-rewards-db'

export default {
  /**
   * Fetch scores for user
   */
  getUserScore: async ({ commit }, userId) => {
    const userRewardsDb = new UserRewardsDb(userId);

    const score = await userRewardsDb.readAll([['type', '==', 'score']]);
    commit('setUserScore', score)
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
   * Creates a new score for loggedin user
   */
  createUserScore: async ({ commit, rootState }, score) => {
    const userRewardsDb = new UserRewardsDb(rootState.authentication.user.id);

    const createdUserScore = await userRewardsDb.create(score);
    commit('addUserScore', createdUserScore);
  },

  /**
   * Updates an existing score for loggedin user
   */
  updateUserScore: async ({ commit, rootState }, score) => {
    const userRewardsDb = new UserRewardsDb(rootState.authentication.user.id);

    const updatedUserScore = await userRewardsDb.update(score);
    commit('updateUserScore', updatedUserScore);
  },

  /**
   * Creates a badge for loggedin user
   */
  createUserBadge: async ({ commit, rootState }, badge) => {
    const userRewardsDb = new UserRewardsDb(rootState.authentication.user.id);

    const createdUserBadge = await userRewardsDb.create(badge);
    commit('addUserBadge', createdUserBadge);
  },

  /**
   * Creates a tutorial object for loggedin user
   */
  createFinishedTutorial: async ({ commit, rootState }, tutorial) => {
    const userRewardsDb = new UserRewardsDb(rootState.authentication.user.id);

    const createdFinishedTutorial = await userRewardsDb.create(tutorial);
    commit('addFinishedTutorial', createdFinishedTutorial);
  },

  /**
   * Creates or Updates a user's score
   */
  triggerScoreAction: ({ dispatch, state }, score) => {
    const checkIfUserHasScore = state.userScore.filter(function(elem) {
      if(elem.name === score.name) return elem;
      return null;
    });
    if (checkIfUserHasScore.length > 0) {
      const updateScore = JSON.parse(JSON.stringify(checkIfUserHasScore[0]));;
      updateScore.score += 1;
      dispatch('updateUserScore', updateScore)
    } else {
      dispatch('createUserScore', score)
    }
  },

}
