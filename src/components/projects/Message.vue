<template>
  <div class="Message">
    <p class="md-caption text-center">{{format_date(message.createTimestamp)}}</p>
    <md-chip v-if="message && message.type==='system'">{{message.data.text}}</md-chip>
    <div v-if="message && message.type==='text'">{{message.data.author}}: {{message.data.text}}</div>
  </div>
</template>
<script>
  import moment from "moment";

  export default {
    props: {
      message: Object
    },
    methods: {
      format_date(value){
        if (value) {
          return moment(value).format('DD.MM.YYYY, HH:mm')
        }
        return '';
      },
    }
  }
</script>
<style scoped>
  .md-chip {
    white-space: break-spaces;
    height: auto;
  }
</style>