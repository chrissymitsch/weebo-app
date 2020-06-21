<template>
    <md-avatar :class="`md-accent ${size}`" v-if="finishedLoading && userForAvatar">
        <md-ripple>
            <img v-if="!userForAvatar.customAvatar && userForAvatar.photoURL" :src="userForAvatar.photoURL" alt="Avatar">
            <img v-if="userForAvatar.customAvatar" :src="userForAvatar.customAvatar" alt="Avatar">
        </md-ripple>
    </md-avatar>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('authentication', ['user']),
    },
      props: {
        size: String,
        userId: String
      },
      data: () => ({
          userForAvatar: null,
          finishedLoading: false
      }),
      created() {
        if (this.userId) {
            this.$store.dispatch('projects/getProjectMember', this.userId).then(data => {
                this.userForAvatar = data;
            }).finally(() => {
                this.finishedLoading = true;
            });
        } else {
            this.finishedLoading = true;
            this.userForAvatar = this.user;
        }
      }
  };
</script>
