<template>
  <div class="page-wrapper">
    <div class="md-layout md-gutter">
      <div class="md-layout-item text-center">
        <p class="md-display-1">{{user.displayName}}</p>
        <md-progress-spinner v-if="userUpdatePending" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        <avatar v-if="!userUpdatePending" size="md-large" :key="rerenderAvatar"></avatar>
        <p class="md-caption">{{user.email}}</p>
        <md-button class="md-raised">Google-Konto verwalten</md-button>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item text-center">
        <p class="md-title">Deine Auszeichnungen</p>
        <span class="badge">
          <img src="@/assets/img/badges/Onboarding.png" :class="hasBadge('Onboarding')" />
        </span>
        <span class="badge">
          <img src="@/assets/img/badges/NewProject.png" :class="hasBadge('NewProject')" />
        </span>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item text-center">
        <p class="md-title">Profilbild ändern</p>
        <md-avatar :class="`md-large md-accent ${isActivated(!this.user.customAvatar)}`"
                   @click.native="updateCustomAvatar('')">
          <md-ripple><img :src="`${user.photoURL}`" /></md-ripple>
        </md-avatar>
        <md-avatar v-for="(avatar) in avatars" :key="avatar" @click.native="updateCustomAvatar(avatar)"
                   :class="`md-large md-accent ${isActivated(user.customAvatar === avatar)}`">
          <md-ripple @click="updateCustomAvatar(avatar)"><img :src="avatar" /></md-ripple>
        </md-avatar>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
import Avatar from "../components/users/Avatar";

export default {
  components: {Avatar},
  computed: {
    ...mapState('authentication', ['user', 'userUpdatePending']),
    ...mapState('rewards', ['userBadges'])
  },
  data: () => ({
    badges: null,
    avatars: null,
    rerenderAvatar: 0,
  }),
  created() {
    this.avatars = [
      `https://avatars.dicebear.com/api/initials/${this.user.displayName}.svg`,
      `https://api.adorable.io/avatars/100/${this.user.id}.png`,
      `https://avatars.dicebear.com/api/gridy/${this.user.id}.svg`,
      `https://avatars.dicebear.com/api/jdenticon/${this.user.id}.svg`,
      `https://avatars.dicebear.com/api/bottts/${this.user.id}.svg`,
      `https://robohash.org/${this.user.id}.png`,
      `https://robohash.org/${this.user.id}.png?set=set4`,
      `https://robohash.org/${this.user.id}.png?set=set5`
    ];
    this.badges = [
      "Onboarding", "NewProject"
    ];
  },
  methods: {
    isActivated(constraints) {
      if (constraints)
        return "activated-avatar";
      return "not-activated";
    },
    hasBadge(badgeName) {
      const checkIfUserHasBadge = this.userBadges.filter(function(elem) {
        if(elem.name === badgeName) return elem;
        return null;
      });
      if (checkIfUserHasBadge.length > 0) {
        return "activated-avatar";
      }
      return "not-activated";
    },
    updateCustomAvatar(avatar) {
      if (!this.userUpdatePending) {
        const userUpdate = JSON.parse(JSON.stringify(this.user));
        userUpdate.customAvatar = avatar;
        this.$store.dispatch('authentication/updateUser', userUpdate).then(() => {
          this.rerenderAvatar += 1;
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/theme/variables.scss';

  .activated-avatar {
    border: 4px solid $vue-color;
  }

  .not-activated {
    border: 4px solid #ffffff;
  }

  .badge img {
    width: 120px;
  }
</style>