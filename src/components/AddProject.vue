<template>
  <div class="project-action-bar">
    <input
      placeholder="project name..."
      class="project-name-input"
      type="text"
      :value="projectNameToCreate"
      @input="setProjectNameToCreate($event.target.value)"
      @keypress.enter="triggerAddProjectAction"
    />
    <div
      :class="{ disabled: projectCreationPending }"
      class="create-project-btn"
      @click="triggerAddProjectAction"
    >
      add project
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: mapState('projects', [
    'projectNameToCreate',
    'projectCreationPending'
  ]),
  methods: {
    ...mapMutations('projects', ['setProjectNameToCreate']),
    ...mapActions('projects', ['triggerAddProjectAction'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.project-action-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  .project-name-input {
    padding-left: 5px;
    height: 30px;
    width: 150px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: #2c3e50;
    border-radius: 3px;
  }

  .create-project-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    border-color: #2c3e50;

    &.disabled {
      pointer-events: none;
      background-color: #aaa;
    }

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
