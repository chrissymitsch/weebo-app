<template>
  <div class="Message">
    <p class="md-caption">{{format_date(message.createTimestamp)}}</p>
    <md-chip v-if="message && message.type==='system'"><i>{{message.data.text}}</i></md-chip>
    <div v-if="message && message.type==='text'" class="user-message">
      <avatar :user-id="message.author"></avatar>
      <div class="user-message-text">
        {{message.data.text}}
      </div>
    </div>
    <div v-if="message && message.type==='emoji'" class="user-message">
      <avatar :user-id="message.author"></avatar>
      <div class="user-message-text user-message-text-emoji">
        {{message.data.emoji}}
      </div>
    </div>
  </div>
</template>
<script>
  import moment from "moment";
  import Avatar from "../users/Avatar";

  export default {
    components: {Avatar},
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
<style lang="scss" scoped>
  .md-chip {
    white-space: break-spaces;
    height: auto;
    line-height: inherit;
    padding: 4px 16px 4px 16px;
  }

  .user-message {
    display: flex;
    justify-content: flex-start;
    align-content: start;

    .md-avatar {
      padding: 0;
      margin: 0 16px 0 0;
    }

    .user-message-text {
      position: relative;
      background: #EAEAEA;
      border-radius: .4em;
      padding: 8px;
      min-width: 50px;
    }

    .user-message-text.user-message-text-emoji {
      font-size: 20px;
    }
    .user-message-text:after {
      content: '';
      position: absolute;
      left: 0;
      top: 12px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-right-color: #EAEAEA;
      border-left: 0;
      margin-left: -8px;
    }
  }
</style>