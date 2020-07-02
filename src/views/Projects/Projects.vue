<template>
  <div class="main-wrapper">
    <tutorial-modal tutorialName="Projects">
      <div class="md-display-1 text-center">Alle deine Projekte auf einem Blick</div>
      <p class="description"><img src="@/assets/img/welt.png" width="200" /></p>
      <p class="description md-body-2">
        Willst du ein Projekt anlegen oder einen Überblick über deine abonnierten Projekte bekommen,
        dann bist du hier genau richtig. Du kannst angelegte Projekte auch löschen, bzw. abonnierte Projekte kündigen.
      </p>
    </tutorial-modal>

    <div class="page-wrapper">
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          Hallo
        </div>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <p class="md-display-1">Deine Projekte</p>
          <project-list class="project-list"></project-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectList from '@/components/projects/ProjectList'
import TutorialModal from "../../components/rewards/TutorialModal";

export default {
  components: {TutorialModal, ProjectList },
  computed: mapState('app', ['networkOnLine'])
}
</script>
