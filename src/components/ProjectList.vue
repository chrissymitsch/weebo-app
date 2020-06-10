<template>
  <div>
    <p v-if="projects === null" class="infos-label">
      <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
      Projekte werden geladen...
    </p>
    <p v-if="projects && !projects.length" class="infos-label">
      Noch keine Projekte verknüpft.
    </p>

    <md-table v-if="projects && projects.length > 0">
      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head class="md-xsmall-hide">Erstellt am</md-table-head>
        <md-table-head class="md-xsmall-hide">Teilnehmer</md-table-head>
        <md-table-head>Aktionen</md-table-head>
      </md-table-row>

      <project-item
              v-for="(project, index) in projects"
              :key="project.id"
              :index="index"
              :is-project-deletion-pending="isProjectDeletionPending(project.id)"
              :disable-actions="!networkOnLine"
              :data="project"
              @deleteProject="deleteUserProject"
      ></project-item>
    </md-table>
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
