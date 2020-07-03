<template>
  <md-card v-if="memberNotDeleted">
    <md-dialog-confirm
            :md-active.sync="unsubscriptionDialogActive"
            :md-title="`Möchtest du ${data.displayName} aus dem Projekt entfernen?`"
            md-confirm-text="Ja."
            md-cancel-text="Nein!"
            @md-confirm="onConfirmUnsubscription" />

    <md-card-content class="text-center">
      <md-badge v-if="isAdmin()" class="md-square md-primary" md-content="Admin">
        <avatar :size="`md-large`" :user-id="data.id"></avatar>
      </md-badge>
      <div v-if="!isAdmin()">
        <avatar :size="`md-large`" :user-id="data.id"></avatar>
      </div>
      <p class="md-title">{{ data.displayName }}</p>
    </md-card-content>
    <md-card-actions class="md-caption">
      <md-progress-spinner class="md-accent" v-if="isProjectMemberUnsubscriptionPending(data.id)" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
      <md-button class="md-icon-button" v-if="deletionPossible() && !isProjectMemberUnsubscriptionPending(data.id)" @click="unsubscriptionDialogActive = true">
        <md-tooltip md-direction="top">Teilnehmer entfernen</md-tooltip>
        <md-icon>remove_circle_outline</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
  import {mapActions, mapGetters, mapState} from "vuex";
  import Avatar from "../users/Avatar";

  export default {
    components: {Avatar},
    computed: {
      ...mapState('projects', ['currentProject', 'projectMemberUnsubscriptionPending']),
      ...mapState('authentication', ['user']),
      ...mapGetters('projects', ['isProjectMemberUnsubscriptionPending']),
    },
    data: () => ({
      memberNotDeleted: true,
      pendingDeletion: false,
      unsubscriptionDialogActive: false,
    }),
    props: {
      data: Object,
      index: Number,
    },
    methods: {
      ...mapActions('projects', ['unsubscribeProjectMember']),
      ...mapActions('messages', ['createMessage']),
      isAdmin(){
        return this.currentProject.creator === this.data.id || this.data.role === "admin";
      },
      deletionPossible(){
        return this.user.id !== this.data.id && (this.currentProject.creator === this.user.id || this.user.role === "admin");
      },
      onConfirmUnsubscription () {
        if (!this.isProjectMemberUnsubscriptionPending(this.data.id)) {
          this.unsubscribeProjectMember({"projectId": this.currentProject.id, "userId": this.data.id});
          this.createMessage({
            "projectId": this.currentProject.id,
            "type": "system",
            "data": {
              "text": `${this.data.displayName} hat das Projekt verlassen.`
            }
          });
        }
      },
    },
    watch: {
      projectMemberUnsubscriptionPending() {
        this.pendingDeletion = this.isProjectMemberUnsubscriptionPending(this.data.id);
      },
      pendingDeletion (newValue, oldValue) {
        if (!newValue && oldValue) {
          this.memberNotDeleted = false;
        }
      }
    }
  }
</script>
