<template>
    <a v-if="finishedLoading && userForAvatar" @click="redirectToProfile()">
        <md-avatar :class="`md-accent ${size}`">
            <md-ripple>
                <img v-if="!userForAvatar.customAvatar && userForAvatar.photoURL" :src="userForAvatar.photoURL" alt="Avatar">
                <img v-if="userForAvatar.customAvatar" :src="userForAvatar.customAvatar" alt="Avatar">
                <md-tooltip md-direction="top">{{userForAvatar.displayName}}</md-tooltip>
            </md-ripple>
        </md-avatar>
    </a>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('authentication', ['user']),
    },
      props: {
        disableClickToProfile: Boolean,
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
            this.userForAvatar = JSON.parse(JSON.stringify(this.user));
        }
      },
      methods: {
        redirectToProfile() {
            if (!this.disableClickToProfile) {
                const location = "/profile/".concat(this.userForAvatar.id);
                this.$router.push(location)
            }
        }
      }
  };
</script>
