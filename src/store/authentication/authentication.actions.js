import router from '@/router'
import { isNil } from 'lodash'
import { createNewUserFromFirebaseAuthUser } from '@/misc/helpers'
import UsersDB from '@/firebase/users-db'

export default {
  /**
   * Callback fired when user login
   */
  login: async ({ commit, dispatch }, firebaseAuthUser) => {
    const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid);

    const user = isNil(userFromFirebase)
      ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
      : userFromFirebase;

    commit('setUser', user);
    dispatch('rewards/getUserScore', user.id, { root: true });
    dispatch('rewards/getUserBadges', user.id, { root: true });
    dispatch('rewards/getFinishedTutorials', user.id, { root: true });
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit }) => {
    commit('setUser', null);

    const currentRouter = router.app.$route;
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push('/login')
    }
  },

  /**
   * Update a user from its id
   */
  updateUser: async ({ commit, state }, user) => {
    if (state.userUpdatePending) return;

    const userDb = new UsersDB();

    commit('setUserUpdatePending', true);
    await userDb.update(user);
    commit('setUser', user);
    commit('setUserUpdatePending', false)
  },
}
