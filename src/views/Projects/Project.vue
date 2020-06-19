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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ProjectDetail from '@/components/ProjectDetail'

import fire from "../../firebase/init";

export default {

  components: { ProjectDetail },
  computed: {
    ...mapActions('projects', ['getProjectById', 'snapshotProject']),
    ...mapState('projects', ['currentProject'])
  },
  data: () => ({
    project: null,
    settingCurrentProject: true
  }),
  created() {
    this.$store.dispatch('projects/getProjectById', this.$route.params.id).then(() => {
      this.project = this.currentProject;
    }).finally(() => this.settingCurrentProject = false);

    fire.collection("projects").doc(this.$route.params.id).onSnapshot(snap => {
      this.project = snap.data();
    });

  }
}
</script>
