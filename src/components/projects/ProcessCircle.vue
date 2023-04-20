<template>
  <z-view size="xl" style="border-width: 16px;" slider :progress="go">
    <md-avatar class="md-avatar-icon md-large md-primary">
      <md-icon>group</md-icon>
    </md-avatar>
    <div slot="extension">
      <z-spot
              :angle="225"
              size="s"
              :distance="120"
              label="Analyse"
              label-pos="top"
              :style="`border-width: 4px; border-color: ${getBorderColor(0)};`"
              :to-view="{name: 'Phase',
              params: {currentPhase: 0,}
              }">
        <md-tooltip>Analyse</md-tooltip>
        <md-avatar :class="`md-avatar-icon ${getPhaseColor(0)}`">1</md-avatar>
      </z-spot>
      <z-spot
              :angle="315"
              size="s"
              :distance="120"
              label="Spezifikation"
              label-pos="top"
              :style="`border-width: 4px; border-color: ${getBorderColor(1)};`"
              :to-view="{name: 'Phase',
              params: {currentPhase: 1,}
              }">
        <md-avatar :class="`md-avatar-icon ${getPhaseColor(1)}`">2</md-avatar>
      </z-spot>
      <z-spot
              :angle="45"
              size="s"
              :distance="120"
              label="Modellierung"
              label-pos="bottom"
              :style="`border-width: 4px; border-color: ${getBorderColor(2)};`"
              :to-view="{name: 'Phase',
              params: {currentPhase: 2,}
              }">
        <md-avatar :class="`md-avatar-icon ${getPhaseColor(2)}`">3</md-avatar>
      </z-spot>
      <z-spot
              :angle="135"
              size="s"
              :distance="120"
              label="Evaluation"
              label-pos="bottom"
              :style="`border-width: 4px; border-color: ${getBorderColor(3)};`"
              :to-view="{name: 'Phase',
              params: {currentPhase: 3,}
              }">
        <md-avatar :class="`md-avatar-icon ${getPhaseColor(3)}`">4</md-avatar>
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
      },
      getBorderColor(phase) {
        if (phase < this.currentProject.phase) {
          return "#4EBC57";
        }
        return "";
      }
    },
    mounted () {
      const vm = this;
      this.go = 1;
      let phase = 0;
      if (this.currentProject.phase > 0) {
        phase = (Number(this.currentProject.phase) * 25);
      }
      setInterval(function () {
        if (vm.go >= phase) {
          vm.pause = true;
        } else if (vm.pause === false) {
          vm.go += 1;
        }
      }, 10)
    },
    watch: {
      currentProject(newValue, oldValue) {
        if (newValue.phase !== oldValue.phase) {
          this.go = newValue.phase * 25
        }
      }
    }
  };
</script>

<style lang="scss">
  @import '@/theme/variables.scss';

  .z-slider circle {
    transform: rotate(-135deg)!important;
  }
</style>