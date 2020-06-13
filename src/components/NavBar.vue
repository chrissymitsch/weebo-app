<template>
  <header class="navbar" :class="{ offline: !networkOnLine }">
    <md-app>
      <md-app-toolbar>
        <md-button class="md-icon-button md-small-size-0" @click="menuVisible = true">
          <md-icon>menu</md-icon>
        </md-button>
        <router-link to="/home">
          <img alt="logo-bento" class="logo" src="@/assets/img/bento-starter.svg" />
          <span class="site-name title-desktop md-xsmall-hide">{{ appTitle }}</span>
          <span class="site-name title-mobile md-xsmall-size">{{ appShortTitle }}</span>
        </router-link>
        <div class="links md-toolbar-section-end">
          <nav class="nav-links">
            <div class="nav-item">
              <router-link to="/projects">Projekte</router-link>
            </div>
            <div v-if="!isUserLoggedIn && networkOnLine" class="nav-item">
              <router-link to="/login">Anmelden</router-link>
            </div>
            <div
                    v-if="isUserLoggedIn && networkOnLine"
                    class="nav-item logout-item"
                    @click="logout"
            >
              <a class="logout-link">Ausloggen</a>
            </div>
            <div v-if="!networkOnLine" class="nav-item offline-label">Offline</div>

            <md-avatar v-if="isUserLoggedIn && networkOnLine" class="md-avatar-icon md-accent">
              {{ avatarInitials() }}
            </md-avatar>
          </nav>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-swipeable>
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="menuVisible = false">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
    <md-card class="md-primary">
      <md-card-content>
        &copy; Doofenshmirtz Evil Incorporated
      </md-card-content>
    </md-card>
  </header>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle'])
  },
  data: () => ({
    menuVisible: false,
  }),
  methods: {
    async logout() {
      await firebase.auth().signOut()
    },
    avatarInitials() {
      const initials = this.user.displayName.split(" ");
      return initials[0].charAt(0).toUpperCase() + initials[1].charAt(0).toUpperCase();
    }
  }
}
</script>