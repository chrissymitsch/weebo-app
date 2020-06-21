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
  import fire from "../../firebase/init";

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

          fire.collection("projects").doc(this.$route.params.id).onSnapshot(snap => {
            if (this.currentProject) {
              this.project = snap.data();
              console.log(this.currentProject)
              console.log(this.currentProject.updateTimestamp.seconds)
              console.log(snap.data())
              console.log(snap.data().updateTimestamp.seconds)
              if (snap.data().updateTimestamp.seconds > this.currentProject.updateTimestamp.seconds) {
                this.$toast.success('message string', {
                  // override the global option
                  position: 'top-right',
                  duration: 60000 // 1 minute
                });
              }
            }
          });
        } else {
          this.settingCurrentProject = false;
        }
      } else {
        this.$router.push('/projects')
      }
    }
  }
</script>
