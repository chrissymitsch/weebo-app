<template>
  <div class="project-detail md-layout-row">
    <md-app>
      <md-app-drawer md-permanent="full">
        <md-app-toolbar class="md-primary">
          <span class="md-title">
            <md-avatar class="md-avatar-icon md-accent">{{ project.name.charAt(0) }}</md-avatar>
           {{ project.name }}
        </span>
        </md-app-toolbar>
        <md-list>
          <router-link :to="{ name: 'project-dashboard', params: { id: project.id } }">
            <md-list-item>
              <md-icon>dashboard</md-icon>
              <span class="md-list-item-text">Dashboard</span>
            </md-list-item>
          </router-link>
          <router-link :to="{ name: 'project-members', params: { project: project } }">
            <md-list-item>
              <md-icon>group</md-icon>
              <span class="md-list-item-text">Projektteilnehmer</span>
            </md-list-item>
          </router-link>
          <router-link
                  :to="{ name: 'project-invitation', params: { project: project } }"
                  v-if="isCreator()">
            <md-list-item>
              <md-icon>send</md-icon>
              <span class="md-list-item-text">Einladung verschicken</span>
            </md-list-item>
          </router-link>
          <router-link
                  :to="{ name: 'project-invitation', params: { project: project } }"
                  v-if="isCreator()">
            <md-list-item>
              <md-icon>settings</md-icon>
              <span class="md-list-item-text">Einstellungen</span>
            </md-list-item>
          </router-link>
          <router-link
                  :to="{ name: 'project-invitation', params: { project: project } }"
                  v-if="isCreator()">
            <md-list-item>
              <md-icon>forward</md-icon>
              <span class="md-list-item-text">Prozess</span>
            </md-list-item>
          </router-link>
          <router-link
                  :to="{ name: 'project-invitation', params: { project: project } }"
                  v-if="isCreator()">
            <md-list-item>
              <md-icon>playlist_add_check</md-icon>
              <span class="md-list-item-text">Aufgaben</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-layout md-gutter">
            <div class="md-layout-item">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    computed: {
      ...mapState('authentication', ['user']),
    },
    props: {
      project: Object
    },
    methods: {
      isCreator() {
        return this.project.creator === this.user.id;
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.md-app {
  width: 100%;
  min-height: 350px;
  border: 1px solid rgba(#000, .12);
}

.md-layout.md-gutter {
  margin: 0;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  border-right: 1px solid rgba(#000, .12);

  .md-title .md-avatar {
    margin: 0;
  }
}

.project-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
