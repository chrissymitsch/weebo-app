<template>
  <div class="wrapper">
    <template v-if="refreshingApp">
      Neue Inhalte laden...
    </template>
    <template v-else>
      Neue Inhalte verfügbar, bitte
      <span class="refresh-btn" @click="$emit('refresh')">NEU LADEN</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    refreshingApp: Boolean
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  display: inline-block;
  border-radius: 4px;

  .refresh-btn {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
