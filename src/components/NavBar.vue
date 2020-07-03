<template>
  <header class="navbar" :class="{ offline: !networkOnLine }">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button v-if="currentProject && isUserLoggedIn && user" class="md-icon-button show-for-small" @click="menuVisible = true">
          <md-icon class="navigation-icon">menu</md-icon>
        </md-button>
        <router-link to="/home">
          <span class="md-title title-desktop md-xsmall-hide">{{ appTitle }}</span>
          <span class="md-title title-mobile md-xsmall-size">{{ appShortTitle }}</span>
        </router-link>
        <div class="links md-toolbar-section-end">
          <nav class="nav-links">
            <div class="nav-item" v-if="isUserLoggedIn">
              <router-link to="/projects">Projekte</router-link>
            </div>
            <div v-if="!isUserLoggedIn && networkOnLine" class="nav-item">
              <router-link to="/login">Anmelden</router-link>
            </div>

            <div v-if="!networkOnLine" class="nav-item offline-label">Offline</div>

            <md-menu v-if="isUserLoggedIn && networkOnLine" md-size="medium" md-align-trigger>
              <avatar md-menu-trigger></avatar>

              <md-menu-content md-size="auto">
                <md-menu-item><h3>{{ user.displayName }}</h3></md-menu-item>
                <md-menu-item @click="openProfile()">Profil</md-menu-item>
                <md-menu-item
                          class="nav-item logout-item"
                          @click="logout"
                >
                  <a class="logout-link">Ausloggen</a>
                </md-menu-item>
              </md-menu-content>
            </md-menu>

          </nav>
        </div>
      </md-app-toolbar>

      <md-app-drawer v-if="currentProject && isUserLoggedIn && user" :md-active.sync="menuVisible" md-swipeable>
        <md-app-toolbar md-elevation="0" class="md-accent">
          <span class="md-title" v-if="currentProject.name">
            <md-avatar class="md-avatar-icon md-primary">{{ currentProject.name.charAt(0) }}</md-avatar>
           {{ currentProject.name }}
          </span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="menuVisible = false">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-app-toolbar>
        <md-list>
          <router-link :to="{ name: 'project-dashboard' }">
            <md-list-item @click="menuVisible = false">
              <md-icon>dashboard</md-icon>
              <span class="md-list-item-text">Dashboard</span>
            </md-list-item>
          </router-link>
          <router-link :to="{ name: 'project-members', params: { project: currentProject } }">
            <md-list-item @click="menuVisible = false">
              <md-icon>group</md-icon>
              <span class="md-list-item-text">Projektteilnehmer</span>
            </md-list-item>
          </router-link>
          <router-link
                  :to="{ name: 'project-invitation' }"
                  v-if="isAdmin()">
            <md-list-item @click="menuVisible = false">
              <md-icon>send</md-icon>
              <span class="md-list-item-text">Einladung verschicken</span>
            </md-list-item>
          </router-link>
          <md-list :md-expand-single="true">
            <md-list-item md-expand :md-expanded.sync="expandProcess">
              <md-icon>forward</md-icon>
              <span class="md-list-item-text">Prozess</span>

              <md-list slot="md-expand">
                <md-list-item class="md-inset">1. Analyse</md-list-item>
                <md-list-item class="md-inset">2. Spezifikation</md-list-item>
                <md-list-item class="md-inset">3. Modellierung</md-list-item>
                <md-list-item class="md-inset">4. Evaluation</md-list-item>
              </md-list>
            </md-list-item>
          </md-list>
          <router-link
                  :to="{ name: 'project-settings' }"
                  v-if="isAdmin()">
            <md-list-item @click="menuVisible = false">
              <md-icon>settings</md-icon>
              <span class="md-list-item-text">Einstellungen</span>
            </md-list-item>
          </router-link>
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
import Avatar from '@/components/users/Avatar'

export default {
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
    ...mapState('projects', ['currentProject'])
  },
  components: {Avatar},
  data: () => ({
    menuVisible: false,
    expandProcess: false
  }),
  methods: {
    async logout() {
      await firebase.auth().signOut()
    },
    openProfile() {
      this.$router.push("/profile")
    },
    isAdmin() {
      return this.currentProject.creator === this.user.id || this.user.role === "admin";
    }
  }
}
</script>