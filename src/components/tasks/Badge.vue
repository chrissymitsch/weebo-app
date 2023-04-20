<template>
  <md-chip class="md-primary" :style="`background-color: ${color};`"><slot></slot></md-chip>
</template>
<script>
  export default {
    props: {
      color: {
        type: String,
        default: "teal"
      }
    }
  };
</script>
