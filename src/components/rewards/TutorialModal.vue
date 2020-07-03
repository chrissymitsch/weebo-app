<template>
  <div>
    <Modal :showModal="rewardModalActive" @closeModal="rewardModalActive=false" size="large">
      <md-progress-spinner v-if="!tutorialSaved" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      <div v-if="tutorialSaved">
        <slot></slot>
      </div>
    </Modal>
    <Modal :showModal="tutorialModalActive" @closeModal="tutorialModalActive=false" size="large">
      <slot></slot>
    </Modal>
    <md-button class="md-icon-button md-raised md-dense button-tutorial-help" @click="tutorialModalActive=true">
      <md-icon>help_outline</md-icon>
    </md-button>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import Modal from "../Modal";

  export default {
    computed: {
      ...mapState('rewards', ['tutorials'])
    },
    components: {
      Modal
    },
    props: {
      tutorialName: String
    },
    data: () => ({
      tutorialSaved: false,
      rewardModalActive: false,
      tutorialModalActive: false
    }),
    methods: {
      triggerReward() {
        const tutorialName = JSON.parse(JSON.stringify(this.tutorialName));
        const checkIfUserHasTutorialFinished = this.tutorials.filter(function (elem) {
          if (elem.name === tutorialName) return elem;
          return null;
        });
        if (checkIfUserHasTutorialFinished.length > 0) {
          this.rewardModalActive = false;
        } else {
          this.rewardModalActive = true;
          const tutorial = {
            name: tutorialName,
            type: "tutorial"
          };
          this.$store.dispatch('rewards/createFinishedTutorial', tutorial).then(() => {
            this.tutorialSaved = true;
          });
        }
      }
    },
    mounted() {
      setTimeout(function () {
        this.triggerReward()
      }.bind(this), 1000);
    },
  }
</script>