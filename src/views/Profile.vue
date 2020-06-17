<template>
  <div class="page-wrapper">
    <div class="md-layout md-gutter">
      <div class="md-layout-item align-center">
        <p class="md-display-1">{{user.displayName}}</p>
        <avatar size="md-large"></avatar>
        <p class="md-caption">{{user.email}}</p>
        <md-button>Google-Konto verwalten</md-button>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item align-center">
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
      <div class="md-layout-item align-center">
        <p class="md-title">Profilbild ändern</p>
        <md-avatar :class="`md-large md-accent ${isActivated(!this.user.customAvatar)}`">
          <md-ripple><img :src="`${user.photoURL}`" /></md-ripple>
        </md-avatar>
        <md-avatar v-for="(avatar) in avatars" :key="avatar" :class="`md-large md-accent ${isActivated(user.customAvatar === avatar)}`">
          <md-ripple><img :src="avatar" /></md-ripple>
        </md-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Avatar from "../components/Avatar";

export default {
  components: {Avatar},
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('rewards', ['userBadges'])
  },
  data: () => ({
    badges: null,
    avatars: null
  }),
  created() {
    console.log(this.userBadges);
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