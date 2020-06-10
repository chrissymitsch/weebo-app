<template>
  <div class="project-detail  md-layout-row">
    <md-app>
      <md-app-toolbar class="md-primary">
        <router-link class="back-link" to="/projects">
          <md-button class="md-icon-button">
            <md-icon>keyboard_arrow_left</md-icon>
          </md-button>
        </router-link>
        <span class="md-title">
           {{ project.name }}
        </span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-list>
          <md-list-item>
            <md-icon>send</md-icon>
            <ShareNetwork
                  network="email"
                  :url="`https://weebo-b37d8/invitation/${project.id}`"
                  :title="`Einladung für Projekt ${project.name }!`"
                  :description="`Du hast eine Einladung für das Projekt ${project.name} erhalten. Klicke auf den Link oder kopiere https://weebo-b37d8/invitation/${project.id } in den Browser!`">
              <span class="md-list-item-text">Einladung verschicken</span>
            </ShareNetwork>
          </md-list-item>
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  methods: {
    getProjectLink() {
      return null;
    }
  },
  props: {
    project: Object
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, .12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.project-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
