<template>
  <md-card>
    <md-card-content class="text-center">
      <md-badge v-if="isCreator()" class="md-square md-primary" md-content="Admin">
        <avatar :size="`md-large`" :user-id="data.id"></avatar>
      </md-badge>
      <div v-if="!isCreator()">
        <avatar :size="`md-large`" :user-id="data.id"></avatar>
      </div>
      <p class="md-title">{{ data.displayName }}</p>
    </md-card-content>
    <md-card-actions class="md-caption">
      <md-button class="md-icon-button" v-if="!isCreator()">
        <md-tooltip md-direction="top">Teilnehmer entfernen</md-tooltip>
        <md-icon>remove_circle_outline</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
  import {mapState} from "vuex";
  import Avatar from "../users/Avatar";

  export default {
    components: {Avatar},
    computed: {
      ...mapState('authentication', ['user']),
    },
    data: () => ({
    }),
    props: {
      data: Object,
      index: Number,
    },
    methods: {
      isCreator(){
        return this.data.id === this.user.id;
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

</style>