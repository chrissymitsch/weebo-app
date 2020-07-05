<template>
  <div class="main-wrapper" :key="rerenderProfile">
    <md-progress-spinner v-if="!finishedLoadingUser" class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
    <div class="page-wrapper" v-if="finishedLoadingUser">
      <div class="md-layout md-gutter">
        <div class="md-layout-item text-center profile-person">
          <md-progress-spinner v-if="userUpdatePending" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
          <avatar v-if="!userUpdatePending" size="md-large" :key="rerenderAvatar" :user-id="selectedUser.id"></avatar>
          <p class="md-display-1">{{selectedUser.displayName}}</p>
          <p class="md-subheading" v-if="isLoggedInUserSelectedUser()">{{selectedUser.email}}</p>
          <div class="account-button" v-if="isLoggedInUserSelectedUser()"><md-button class="md-raised">Google-Konto verwalten</md-button></div>
          <div class="md-layout md-gutter profile-stats">
            <div class="md-layout-item text-center">
              <p class="md-subheading">{{getThankYou()}}</p>
              <p class="md-caption">DANKE</p>
            </div>
            <div class="md-layout-item text-center">
              <p class="md-subheading">{{selectedUserScore.length + selectedUserBadges.length}}</p>
              <p class="md-caption">ERFOLGE</p>
            </div>
            <div class="md-layout-item text-center">
              <p class="md-subheading">{{selectedUser.projects.length}}</p>
              <p class="md-caption">PROJEKTE</p>
            </div>
          </div>

          <md-card class="profile-avatar-change-card" v-if="isLoggedInUserSelectedUser()">
            <md-list>
              <md-list-item md-expand>
                <md-icon>image</md-icon>
                <span class="md-list-item-text">Profilbild ändern</span>

                <div slot="md-expand" class="profile-avatar-change">
                  <md-avatar :class="`md-large md-accent ${isActivated(!this.selectedUser.customAvatar)}`"
                             @click.native="updateCustomAvatar('')">
                    <md-ripple><img :src="`${selectedUser.photoURL}`" /></md-ripple>
                  </md-avatar>
                  <md-avatar v-for="(avatar) in avatars" :key="avatar" @click.native="updateCustomAvatar(avatar)"
                             :class="`md-large md-accent ${isActivated(selectedUser.customAvatar === avatar)}`">
                    <md-ripple @click="updateCustomAvatar(avatar)"><img :src="avatar" /></md-ripple>
                  </md-avatar>
                </div>
              </md-list-item>
            </md-list>
          </md-card>
        </div>
        <div class="md-layout-item text-center">
          <div class="badge-list" v-if="finishedLoadingUser">
            <md-card v-for="(badge, index) in allBadges" :key="index">
              <md-card-media>
                <img src="@/assets/img/badges/badge.png" :class="hasBadge(badge.name)" />
              </md-card-media>
              <md-card-content>
                <p class="md-body-2">{{badge.description}}</p>
                <p class="md-caption" v-if="!scores[badge.name] || scores[badge.name] <= 1000">Level {{getLevel(badge.name)}}</p>
                <md-progress-bar v-if="!scores[badge.name] || scores[badge.name] <= 1000" md-mode="determinate" :md-value="getLevelPercentage(badge.name)"></md-progress-bar>
                <p class="md-caption" v-if="!scores[badge.name]"></p>
                <p class="md-caption" v-if="scores[badge.name] && scores[badge.name] >= levelBoundsBronze && scores[badge.name] < levelBoundsSilver">
                  BRONZE
                </p>
                <p class="md-caption" v-if="scores[badge.name] && scores[badge.name] >= levelBoundsSilver && scores[badge.name] < levelBoundsGold">
                  SILBER
                </p>
                <p class="md-caption" v-if="scores[badge.name] && scores[badge.name] >= levelBoundsGold">
                  GOLD
                </p>
                <md-tooltip v-if="!scores[badge.name] || scores[badge.name] <= 1000">({{scores[badge.name] || 0}} von {{levelBounds[getLevel(badge.name) - 1]}} Punkten)</md-tooltip>
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
            <md-card>
              <md-card-media>
                <img src="@/assets/img/badges/badge.png" :class="hasBadge('Phase0')" />
              </md-card-media>
              <md-card-content>
                <p class="md-body-2">
                  Du hast dir Prozessphase 1: Analyse angesehen
                </p>
              </md-card-content>
            </md-card>
            <md-card>
              <md-card-media>
                <img src="@/assets/img/badges/badge.png" :class="hasBadge('Phase1')" />
              </md-card-media>
              <md-card-content>
                <p class="md-body-2">
                  Du hast dir Prozessphase 2: Spezifikation angesehen
                </p>
              </md-card-content>
            </md-card>
            <md-card>
              <md-card-media>
                <img src="@/assets/img/badges/badge.png" :class="hasBadge('Phase2')" />
              </md-card-media>
              <md-card-content>
                <p class="md-body-2">
                  Du hast dir Prozessphase 3: Modellierung angesehen
                </p>
              </md-card-content>
            </md-card>
            <md-card>
              <md-card-media>
                <img src="@/assets/img/badges/badge.png" :class="hasBadge('Phase3')" />
              </md-card-media>
              <md-card-content>
                <p class="md-body-2">
                  Du hast dir Prozessphase 4: Evaluation angesehen
                </p>
              </md-card-content>
            </md-card>
          </div>
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
    allBadges: [
      { name: 'addTask', description: 'Aufgaben erstellen' },
      { name: 'finishTask', description: 'Aufgaben abschließen' },
      { name: 'addMessage', description: 'Diskutieren' },
      { name: 'addFile', description: 'Dateien hochladen' },
      { name: 'thankYou', description: '"Danke" verteilen' },
    ],
    rerenderProfile: 0,
    finishedLoadingUser: false,
    selectedUser: null,
    selectedUserScore: null,
    selectedUserBadges: null,
    badges: null,
    avatars: null,
    rerenderAvatar: 0,
    scores: [],
    levelBounds: [2, 5, 10, 15, 20, 30, 50, 75, 100, 150, 200, 300, 500, 1000],
    levelBoundsBronze: 2,
    levelBoundsSilver: 20,
    levelBoundsGold: 150
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
  mounted() {
    this.getSelectedUser();
  },
  methods: {
    getSelectedUser() {
      if (this.$route.params.userId) {
        this.$store.dispatch('authentication/getUser', this.$route.params.userId).then(user => {
          this.selectedUser = user;
          this.$store.dispatch('rewards/getUserScore', this.$route.params.userId, { root: true }).then(score => {
            this.selectedUserScore = score;
            this.getScores();
            this.$store.dispatch('rewards/getUserBadges', this.$route.params.userId, { root: true }).then(badges => {
              this.selectedUserBadges = badges;
              this.finishedLoadingUser = true;
            });
          });

        });
      } else {
        this.selectedUser = this.user;
        this.selectedUserScore = this.userScore;
        this.selectedUserBadges = this.userBadges;
        this.getScores();
        this.finishedLoadingUser = true;
      }
    },
    isLoggedInUserSelectedUser() {
      return this.selectedUser && this.user.id === this.selectedUser.id;
    },
    isActivated(constraints) {
      if (constraints)
        return "activated-avatar";
      return "not-activated";
    },
    getThankYou() {
      let score = 0;
      if (this.selectedUser && this.selectedUser.thankYou) {
        for (let i = 0; i < this.selectedUser.thankYou.length; i += 1) {
          score += Number(this.selectedUser.thankYou[i].score);
        }
      }
      return score;
    },
    hasBadge(badgeName) {
      const checkIfUserHasBadge = this.selectedUserBadges.filter(function(elem) {
        if(elem.name === badgeName) return elem;
        return null;
      });
      if (checkIfUserHasBadge.length > 0) {
        return "activated-badge";
      }
      if (this.scores[badgeName] >= this.levelBoundsBronze && this.scores[badgeName] < this.levelBoundsSilver) {
        return "activated-bronze-badge";
      }
      if (this.scores[badgeName] >= this.levelBoundsSilver && this.scores[badgeName] < this.levelBoundsGold) {
        return "activated-silver-badge";
      }
      if (this.scores[badgeName] >= this.levelBoundsGold) {
        return "activated-gold-badge";
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
      for (let i = 0; i < this.selectedUserScore.length; i += 1) {
        this.scores[this.selectedUserScore[i].name] = this.selectedUserScore[i].score;
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
  },
  watch: {
    '$route.params.userId': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getSelectedUser();
        this.rerenderProfile += 1;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/theme/variables.scss';

  .profile-person {
    text-align: center;
    .md-display-1 {
      margin-bottom: 12px;
    }

    .account-button {
      width: 100%;
      display: inline-block;
      .md-button {
        margin-top: 20px;
      }
    }

    .profile-stats {
      width: 50%;
      display: inline-flex;
      margin-top: 20px;

      @media (max-width: 865px) {
        width: 100%;
      }

      .md-layout-item:not(:last-child) {
        border-right: 1px solid #AFB4BB;
      }
    }
  }

  .profile-avatar-change-card {
    margin-top: 32px;
  }

  .profile-avatar-change {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
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

  .activated-bronze-badge {
    -webkit-filter: hue-rotate(160deg) brightness(110%) contrast(70%); /* Safari 6.0 - 9.0 */
    filter: hue-rotate(160deg) brightness(110%) contrast(70%);
    opacity: 1;
    -moz-opacity: 1;
  }

  .activated-silver-badge {
    -webkit-filter: hue-rotate(250deg) grayscale(80%) brightness(110%) contrast(70%); /* Safari 6.0 - 9.0 */
    filter: hue-rotate(250deg) grayscale(80%) brightness(110%) contrast(70%);
    opacity: 1;
    -moz-opacity: 1;
  }

  .activated-gold-badge {
    -webkit-filter: hue-rotate(200deg) brightness(140%) contrast(90%); /* Safari 6.0 - 9.0 */
    filter: hue-rotate(200deg) brightness(140%) contrast(90%);
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