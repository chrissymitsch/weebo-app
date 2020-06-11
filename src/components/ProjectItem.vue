<template>
  <md-table-row>
    <md-dialog-confirm
            :md-active.sync="active"
            md-title="Möchtest du dieses Projekt wirklich löschen?"
            md-confirm-text="Ja, löschen."
            md-cancel-text="Nein!"
            @md-confirm="onConfirm" />

    <md-table-cell>
      <router-link
            class="md-accent project-link"
            :to="{ name: 'project', params: { id: data.projectId } }"
      >{{ data.name }}</router-link>
    </md-table-cell>
    <md-table-cell class="md-xsmall-hide">{{ format_date(data.createTimestamp) }}</md-table-cell>
    <md-table-cell class="md-xsmall-hide">1</md-table-cell>
    <md-table-cell>
      <div v-if="!disableActions" class="delete-btn" @click="active = true">
        <md-progress-spinner class="md-accent" v-if="isProjectDeletionPending" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        <md-icon class="md-accent" v-if="!isProjectDeletionPending">delete</md-icon>
      </div>
    </md-table-cell>
  </md-table-row>
</template>

<script>
  import moment from 'moment'

  export default {
    data: () => ({
      active: false
    }),
    methods: {
      onConfirm () {
        this.$emit('deleteProject', this.data.projectId);
      },
      format_date(value){
        if (value) {
          return moment(value).format('DD.MM.YYYY')
        }
        return '';
      },
    },
    props: {
      data: Object,
      index: Number,
      isProjectDeletionPending: Boolean,
      disableActions: Boolean
    }
  }
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.delete-btn {
  cursor: pointer;
  padding: 5px 10px;
  display: inline-block;
  margin-left: 10px;
}
</style>