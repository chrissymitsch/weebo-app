<template>
  <div class="project-detail md-layout-row">
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
          <router-link :to="{ name: 'project-invitation', params: { id: project.id } }">
            <md-list-item>
              <md-icon>send</md-icon>
              <span class="md-list-item-text">Einladung verschicken</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error quibusdam, non molestias et! Earum magnam, similique, quo recusandae placeat dicta asperiores modi sint ea repudiandae maxime? Quae non explicabo, neque.
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
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
