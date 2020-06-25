<template>
  <div class="Project">
    <div class="main-wrapper" v-if="settingCurrentProject">
      <div class="page-wrapper">
        <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
        Projekt wird geladen...
      </div>
    </div>
    <div class="main-wrapper" v-if="!settingCurrentProject && !project">
      <div class="page-wrapper">
        Du bist nicht Teilnehmer dieses Projekts. Warte auf den Einladungslink!
      </div>
    </div>
    <div class="page-wrapper">
      <project-detail
        v-if="!settingCurrentProject && project"
        :project="project"
      ></project-detail>
     </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import ProjectDetail from '@/components/projects/ProjectDetail'

  export default {
    components: { ProjectDetail },
    computed: {
      ...mapActions('projects', ['getProjectById']),
      ...mapState('projects', ['currentProject', 'userProjects'])
    },
    data: () => ({
      project: null,
      settingCurrentProject: true,
    }),
    mounted() {
      if (this.userProjects) {
        const projectId = this.$route.params.id;
        if (this.userProjects.includes(projectId)) {
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
