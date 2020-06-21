<template>
  <div v-if="$route.params.id && project">
    <beautiful-chat
            :participants="participants"
            :titleImageUrl="titleImageUrl"
            :onMessageWasSent="onMessageWasSent"
            :messageList="messageList"
            :newMessagesCount="newMessagesCount"
            :isOpen="isChatOpen"
            :close="closeChat"
            :icons="icons"
            :open="openChat"
            :showEmoji="true"
            :showFile="false"
            :showTypingIndicator="showTypingIndicator"
            :showLauncher="true"
            :showCloseButton="true"
            :colors="colors"
            :alwaysScrollToBottom="alwaysScrollToBottom"
            :messageStyling="messageStyling"
            @onType="handleOnType"
            @edit="editMessage">
      <template v-slot:header>
        <div class="sc-header--title">
          {{ project.name }}-Gruppenchat
        </div>
      </template>
    </beautiful-chat>
  </div>
</template>

<script>
  import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
  import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
  import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
  import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'
  import {mapState} from "vuex";

  export default {
    name: 'app',
    computed: {
      ...mapState('projects', ['currentProject'])
    },
    data() {
      return {
        project: null,
        icons: {
          open: {
            img: OpenIcon,
            name: 'default',
          },
          close: {
            img: CloseIcon,
            name: 'default',
          },
          file: {
            img: FileIcon,
            name: 'default',
          },
          closeSvg: {
            img: CloseIconSvg,
            name: 'default',
          },
        },
        participants: [
          {
            id: 'user1',
            name: 'Matteo',
            imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
          },
          {
            id: 'user2',
            name: 'Support',
            imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
          }
        ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
        titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
        messageList: [
          {type: 'text', author: `me`, data: {text: `Say yes!`}},
          {type: 'text', author: `user1`, data: {text: `No.`}}
        ], // the list of the messages to show, can be paginated and adjusted dynamically
        newMessagesCount: 0,
        isChatOpen: false, // to determine whether the chat window should be open or closed
        showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
        colors: {
          header: {
            bg: '#F49463',
            text: '#ffffff'
          },
          launcher: {
            bg: '#F49463'
          },
          messageList: {
            bg: '#ffffff'
          },
          sentMessage: {
            bg: '#F49463',
            text: '#ffffff'
          },
          receivedMessage: {
            bg: '#eaeaea',
            text: '#222222'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        }, // specifies the color scheme for the component
        alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
        messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      }
    },
    methods: {
      sendMessage(text) {
        if (text.length > 0) {
          this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1;
          this.onMessageWasSent({author: 'support', type: 'text', data: {text}})
        }
      },
      onMessageWasSent(message) {
        // called when the user sends a message
        this.messageList = [...this.messageList, message]
      },
      openChat() {
        // called when the user clicks on the fab button to open the chat
        this.isChatOpen = true;
        this.newMessagesCount = 0
      },
      closeChat() {
        // called when the user clicks on the botton to close the chat
        this.isChatOpen = false
      },
      handleScrollToTop() {
        // called when the user scrolls message list to top
        // leverage pagination for loading another page of messages
      },
      handleOnType() {
        console.log('Emit typing event')
      },
      editMessage(message) {
        const msg = this.messageList.find(m => m.id === message.id);
        msg.isEdited = true;
        msg.data.text = message.data.text;
      }
    },
    watch: {
      currentProject(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.project = newValue;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/theme/variables.scss';

  .sc-launcher, .sc-chat-window {
    z-index: 100;
  }
  .sc-chat-window {
    border: 1px solid rgba(#000, .12);

    .sc-message--text-content {
      margin: 0;
    }

    .sc-message--emoji {
      font-size: 30px;
      margin: 8px;
    }

    .sc-header {
      min-height: 54px;
      padding: 0;
    }
  }
</style>