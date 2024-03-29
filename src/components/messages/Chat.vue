<template>
  <div v-if="isMounted && $route.params.id && currentProject && !currentProject.finished && ((currentProject.phase && currentProject.phase !== 0) || (currentProject.level > 0))">
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
            v-if="finishedLoading">
      <template v-slot:header>
        <div class="sc-header--title">
          {{ currentProject.name }}-Gruppenchat
        </div>
      </template>
      <template v-slot:user-avatar="{ message }">
        <md-avatar :class="`md-accent`" v-if="message.author">
          <md-ripple>
            <img v-if="!message.customAvatar && message.photoURL" :src="message.photoURL" alt="Avatar">
            <img v-if="message.customAvatar" :src="message.customAvatar" alt="Avatar">
            <md-tooltip md-direction="top">{{message.authorName}}</md-tooltip>
          </md-ripple>
        </md-avatar>
      </template>
      <template v-slot:text-message-body="{ message }">
        {{message.data.text}}
      </template>
    </beautiful-chat>
<!--    <md-badge class="md-primary" v-if="!isChatOpen && newMessagesCount > 0">-->
<!--    </md-badge>-->
  </div>
</template>

<script>
  import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
  import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
  import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
  import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'
  import {mapActions, mapState} from "vuex";
  import {fire} from "../../firebase/init";

  export default {
    name: 'Chat',
    computed: {
      ...mapState('authentication', ['user']),
      ...mapState('projects', ['currentProject', 'projectMembers']),
      ...mapState('messages', ['messages'])
    },
    data() {
      return {
        isMounted: false,
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
        newestMessages: [],
        limit: 20,
      }
    },
    methods: {
      ...mapActions('messages', ['createMessage']),
      onMessageWasSent(message) {
        // called when the user sends a message
        this.messageList = [...this.messageList, message];
        message.projectId = this.currentProject.id;
        message.author = this.user.id;
        message.authorName = this.user.displayName;
        message.customAvatar = this.user.customAvatar;
        message.photoURL = this.user.photoURL;
        this.createMessage(message);
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
      filterMessageList(list) {
        return list.filter(message =>
                message.type === "text" ||
                message.type === "emoji" ||
                message.type === "system");
      },
      getAllMessages(newestMessage) {
        if (this.currentProject) {
          this.$store.dispatch('messages/getMessages', this.currentProject.id).then(() => {
            const messageToSort = JSON.parse(JSON.stringify(this.messages));
            const list = this.sortMessageList(this.filterMessageList(messageToSort));
            this.messageList = list.filter((message, index) => index >= list.length - this.limit);
          }).finally(() => {
            if (newestMessage && this.messageList.filter(
                    message => message.id === newestMessage &&
                            (message.type === 'text' || message.type === 'emoji' || message.type === 'system')).length > 0) {
              this.newMessagesCount += 1;
              const indexOfNewestMessage = this.messageList.findIndex(message => message.id === newestMessage);
              if (this.messageList[indexOfNewestMessage].type === "system" &&
                      this.messageList[indexOfNewestMessage].creator !== this.user.id) {
                this.$toast.info(`Das Projekt ${this.currentProject.name} wurde aktualisiert. Bitte neu laden.`, {
                  position: 'top-right',
                  duration: 60000 // 1 minute
                });
              }
            }
            this.finishedLoading = true;
          });
        }
      }
    },
    mounted() {
      this.isMounted = true;
    },
    watch: {
      currentProject(newValue, oldValue) {
        if (this.currentProject && newValue !== oldValue) {
          this.newestMessages.push(newValue.newMessage);
          this.getAllMessages();

          fire.collection("projects").doc(this.currentProject.id).onSnapshot(data => {
            if (!this.newestMessages.includes(data.data().newMessage)) {
              this.newestMessages.push(data.data().newMessage);
              this.getAllMessages(data.data().newMessage);
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/theme/variables.scss';

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

    .sc-emoji-picker {
      z-index: 9999;
    }

    .sc-header {
      min-height: 54px;
      padding: 0;
    }
  }
</style>