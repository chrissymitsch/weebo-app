<template>
  <div class="page-wrapper">
    <h1 class="login-page-title">Anmelden</h1>

    <!-- Loader -->
    <h1 class="loading-title" v-show="user === undefined" data-test="loader">
      <md-progress-spinner class="md-accent" :md-diameter="20" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
      Anmeldung läuft...
    </h1>

    <!-- Offline instruction -->
    <div v-show="!networkOnLine" data-test="offline-instruction">
      Bitte prüfe deine Internetverbindung. Anmelden ist offline nicht möglich.
    </div>

    <p v-if="loginError">{{ loginError }}</p>
    <!-- Auth UI -->
    <div
      v-show="user !== undefined && !user && networkOnLine"
      data-test="login-btn"
      class="login-btn"
      @click="login"
    >
      <img src="../assets/img/g-logo.png" width="23" />
      Mit Google anmelden
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { isNil } from 'lodash'
import firebase from 'firebase/app'
import { desktop as isDekstop } from 'is_js'

export default {
  data: () => ({ loginError: null }),
  head() {
    return {
      title: {
        inner: 'Login'
      },
      meta: [
        {
          name: 'description',
          content: `Sign in or sign up to ${this.appTitle}`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl = isNil(this.$route.query.redirectUrl)
            ? '/projects'
            : this.$route.query.redirectUrl;
          this.$router.push(redirectUrl)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('authentication', ['setUser']),
    async login() {
      this.loginError = null;
      const provider = new firebase.auth.GoogleAuthProvider();
      this.setUser(undefined);

      try {
        // Firebase signin with popup is faster than redirect
        // but we can't use it on mobile because it's not well supported
        // when app is running as standalone on ios & android
        // eslint-disable-next-line no-unused-expressions
        isDekstop()
          ? await firebase.auth().signInWithPopup(provider)
          : await firebase.auth().signInWithRedirect(provider)
      } catch (err) {
        this.loginError = err;
        this.setUser(null)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .login-page-title {
    text-align: center;
  }

  .login-btn {
    margin-top: 20px;
    cursor: pointer;
    padding: 5px 20px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    border-color: #2c3e50;

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
