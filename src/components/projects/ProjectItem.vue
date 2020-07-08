<template>
  <div class="ProjectItem width-100">
    <md-card v-if="finishedLoading && project">
      <md-dialog-confirm
              :md-active.sync="deletionDialogActive"
              :md-title="`Möchtest du ${project.name} wirklich löschen?`"
              md-confirm-text="Ja, löschen."
              md-cancel-text="Nein!"
              @md-confirm="onConfirmDeletion" />

      <md-dialog-confirm
              :md-active.sync="unsubscriptionDialogActive"
              :md-title="`Möchtest du ${project.name} aus deinen Abonnements entfernen?`"
              md-confirm-text="Ja, weg damit."
              md-cancel-text="Nein!"
              @md-confirm="onConfirmUnsubscription" />

      <md-card-content v-if="!finishedLoading" class="text-center">
        <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      </md-card-content>
      <md-card-content v-if="finishedLoading && !project" class="text-center">
        Fehler beim Laden des Projekts.
      </md-card-content>
      <md-card-content>
        <router-link
                class="md-accent md-title project-link"
                :to="{ name: 'project-dashboard', params: { id: projectId, project: project } }"
        >
          <md-avatar class="md-avatar-icon md-primary"><img :src="`https://avatars.dicebear.com/api/jdenticon/${projectId}.svg`" alt="" /></md-avatar>
          <p class="md-title project-title">{{ project.name }}</p>
        </router-link>
        <p class="md-caption">Letzte Aktualisierung: {{ format_date(project.updateTimestamp) }}</p>
        <p class="md-body-2" v-if="!project.finished">Level: {{ project.level || 0 }}</p>
        <p class="md-body-2" v-if="project.finished">Beendet</p>
      </md-card-content>
      <md-card-actions>
        <div>
          <md-tooltip md-direction="top">Du bist Admin</md-tooltip>
          <md-icon class="md-primary" v-if="isCreator()">
            star_border
          </md-icon>
        </div>
        <div v-if="!disableActions && isCreator()" class="delete-btn" @click="deletionDialogActive = true">
          <md-progress-spinner class="md-accent" v-if="isProjectDeletionPending" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
          <md-tooltip md-direction="top">Löschen</md-tooltip>
          <md-icon class="md-accent" v-if="!isProjectDeletionPending">delete</md-icon>
        </div>
        <div v-if="!disableActions && !isCreator()" class="unsubscribe-btn" @click="unsubscriptionDialogActive = true">
          <md-progress-spinner class="md-accent" v-if="isProjectUnsubscriptionPending" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
          <md-tooltip md-direction="top">Abonnement beenden</md-tooltip>
          <md-icon class="md-accent" v-if="!isProjectUnsubscriptionPending">notifications_off</md-icon>
        </div>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapState, mapActions} from "vuex";
  import axios from "axios";

  export default {
    computed: {
      ...mapState('authentication', ['user']),
      ...mapActions('projects', ['getProject']),
    },
    data: () => ({
      deletionDialogActive: false,
      unsubscriptionDialogActive: false,
      project: null,
      finishedLoading: false
    }),
    props: {
      index: Number,
      projectId: String,
      isProjectDeletionPending: Boolean,
      isProjectUnsubscriptionPending: Boolean,
      disableActions: Boolean
    },
    created() {
      this.$store.dispatch('projects/getProject', this.projectId).then(data => {
        this.project = data;
      }).finally(() => this.finishedLoading = true);
    },
    methods: {
      ...mapActions('messages', ['createMessage']),
      onConfirmDeletion () {
        this.$emit('deleteProject', this.projectId);
        if (this.user.token) {
          axios.delete(`https://iid.googleapis.com/iid/v1/${this.user.token}/rel/topics/${this.projectId}`,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `key=AAAAoR5OX9Q:APA91bGRAJLk7CIuIaRkVTsTqTKM8wa6vjnTBMzX4BZEis27Da4cJicr4ggkt32blBTUwi7omqmQtEwQIFmTmObsbS0vFs0rx1YRFzGvRvQZzcCs_MO9vwkhYrVQ0RoiiA8fsjjQ91uB`
                    },
                  });
        }
      },
      onConfirmUnsubscription () {
        this.$emit('unsubscribeProject', this.projectId);
        this.createMessage({
          "projectId": this.projectId,
          "type": "system",
          "data": {
            "text": `Oh schade, ${this.user.displayName} hat das Projekt verlassen.`
          }
        });
        if (this.user.token) {
          axios.delete(`https://iid.googleapis.com/iid/v1/${this.user.token}/rel/topics/${this.projectId}`,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `key=AAAAoR5OX9Q:APA91bGRAJLk7CIuIaRkVTsTqTKM8wa6vjnTBMzX4BZEis27Da4cJicr4ggkt32blBTUwi7omqmQtEwQIFmTmObsbS0vFs0rx1YRFzGvRvQZzcCs_MO9vwkhYrVQ0RoiiA8fsjjQ91uB`
                    },
                  });
        }
      },
      format_date(value){
        if (value) {
          return moment.unix(value.seconds).format('DD.MM.YYYY')
        }
        return '';
      },
      isCreator(){
        return this.project.creator === this.user.id;
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.delete-btn, .unsubscribe-btn {
  cursor: pointer;
  padding: 5px 10px;
  display: inline-block;
  margin-left: 10px;
}

  .project-title {
    max-width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto;
  }

  .md-card {
    min-height: 220px;
  }

</style>