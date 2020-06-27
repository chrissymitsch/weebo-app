<template>
  <div class="project-detail md-layout-row">
    <md-app>
      <md-app-drawer md-permanent="full">
        <md-app-toolbar md-elevation="0" class="md-accent">
          <span class="md-title">
          <md-avatar class="md-avatar-icon md-primary"><img :src="`https://avatars.dicebear.com/api/jdenticon/${project.id}.svg`" alt="" /></md-avatar>
           {{ project.name }}
          </span>
        </md-app-toolbar>
        <md-list>
          <router-link :to="{ name: 'project-dashboard' }">
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
                  :to="{ name: 'project-invitation' }"
                  v-if="isCreator()">
            <md-list-item>
              <md-icon>send</md-icon>
              <span class="md-list-item-text">Einladung verschicken</span>
            </md-list-item>
          </router-link>
          <md-list :md-expand-single="true">
            <md-list-item md-expand :md-expanded.sync="expandProcess">
              <md-icon>forward</md-icon>
              <span class="md-list-item-text">Prozesshistorie</span>

              <md-list slot="md-expand">
                <md-list-item class="md-inset">
                  <router-link :to="{ name: 'project-phase-1' }">1. Analyse</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link :to="{ name: 'project-phase-2' }">2. Spezifikation</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link :to="{ name: 'project-phase-3' }">3. Modellierung</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link :to="{ name: 'project-phase-4' }">4. Evaluation</router-link>
                </md-list-item>
              </md-list>
            </md-list-item>
          </md-list>
          <router-link
                  :to="{ name: 'project-settings' }"
                  v-if="isCreator()">
            <md-list-item>
              <md-icon>settings</md-icon>
              <span class="md-list-item-text">Einstellungen</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <md-app-toolbar md-elevation="0" class="phase-toolbar">
          <div class="md-toolbar-row">
            <p v-if="project.phase === 0 || !project.phase">
              <md-tooltip md-direction="top">Analysephase</md-tooltip>
              <md-avatar class="md-accent">1</md-avatar>
            </p>
            <p v-if="project.phase === 1">
              <md-tooltip md-direction="top">Spezifikationsphase</md-tooltip>
              <md-avatar class="md-accent">2</md-avatar>
            </p>
            <p v-if="project.phase === 2">
              <md-tooltip md-direction="top">Modellierungsphase</md-tooltip>
              <md-avatar class="md-accent">3</md-avatar>
            </p>
            <p v-if="project.phase === 3">
              <md-tooltip md-direction="top">Evaluationsphase</md-tooltip>
              <md-avatar class="md-accent">4</md-avatar>
            </p>
            <p v-if="project.phase === 4">
              <md-tooltip md-direction="top">Softwareeinführung</md-tooltip>
              <md-avatar class="md-accent">Endgame</md-avatar>
            </p>

            <router-link :to="{ name: 'project-tasks', params: { project: project } }">
              <md-button class="md-icon-button md-primary">
                <md-icon class="navigation-icon">playlist_add_check</md-icon>
                <md-tooltip md-direction="top">Aufgaben</md-tooltip>
              </md-button>
            </router-link>
            <router-link v-if="project.phase === 1" :to="{ name: 'project-personas', params: { project: project } }">
                <md-button class="md-icon-button md-primary">
                  <md-badge class="md-primary" md-content="neu">
                    <md-icon class="navigation-icon">account_box</md-icon>
                  </md-badge>
                  <md-tooltip md-direction="top">Personas und Szenarien</md-tooltip>
                </md-button>
            </router-link>
            <router-link :to="{ name: 'project-cloud', params: { project: project } }">
              <md-button class="md-icon-button md-primary">
                <md-icon class="navigation-icon">cloud_upload</md-icon>
                <md-tooltip md-direction="top">Dateien und Dokumente</md-tooltip>
              </md-button>
            </router-link>
            <router-link :to="{ name: 'project-discussion', params: { project: project } }">
              <md-button class="md-icon-button md-primary">
                <md-icon class="navigation-icon">message</md-icon>
                <md-tooltip md-direction="top">Diskussion</md-tooltip>
              </md-button>
            </router-link>
            <router-link v-if="project.level && project.level > 0" :to="{ name: 'project-creativemode', params: { project: project } }">
              <md-button class="md-icon-button md-primary">
                <md-icon class="navigation-icon">category</md-icon>
                <md-tooltip md-direction="top">Kreativmodus</md-tooltip>
              </md-button>
            </router-link>
            <router-link :to="{ name: 'project-schedules', params: { project: project } }">
              <md-button class="md-icon-button md-primary">
                <md-icon class="navigation-icon">insert_invitation</md-icon>
                <md-tooltip md-direction="top">Terminplaner</md-tooltip>
              </md-button>
            </router-link>
          </div>
        </md-app-toolbar>

        <div class="md-layout md-gutter with-bg">
          <div class="md-layout-item md-layout md-gutter">
            <div class="md-layout-item project-details-wrapper">
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
  background-color: $accent-color;
  color: #ffffff;

  .md-title .md-avatar {
    margin: 0;
  }

  .md-list {
    background-color: $accent-color;
    color: #ffffff;

    .md-list-item-text, .md-icon, a {
      color: #ffffff!important;
    }

    @mixin activatedLink() {
      margin-bottom: -2px;
      border-bottom: 2px solid $vue-color;
    }

    .router-link-active span {
      @include activatedLink;
    }
  }
}

.project-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100%;
}

.md-app-toolbar.phase-toolbar {
  background-color: #CFD2D4;

  .md-toolbar-row {
    justify-content: space-between;
  }

  @mixin activatedIconLink() {
    color: $accent-color;
  }

  .router-link-active .md-button {
    @include activatedIconLink;
  }
}

.router-link-active .md-button .md-icon {
  color: $accent-color;
}

</style>
