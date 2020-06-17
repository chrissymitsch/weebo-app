<template>
  <div class="page-wrapper">
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <p class="md-display-1">Deine Projekte</p>
        <project-list class="project-list"></project-list>
        <add-project v-if="networkOnLine"></add-project>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectList from '@/components/ProjectList'
import AddProject from '@/components/AddProject'

export default {
  components: {ProjectList, AddProject },
  computed: mapState('app', ['networkOnLine'])
}
</script>
