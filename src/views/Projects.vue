<template>
  <div class="page-wrapper">
    <h1 class="projects-page-title">Projects page</h1>
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

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.projects-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.project-list {
  margin: 20px 0;
}
</style>
