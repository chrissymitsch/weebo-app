<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          Hallo
        </div>
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

export default {
  components: {ProjectList },
  computed: mapState('app', ['networkOnLine'])
}
</script>
