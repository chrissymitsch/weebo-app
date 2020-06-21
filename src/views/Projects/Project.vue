<template>
  <div class="page-wrapper">
    <p v-if="settingCurrentProject">
      <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
      Projekt wird geladen...
    </p>
    <project-detail
      v-if="!settingCurrentProject && project"
      :project="project"
    ></project-detail>
    <p v-if="!settingCurrentProject && !project">Du bist nicht Teilnehmer dieses Projekts. Warte auf den Einladungslink!</p>
  </div>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  import ProjectDetail from '@/components/projects/ProjectDetail'

  export default {

    components: { ProjectDetail },
    computed: {
      ...mapActions('projects', ['getProjectById']),
      ...mapState('projects', ['currentProject', 'userProjects']),
      ...mapMutations('projects', ['setCurrentProject'])
    },
    data: () => ({
      project: null,
      settingCurrentProject: true,
    }),
    created() {
      if (this.userProjects) {
        const projectId = this.$route.params.id;
        const checkIfUserHasProject = this.userProjects.filter(function (elem) {
          if (elem.projectId === projectId) return elem;
          return null;
        });
        if (checkIfUserHasProject.length > 0) {
          this.$store.dispatch('projects/getProjectById', projectId).then(() => {
            this.project = this.currentProject;
          }).finally(() => this.settingCurrentProject = false);
        } else {
          this.settingCurrentProject = false;
        }
      } else {
        this.$router.push('/projects')
      }
    }
  }
</script>
