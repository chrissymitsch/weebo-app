<template>
  <div class="page-wrapper">
    <h1 class="title">Willkommen bei Weebo</h1>
    <img alt="logo-bento" src="@/assets/img/bento-starter.svg" />
    <md-empty-state
            md-label="Erstelle dein Projekt"
            md-description="Verwalte den Gestaltungsprozess deines Projekts und arbeite gemeinsam mit allen Stakeholdern am Projekterfolg!">
      <router-link to="/onboarding"><md-button class="button md-primary md-raised">Starte dein Projekt &rarr;</md-button></router-link>
    </md-empty-state>

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