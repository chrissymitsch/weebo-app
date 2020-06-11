<template>
  <div>
    <p v-if="userProjects === null" class="infos-label">
      <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      Projekte werden geladen...
    </p>
    <p v-if="userProjects && !userProjects.length" class="infos-label">
      Noch keine Projekte verknüpft.
    </p>

    <md-table v-if="userProjects && userProjects.length > 0">
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head class="md-xsmall-hide">Erstellt am</md-table-head>
        <md-table-head class="md-xsmall-hide">Teilnehmer</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>

      <project-item
              v-for="(project, index) in userProjects"
              :key="project.id"
              :index="index"
              :is-project-deletion-pending="isProjectDeletionPending(project.projectId)"
              :is-project-unsubscription-pending="isProjectUnsubscriptionPending(project.projectId)"
              :disable-actions="!networkOnLine"
              :data="project"
              @deleteProject="deleteUserProject"
              @unsubscribeProject="unsubscribeUserProject"
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
    ...mapGetters('projects', ['isProjectDeletionPending', 'isProjectUnsubscriptionPending']),
    ...mapState('projects', ['userProjects']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: mapActions('projects', ['deleteUserProject', 'unsubscribeUserProject'])
}
</script>
