<template>
  <div v-if="$route.params.id && currentProject">
    <beautiful-chat
            :participants="participants"
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
          {{ currentProject.name }}-Gruppenchat
        </div>
      </template>
      <template v-slot:user-avatar="{ message }">
        <avatar :user-id="message.author"></avatar>
      </template>
      <template v-slot:text-message-body="{ message }">
        {{message.data.text}}
      </template>
    </beautiful-chat>
    <md-badge class="md-primary" v-if="!isChatOpen && newMessagesCount > 0" :md-content="newMessagesCount">
    </md-badge>
  </div>
</template>

<script>
  import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
  import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
  import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
  import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'
  import {mapActions, mapState} from "vuex";
  import Avatar from "../users/Avatar";
  import fire from "../../firebase/init";

  export default {
    name: 'app',
    components: {Avatar},
    computed: {
      ...mapState('authentication', ['user']),
      ...mapState('projects', ['currentProject', 'projectMembers']),
      ...mapState('messages', ['messages'])
    },
    data() {
      return {
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
        participants: [], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
        messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
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
        alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
        messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
        finishedLoading: false,
      }
    },
    methods: {
      ...mapActions('messages', ['createMessage']),
      sendMessage(text) {
        if (text.length > 0) {
          this.onMessageWasSent({author: 'support', type: 'text', data: {text}})
        }
      },
      onMessageWasSent(message) {
        // called when the user sends a message
        this.messageList = [...this.messageList, message];
        message.projectId = this.currentProject.id;
        message.author = this.user.id;
        this.$store.dispatch('messages/createMessage', message).then(() => {
          console.log("messageSaved");
        });
      },
      openChat() {
        // called when the user clicks on the fab button to open the chat
        this.isChatOpen = true;
        this.newMessagesCount = 0;
      },
      closeChat() {
        // called when the user clicks on the botton to close the chat
        this.isChatOpen = false;
        this.newMessagesCount = 0;
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
      },
      sortMessageList(list) {
        function compare(a, b) {
          if (a.createTimestamp < b.createTimestamp)
            return -1;
          if (a.createTimestamp > b.createTimestamp)
            return 1;
          return 0;
        }
        return list.sort(compare);
      },
      getAllMessages() {
        if (this.currentProject) {
          this.$store.dispatch('messages/getMessages', this.currentProject.id).then(() => {
            const messageToSort = JSON.parse(JSON.stringify(this.messages));
            this.messageList = this.sortMessageList(messageToSort);
          }).finally(() => {
            this.finishedLoading = true;
          });
        }
      }
    },
    watch: {
      currentProject(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.getAllMessages();

          if (this.currentProject) {
            fire.collection("projects").doc(this.currentProject.id).onSnapshot(() => {
              this.newMessagesCount += 1;
              this.getAllMessages();
            });
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/theme/variables.scss';

  .md-badge {
    position: fixed;
    right: 22px;
    bottom: 66px;
    z-index: 100;
  }

  .sc-launcher, .sc-chat-window {
    z-index: 99;
  }
  .sc-chat-window {
    border: 1px solid rgba(#000, .12);

    .md-avatar {
      margin: 0 8px 0 0;
    }

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