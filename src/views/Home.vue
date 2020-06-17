<template>
  <div class="page-wrapper">
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <p class="md-display-1">Willkommen bei Weebo</p>
        <div class="align-center"><img alt="logo-bento" src="@/assets/img/bento-starter.svg" /></div>
        <md-empty-state
                md-label="Erstelle dein Projekt"
                md-description="Verwalte den Gestaltungsprozess deines Projekts und arbeite gemeinsam mit allen Stakeholdern am Projekterfolg!">
          <router-link to="/onboarding"><md-button class="button md-primary md-raised">Starte dein Projekt &rarr;</md-button></router-link>
        </md-empty-state>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped>
  .page-wrapper {
    background: url("~@/assets/img/1800w/background2.jpg") fixed;
    background-size: 100% 100%;
  }
</style>