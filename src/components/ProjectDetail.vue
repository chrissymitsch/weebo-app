<template>
  <div class="project-detail md-layout-row">
    <md-app>
      <md-app-drawer md-permanent="full">
        <md-app-toolbar md-elevation="0" class="md-accent">
          <span class="md-title">
            <md-avatar class="md-avatar-icon md-primary">{{ project.name.charAt(0) }}</md-avatar>
           {{ project.name }}
          </span>
        </md-app-toolbar>
        <md-list>
          <router-link :to="{ name: 'project-dashboard', params: { project: project } }">
            <md-list-item>
              <md-icon>dashboard</md-icon>
              <span class="md-list-item-text">Dashboard</span>
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
                  :to="{ name: 'project-invitation', params: { project: project } }"
                  v-if="isCreator()">
            <md-list-item>
              <md-icon>settings</md-icon>
              <span class="md-list-item-text">Einstellungen</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <md-app-toolbar md-elevation="0" class="md-primary">
          <div class="md-toolbar-row">
            <router-link :to="{ name: 'project-dashboard', params: { project: project } }">
              <md-button class="md-icon-button md-primary">
                <md-icon class="navigation-icon">dashboard</md-icon>
                <md-tooltip md-direction="top">Dashboard</md-tooltip>
              </md-button>
            </router-link>
            <router-link :to="{ name: 'project-members', params: { project: project } }">
              <md-button class="md-icon-button">
                <md-icon class="navigation-icon">group</md-icon>
                <md-tooltip md-direction="top">Projektteilnehmer</md-tooltip>
              </md-button>
            </router-link>
            <router-link :to="{ name: 'project-tasks', params: { project: project } }">
              <md-button class="md-icon-button">
                <md-icon class="navigation-icon">playlist_add_check</md-icon>
                <md-tooltip md-direction="top">Aufgaben</md-tooltip>
              </md-button>
            </router-link>
            <router-link :to="{ name: 'project-creativemode', params: { project: project } }">
              <md-button class="md-icon-button">
                <md-icon class="navigation-icon">category</md-icon>
                <md-tooltip md-direction="top">Kreativmodus</md-tooltip>
              </md-button>
            </router-link>
            <router-link :to="{ name: 'project-schedules', params: { project: project } }">
              <md-button class="md-icon-button">
                <md-icon class="navigation-icon">calendar_today</md-icon>
                <md-tooltip md-direction="top">Terminplaner</md-tooltip>
              </md-button>
            </router-link>
            <router-link :to="{ name: 'project-schedules', params: { project: project } }">
              <md-button class="md-icon-button">
                <md-icon class="navigation-icon">history</md-icon>
                <md-tooltip md-direction="top">History</md-tooltip>
              </md-button>
            </router-link>
            <router-link :to="{ name: 'project-schedules', params: { project: project } }">
              <md-button class="md-icon-button">
                <md-icon class="navigation-icon">cloud</md-icon>
                <md-tooltip md-direction="top">Dateien und Dokumente</md-tooltip>
              </md-button>
            </router-link>
          </div>
        </md-app-toolbar>

        <div class="md-layout md-gutter with-bg">
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
    data: () => ({
      expandProcess: true
    }),
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
  min-width: 100%;
  border: 1px solid rgba(#000, .12);
}

.md-app-content {
  background: #eeeeee;
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

.navigation-icon {
  color: #17b2e8!important;
}

.project-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100%;
}

@mixin activatedLink() {
  margin-bottom: -2px;
  border: 2px solid $vue-color;
}

.router-link-active .md-button {
  @include activatedLink;
}

</style>
