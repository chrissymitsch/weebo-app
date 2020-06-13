<template>
  <div class="page-wrapper">
    <project-detail
      v-if="project"
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
    project: null
  }),
  created() {
    this.$store.dispatch('projects/getProjectById', this.$route.params.id).then(() => {
      this.project = this.currentProject;
    });
    fire.collection("projects").doc(this.$route.params.id).onSnapshot(snap => {
      this.project = snap.data();
    });

  }
}
</script>
