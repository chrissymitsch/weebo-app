export default {
  setUser: (state, value) => (state.user = value),

  /* User update */
  setUserUpdatePending: (state, value) =>
      (state.userUpdatePending = value),
  addUserLoading: (state, userId) =>
      state.userLoading.push(userId),
  removeUserLoading: (state, userId) => {
    const index = state.userLoading.findIndex(user => user === userId);
    state.userLoading.splice(index, 1)
  },
}
