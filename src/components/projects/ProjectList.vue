<template>
  <div>
    <p v-if="!finishedLoading" class="text-center">
      <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      Projekte werden geladen...
    </p>
    <p v-if="finishedLoading && (!userProjects || userProjects.length === 0)" class="text-center">
      Noch keine Projekte verknüpft.
    </p>

    <div class="project-list" v-if="finishedLoading && userProjects">
      <project-item
              v-for="(project, index) in userProjects"
              :key="project"
              :index="index"
              :is-project-deletion-pending="isProjectDeletionPending(project)"
              :is-project-unsubscription-pending="isProjectUnsubscriptionPending(project)"
              :disable-actions="!networkOnLine"
              :projectId="project"
              @deleteProject="deleteUserProject"
              @unsubscribeProject="unsubscribeUserProject"
      ></project-item>
      <add-project v-if="networkOnLine"></add-project>
    </div>
  </div>
</template>

<script>
import AddProject from '@/components/projects/AddProject'
import ProjectItem from '@/components/projects/ProjectItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { AddProject, ProjectItem },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapGetters('projects', ['isProjectDeletionPending', 'isProjectUnsubscriptionPending']),
    ...mapState('app', ['networkOnLine']),
    ...mapState('projects', ['userProjects'])
  },
  data: () => ( {
    projects: null,
    finishedLoading: false,
    rerenderProjectList: 0
  }),
  mounted() {
    this.$store.dispatch('projects/getProjects').finally(() => {
      this.finishedLoading = true;
    });
  },
  methods: {
    ...mapActions('projects', ['getProjects', 'deleteUserProject', 'unsubscribeUserProject'])
  }
}
</script>
