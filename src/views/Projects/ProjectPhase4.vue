<template>
    <div class="ProjectPhase2">
        <Modal :showModal="rewardModalActive" @closeModal="rewardModalActive=false" size="large">
            <md-progress-spinner v-if="!tutorialSaved" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            <div v-if="tutorialSaved">
                <div class="md-display-1">Letzte Phase!</div>
                <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
                <p class="description md-body-2">Feedback der Nutzer ist nicht nur in den vorherigen Phasen wichtig!</p>
                <p class="description md-body-2">Plane und dokumentiere Nutzertests.</p>
            </div>
        </Modal>

        <md-chip>{{ currentProject.name }} / Prozess / 4. Evaluation</md-chip>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import Modal from "../../components/Modal";

    export default {
        computed: {
            ...mapState('rewards', ['tutorials']),
            ...mapState('projects', ['currentProject'])
        },
        components: {Modal},
        data: () => ({
            tutorialSaved: false,
            rewardModalActive: false
        }),
        created() {
            setTimeout(function () { this.triggerReward() }.bind(this), 1000);
        },
        methods: {
            triggerReward() {
                const checkIfUserHasTutorialFinished = this.tutorials.filter(function(elem) {
                    if(elem.name === "Phase4") return elem;
                    return null;
                });
                if (checkIfUserHasTutorialFinished.length > 0) {
                    this.rewardModalActive = false;
                } else {
                    this.rewardModalActive = true;
                    const tutorial = {
                        name: "Phase4",
                        type: "tutorial"
                    };
                    this.$store.dispatch('rewards/createFinishedTutorial', tutorial).then(() => {
                        this.tutorialSaved = true;
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>