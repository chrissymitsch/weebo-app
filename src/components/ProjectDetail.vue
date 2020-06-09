<template>
  <div class="project-detail">
    <h1>{{ project.name }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    project: Object
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.project-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
