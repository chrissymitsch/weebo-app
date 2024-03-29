<template>
  <div class="main-wrapper">
    <tutorial-modal tutorialName="Projects">
      <div class="md-display-1 text-center">Alle deine Projekte auf einem Blick</div>
      <p class="description"><img src="@/assets/img/welt.png" width="200" /></p>
      <p class="description md-body-2">
        Willst du ein Projekt anlegen oder einen Überblick über deine abonnierten Projekte bekommen,
        dann bist du hier genau richtig. Du kannst angelegte Projekte auch löschen, bzw. abonnierte Projekte kündigen.
      </p>
    </tutorial-modal>

    <div class="page-wrapper">
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <p class="md-display-1">Deine Projekte</p>
          <div class="md-layout md-gutter notifications-layout md-small-size-100">
            <div class="md-layout-item">
              <md-switch v-model="notificationsActive">Benachrichtungen bei Aktualisierungen erhalten</md-switch>
              <p class="md-caption md-error">{{errorMessage}}</p>
            </div>
          </div>
          <project-list class="project-list"></project-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'
  import {messaging} from "../../firebase/init";
  import ProjectList from '@/components/projects/ProjectList'
  import TutorialModal from "../../components/rewards/TutorialModal";

  export default {
    components: {TutorialModal, ProjectList },
    computed: {
      ...mapState('authentication', ['user']),
      ...mapState('app', ['networkOnLine']),
    },
    data: () => ({
      notificationsActive: false,
      errorMessage: null,
      readyForNotifying: false
    }),
    methods: {
      ...mapActions('authentication', ['updateUser']),
      subscribeToPushNotifications() {
        messaging.requestPermission().then(() => {
          console.log('Notification permission granted.');
          this.errorMessage = null;
          this.notificationsActive = true;
          // Get Token
          messaging.getToken().then((token) => {
            if (!this.user.token || this.user.token !== token.toString()) {
              const userToUpdate = JSON.parse(JSON.stringify(this.user));
              userToUpdate.token = token;
              this.updateUser(userToUpdate);
            }

            for (let i = 0; i < this.user.projects.length; i += 1) {
              axios.post(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${this.user.projects[i]}`,
                      {},
                      {
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `key=AAAAoR5OX9Q:APA91bGRAJLk7CIuIaRkVTsTqTKM8wa6vjnTBMzX4BZEis27Da4cJicr4ggkt32blBTUwi7omqmQtEwQIFmTmObsbS0vFs0rx1YRFzGvRvQZzcCs_MO9vwkhYrVQ0RoiiA8fsjjQ91uB`
                        },
                      });
            }
        });
        }).catch((err) => {
          console.log('Unable to get permission to notify.', err);
          this.errorMessage = "Push-Benachrichtigungen sind deaktiviert";
          this.notificationsActive = false;
        });
      },
      unsubscribeToPushNotifications() {
        messaging.getToken().then((token) => {
          messaging.deleteToken(token).then(() => {
            console.log('Notification permission deleted.');
            this.errorMessage = null;
            this.notificationsActive = false;
            if (this.user.token) {
              for (let i = 0; i < this.user.projects.length; i += 1) {
                axios.delete(`https://iid.googleapis.com/iid/v1/${this.user.token}/rel/topics/${this.user.projects[i]}`,
                        {
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `key=AAAAoR5OX9Q:APA91bGRAJLk7CIuIaRkVTsTqTKM8wa6vjnTBMzX4BZEis27Da4cJicr4ggkt32blBTUwi7omqmQtEwQIFmTmObsbS0vFs0rx1YRFzGvRvQZzcCs_MO9vwkhYrVQ0RoiiA8fsjjQ91uB`
                          },
                        });
              }
              const userToUpdate = JSON.parse(JSON.stringify(this.user));
              userToUpdate.token = null;
              this.updateUser(userToUpdate);
            }
          }).catch((err) => {
            console.log('Unable to get permission to notify.', err);
            this.errorMessage = "Push-Benachrichtigungen sind deaktiviert";
            this.notificationsActive = true;
          })
        });
      }
    },
    mounted() {
      // Request Permission of Notifications
      if (this.user) {
        messaging.getToken().then((token) => {
          if (this.user.token && this.user.token === token) {
            this.notificationsActive = true;
          } else {
            this.readyForNotifying = true;
          }
        });

        messaging.onTokenRefresh(() => {
          messaging.getToken().then((refreshedToken) => {
            console.log('Token refreshed.', refreshedToken);
            const userToUpdate = JSON.parse(JSON.stringify(this.user));
            userToUpdate.token = refreshedToken.toString();
            this.updateUser(userToUpdate);
          }).catch((err) => {
            console.log('Unable to retrieve refreshed token ', err);
          });
        });
      }
    },
    watch: {
      notificationsActive(newValue, oldValue) {
        if (newValue !== oldValue && newValue) {
          this.subscribeToPushNotifications();
        } else if (newValue !== oldValue && !newValue) {
          this.unsubscribeToPushNotifications();
        }
      },
      readyForNotifying(newValue, oldValue) {
        if (newValue !== oldValue && newValue && this.notificationsActive) {
          this.subscribeToPushNotifications();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/theme/variables.scss';

  .notifications-layout {
    margin-top: 24px;
  }

  .md-error {
    color: $danger-color;
  }
</style>