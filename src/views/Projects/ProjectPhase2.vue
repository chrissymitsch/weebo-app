<template>
    <div class="ProjectPhase2">
        <Modal :showModal="rewardModalActive" @closeModal="rewardModalActive=false" size="large">
            <md-progress-spinner v-if="!tutorialSaved" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            <div v-if="tutorialSaved">
                <div class="md-display-1">Projektphase 2!</div>
                <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
                <p class="description md-body-2">In der zweiten Phase deines Projekts geht es um die Spezifikation des Nutzungskontexts.</p>
                <p class="description md-body-2">Dokumentiere und visualisiere die Analyseergebnisse.</p>
                <p class="description md-body-2">Erstelle Personas und Szenarien mithilfe von <i>Weebo</i>-Vorlagen.</p>
                <p class="description md-body-2">Diskutiere mit allen Teilnehmern über die Ergebnisse.</p>
            </div>
        </Modal>

        <md-chip>{{ currentProject.name }} / Prozess / 2. Spezifikation</md-chip>
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
                    if(elem.name === "Phase2") return elem;
                    return null;
                });
                if (checkIfUserHasTutorialFinished.length > 0) {
                    this.rewardModalActive = false;
                } else {
                    this.rewardModalActive = true;
                    const tutorial = {
                        name: "Phase2",
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