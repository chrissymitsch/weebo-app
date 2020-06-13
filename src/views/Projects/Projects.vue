<template>
  <div class="page-wrapper">
    <h1 class="title">Deine Projekte</h1>
    <project-list class="project-list"></project-list>
    <add-project v-if="networkOnLine"></add-project>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProjectList from '@/components/ProjectList'
import AddProject from '@/components/AddProject'

export default {
  components: { ProjectList, AddProject },
  computed: mapState('app', ['networkOnLine'])
}
</script>
