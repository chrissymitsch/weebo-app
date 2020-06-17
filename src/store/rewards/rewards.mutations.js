export default {
  /* Badges */
  setUserBadges: (state, badges) => (state.userBadges = badges),
  addUserBadge: (state, badge) => state.userBadges.push(badge),

  /* Tutorials */
  setFinishedTutorials: (state, tutorial) => (state.tutorials = tutorial),
  addFinishedTutorial: (state, tutorial) => state.tutorials.push(tutorial),

}
