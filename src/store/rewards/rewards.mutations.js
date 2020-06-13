export default {
  /* Badges */
  setUserBadges: (state, badges) => (state.userBadges = badges),
  addUserBadge: (state, badge) => state.userBadges.push(badge),

}
