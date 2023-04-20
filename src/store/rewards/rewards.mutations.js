export default {
  /* Score */
  setUserScore: (state, score) => (state.userScore = score),
  addUserScore: (state, score) => state.userScore.push(score),
  updateUserScore: (state, updatedScore) => {
    const index = state.userScore.findIndex(score => score.id === updatedScore.id);
    state.userScore[index] = updatedScore;
  },

  /* Badges */
  setUserBadges: (state, badges) => (state.userBadges = badges),
  addUserBadge: (state, badge) => state.userBadges.push(badge),

  /* Tutorials */
  setFinishedTutorials: (state, tutorial) => (state.tutorials = tutorial),
  addFinishedTutorial: (state, tutorial) => state.tutorials.push(tutorial),

}
