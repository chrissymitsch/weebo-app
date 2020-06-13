<template>
  <md-table-row>
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

    <md-table-cell>
      <md-tooltip md-direction="left">Du bist Admin</md-tooltip>
      <md-icon class="md-primary" v-if="isCreator()">
        star_border
      </md-icon>
    </md-table-cell>
    <md-table-cell>
      <router-link
            class="md-accent project-link"
            :to="{ name: 'project-dashboard', params: { id: data.projectId } }"
      >{{ data.name }}</router-link>
    </md-table-cell>
    <md-table-cell class="md-xsmall-hide">{{ format_date(data.createTimestamp) }}</md-table-cell>
    <md-table-cell class="md-xsmall-hide">1</md-table-cell>
    <md-table-cell>
      <div v-if="!disableActions && isCreator()" class="delete-btn" @click="deletionDialogActive = true">
        <md-progress-spinner class="md-accent" v-if="isProjectDeletionPending" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        <md-icon class="md-accent" v-if="!isProjectDeletionPending">delete</md-icon>
      </div>
      <div v-if="!disableActions && !isCreator()" class="unsubscribe-btn" @click="unsubscriptionDialogActive = true">
        <md-progress-spinner class="md-accent" v-if="isProjectUnsubscriptionPending" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        <md-icon class="md-accent" v-if="!isProjectUnsubscriptionPending">notifications_off</md-icon>
      </div>
    </md-table-cell>
  </md-table-row>
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
      }
    },
    props: {
      data: Object,
      index: Number,
      isProjectDeletionPending: Boolean,
      isProjectUnsubscriptionPending: Boolean,
      disableActions: Boolean
    }
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