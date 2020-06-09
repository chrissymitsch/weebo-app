<template>
  <div>
    <p v-if="projects === null" class="infos-label">Loading...</p>
    <p v-if="projects && !projects.length" class="infos-label">
      You don't have any project yet
    </p>
    <project-item
      v-for="(project, index) in projects"
      :key="project.id"
      class="project-row"
      :index="index"
      :is-project-deletion-pending="isProjectDeletionPending(project.id)"
      :disable-actions="!networkOnLine"
      :data="project"
      @deleteProject="deleteUserProject"
    ></project-item>
  </div>
</template>

<script>
import ProjectItem from '@/components/ProjectItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { ProjectItem },
  computed: {
    ...mapGetters('projects', ['isProjectDeletionPending']),
    ...mapState('projects', ['projects']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: mapActions('projects', ['deleteUserProject'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.project-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  justify-content: space-between;
}
</style>
