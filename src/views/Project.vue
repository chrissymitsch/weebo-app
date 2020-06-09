<template>
  <div class="page-wrapper">
    <project-detail
      v-if="currentProject"
      :project="currentProject"
    ></project-detail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectDetail from '@/components/ProjectDetail'

export default {
  components: { ProjectDetail },
  props: {
    id: String
  },
  computed: {
    ...mapGetters('projects', ['getProjectById']),
    currentProject() {
      return this.getProjectById(this.id)
    }
  }
}
</script>
