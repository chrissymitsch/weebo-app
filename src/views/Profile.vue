<template>
  <div class="page-wrapper">
    <p class="md-display-1">{{user.displayName}}</p>
    <div class="md-layout md-gutter">
      <div class="md-layout-item text-center">
        <md-progress-spinner v-if="userUpdatePending" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        <avatar v-if="!userUpdatePending" size="md-large" :key="rerenderAvatar"></avatar>
        <p class="md-caption">{{user.email}}</p>
        <md-button class="md-raised">Google-Konto verwalten</md-button>
        <md-card>
          <md-card-content>
            <p class="md-title">Profilbild ändern</p>
            <md-avatar :class="`md-large md-accent ${isActivated(!this.user.customAvatar)}`"
                       @click.native="updateCustomAvatar('')">
              <md-ripple><img :src="`${user.photoURL}`" /></md-ripple>
            </md-avatar>
            <md-avatar v-for="(avatar) in avatars" :key="avatar" @click.native="updateCustomAvatar(avatar)"
                       :class="`md-large md-accent ${isActivated(user.customAvatar === avatar)}`">
              <md-ripple @click="updateCustomAvatar(avatar)"><img :src="avatar" /></md-ripple>
            </md-avatar>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-content>
            <p class="md-title">Statistiken</p>
            &quot;Danke&quot; erhalten: 123
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item text-center">
        <p class="md-title">Deine Erfolge</p>
        <div class="badge-list">
          <md-card>
            <md-card-media>
              <img src="@/assets/img/badges/Onboarding.png" :class="hasBadge('CreateTasks')" />
            </md-card-media>
            <md-card-content>
              <p class="md-body-2">Aufgaben erstellen</p>
              <p class="md-caption">Level {{getLevel('addTask')}}</p>
              <md-progress-bar md-mode="determinate" :md-value="getLevelPercentage('addTask')"></md-progress-bar>
              <span class="md-caption">({{scores['addTask'] || 0}} von {{levelBounds[getLevel('addTask') - 1]}})</span>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-media>
              <img src="@/assets/img/badges/Onboarding.png" :class="hasBadge('FinishTasks')" />
            </md-card-media>
            <md-card-content>
              <p class="md-body-2">Aufgaben abschließen</p>
              <p class="md-caption">Level {{getLevel('finishTask')}}</p>
              <md-progress-bar md-mode="determinate" :md-value="getLevelPercentage('finishTask')"></md-progress-bar>
              <span class="md-caption">({{scores['finishTask'] || 0}} von {{levelBounds[getLevel('finishTask') - 1]}})</span>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-media>
              <img src="@/assets/img/badges/Onboarding.png" :class="hasBadge('Discussions')" />
            </md-card-media>
            <md-card-content>
              <p class="md-body-2">Diskutieren</p>
              <md-progress-bar md-mode="determinate" :md-value="10"></md-progress-bar>
              <p class="md-caption">Level 1</p>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-media>
              <img src="@/assets/img/badges/Onboarding.png" :class="hasBadge('Chat')" />
            </md-card-media>
            <md-card-content>
              <p class="md-body-2">Im Chat quatschen</p>
              <md-progress-bar md-mode="determinate" :md-value="10"></md-progress-bar>
              <p class="md-caption">Level 1</p>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-media>
              <img src="@/assets/img/badges/Onboarding.png" :class="hasBadge('Uploads')" />
            </md-card-media>
            <md-card-content>
              <p class="md-body-2">Dokumente hochladen</p>
              <md-progress-bar md-mode="determinate" :md-value="10"></md-progress-bar>
              <p class="md-caption">Level 1</p>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-media>
              <img src="@/assets/img/badges/Onboarding.png" :class="hasBadge('Thanks')" />
            </md-card-media>
            <md-card-content>
              <p class="md-body-2">&quot;Danke&quot; verteilt</p>
              <md-progress-bar md-mode="determinate" :md-value="10"></md-progress-bar>
              <p class="md-caption">Level 1</p>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-media>
              <img src="@/assets/img/badges/Onboarding.png" :class="hasBadge('Onboarding')" />
            </md-card-media>
            <md-card-content>
              <p class="md-body-2">
                Du hast dir die Einführung angesehen
              </p>
            </md-card-content>
          </md-card>
          <md-card>
            <md-card-media>
              <img src="@/assets/img/badges/NewProject.png" :class="hasBadge('NewProject')" />
            </md-card-media>
            <md-card-content>
              <p class="md-body-2">
                Du hast ein Projekt erstellt
              </p>
            </md-card-content>
          </md-card>
        </div>
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
    ...mapState('rewards', ['userScore', 'userBadges']),
  },
  data: () => ({
    badges: null,
    avatars: null,
    rerenderAvatar: 0,
    scores: [],
    levelBounds: [2, 5, 10, 15, 20, 30, 50, 75, 100, 150, 200, 300, 500, 1000]
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
        return "activated-badge";
      }
      return "not-activated-badge";
    },
    updateCustomAvatar(avatar) {
      if (!this.userUpdatePending) {
        const userUpdate = JSON.parse(JSON.stringify(this.user));
        userUpdate.customAvatar = avatar;
        this.$store.dispatch('authentication/updateUser', userUpdate).then(() => {
          this.rerenderAvatar += 1;
        });
      }
    },
    getScores() {
      for (let i = 0; i < this.userScore.length; i += 1) {
        this.scores[this.userScore[i].name] = this.userScore[i].score;
      }
    },
    getLevel(levelName) {
      this.getScores();

      if (this.scores[levelName]) {
        for (let i = 0; i < this.levelBounds.length; i += 1) {
          if (i < this.levelBounds.length - 1) {
            if (this.scores[levelName] < this.levelBounds[i]) {
              return i + 1;
            }
            if (this.scores[levelName] >= this.levelBounds[i] && this.scores[levelName] < this.levelBounds[i + 1]) {
              return i + 2;
            }
          } else {
            return this.levelBounds.length;
          }
        }
      }
      return 1;
    },
    getLevelPercentage(levelName) {
      this.getScores();

      if (this.scores[levelName]) {
        for (let i = 0; i < this.levelBounds.length; i += 1) {
          if (i < this.levelBounds.length - 1) {
            if (this.scores[levelName] < this.levelBounds[i]) {
              return (this.scores[levelName] / this.levelBounds[i]) * 100;
            }
          } else {
            return 100;
          }
        }
      }
      return 0;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/theme/variables.scss';

  .md-layout.md-gutter {
    margin: 0;
    padding: 0;
  }

  .activated-avatar {
    border: 4px solid $vue-color;
  }

  .not-activated {
    border: 4px solid #ffffff;
  }

  .activated-badge {
    -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
    filter: grayscale(0%);
    opacity: 1;
    -moz-opacity: 1;
  }

  .not-activated-badge {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
    opacity: 0.2;
    -moz-opacity: 0.2;
  }

  .badge img {
    width: 120px;
  }
</style>