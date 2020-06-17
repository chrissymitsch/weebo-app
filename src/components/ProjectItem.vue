<template>
  <md-card>
    <md-dialog-confirm
            :md-active.sync="deletionDialogActive"
            :md-title="`Möchtest du ${data.name} wirklich löschen?`"
            md-confirm-text="Ja, löschen."
            md-cancel-text="Nein!"
            @md-confirm="onConfirmDeletion" />

    <md-dialog-confirm
            :md-active.sync="unsubscriptionDialogActive"
            :md-title="`Möchtest du ${data.name} aus deinen Abonnements entfernen?`"
            md-confirm-text="Ja, weg damit."
            md-cancel-text="Nein!"
            @md-confirm="onConfirmUnsubscription" />

    <router-link
            class="md-accent md-title project-link"
            :to="{ name: 'project-dashboard', params: { id: data.projectId, project: data } }"
    >
      <md-card-content>
        <md-avatar class="md-avatar-icon md-primary"><img :src="`https://avatars.dicebear.com/api/jdenticon/${data.id}.svg`" alt="" /></md-avatar>
        {{ data.name }}
      </md-card-content>
    </router-link>
    <md-card-actions class="md-caption">
      {{ format_date(data.createTimestamp) }}
    </md-card-actions>
    <md-card-actions>
      <md-tooltip md-direction="left">Du bist Admin</md-tooltip>
      <md-icon class="md-primary" v-if="isCreator()">
        star_border
      </md-icon>
      <div v-if="!disableActions && isCreator()" class="delete-btn" @click="deletionDialogActive = true">
        <md-progress-spinner class="md-accent" v-if="isProjectDeletionPending" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        <md-icon class="md-accent" v-if="!isProjectDeletionPending">delete</md-icon>
      </div>
      <div v-if="!disableActions && !isCreator()" class="unsubscribe-btn" @click="unsubscriptionDialogActive = true">
        <md-progress-spinner class="md-accent" v-if="isProjectUnsubscriptionPending" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        <md-icon class="md-accent" v-if="!isProjectUnsubscriptionPending">notifications_off</md-icon>
      </div>
    </md-card-actions>
  </md-card>
</template>

<script>
  import moment from 'moment'
  import {mapState} from "vuex";

  export default {
    computed: {
      ...mapState('authentication', ['user']),
    },
    data: () => ({
      deletionDialogActive: false,
      unsubscriptionDialogActive: false
    }),
    props: {
      data: Object,
      index: Number,
      isProjectDeletionPending: Boolean,
      isProjectUnsubscriptionPending: Boolean,
      disableActions: Boolean
    },
    methods: {
      onConfirmDeletion () {
        this.$emit('deleteProject', this.data.projectId);
      },
      onConfirmUnsubscription () {
        this.$emit('unsubscribeProject', this.data.projectId);
      },
      format_date(value){
        if (value) {
          return moment(value).format('DD.MM.YYYY')
        }
        return '';
      },
      isCreator(){
        return this.data.creator === this.user.id;
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

</style>