<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="md-layout md-gutter md-alignment-center-center">
        <div class="md-layout-item">
          <div class="text-center"><img alt="logo" src="@/assets/img/weebo.svg" class="logo-weebo" /></div>
        </div>
        <div class="md-layout-item text-center">
          <p class="md-display-1">Human-Centered Design</p>
          <p class="md-caption">FÜR DEIN PROJEKT</p>
          <md-empty-state
                  md-description="Verwalte den Gestaltungsprozess deines Projekts und arbeite gemeinsam mit allen Stakeholdern am Projekterfolg!">
            <router-link to="/onboarding"><md-button class="button md-accent md-raised">Starte dein Projekt</md-button></router-link>
          </md-empty-state>
        </div>
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
  .md-layout {
    width: 80%;
    margin-bottom: 3rem;

    .logo-weebo {
      width: 100%;
      min-width: 200px;
      margin-bottom: 24px;
    }
  }
</style>