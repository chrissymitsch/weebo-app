<template>
  <div>
    <p v-if="userProjects === null" class="text-center">
      <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      Projekte werden geladen...
    </p>
    <p v-if="userProjects && !userProjects.length" class="text-center">
      Noch keine Projekte verknüpft.
    </p>

    <div class="project-list">
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
    </div>
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
