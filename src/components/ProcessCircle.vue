<template>
  <z-view size="xl" style="border-width: 7px" slider :progress="go">
    <md-avatar class="md-avatar-icon md-large md-primary">
      <md-icon>group</md-icon>
    </md-avatar>
    <div slot="extension">
      <z-spot
              :angle="225"
              size="s"
              :distance="140"
              label="Analyse"
              label-pos="left"
              style="border-width: 7px"
              to-view="Phase1">
        <md-avatar :class="`md-avatar-icon ${getPhaseColor(0)}`">1</md-avatar>
      </z-spot>
      <z-spot
              :angle="315"
              size="s"
              :distance="140"
              label="Spezifikation"
              label-pos="right"
              style="border-width: 7px"
              to-view="Phase2">
        <md-avatar :class="`md-avatar-icon ${getPhaseColor(1)}`">2</md-avatar>
      </z-spot>
      <z-spot
              :angle="45"
              size="s"
              :distance="140"
              label="Modellierung"
              label-pos="right"
              style="border-width: 7px"
              to-view="Phase3">
        <md-avatar :class="`md-avatar-icon ${getPhaseColor(3)}`">3</md-avatar>
      </z-spot>
      <z-spot
              :angle="135"
              size="s"
              :distance="140"
              label="Evaluation"
              label-pos="left"
              style="border-width: 7px"
              to-view="Phase4">
        <md-avatar :class="`md-avatar-icon ${getPhaseColor(4)}`">4</md-avatar>
      </z-spot>
    </div>
  </z-view>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "ProcessCircle",
    computed: {
      ...mapState('projects', ['currentProject'])
    },
    data: () => ({
      go: 0,
      pause: false
    }),
    methods: {
      getPhaseColor(phase) {
        if ((phase === 0 && (!this.currentProject.phase || this.currentProject.phase === phase)) ||
                this.currentProject.phase === phase) {
          return "md-accent";
        }
        if (this.currentProject.phase > phase) {
          return "md-primary";
        }
        return "";
      }
    },
    mounted () {
      const vm = this;
      this.go = 1;
      let phase = 0;
      if (this.currentProject.phase > 0) {
        phase = this.currentProject.phase * 25;
      }
      setInterval(function () {
        if (vm.go >= phase) {
          vm.pause = true;
        } else if (vm.pause === false) {
          vm.go += 1;
        }
      }, 10)
    }
  };
</script>

<style lang="scss">
  .z-slider circle {
    transform: rotate(-135deg)!important;
  }
</style>