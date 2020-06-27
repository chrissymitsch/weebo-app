<template>
  <md-chip v-if="message && message.type==='system'">{{message.data.text}}</md-chip>
</template>
<script>
  export default {
    props: {
      message: Object
    },
  }
</script>