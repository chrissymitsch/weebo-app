<template>
    <div class="ProjectPhase1">
        <Modal :showModal="rewardModalActive" @closeModal="rewardModalActive=false" size="large">
            <md-progress-spinner v-if="!tutorialSaved" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            <div v-if="tutorialSaved">
                <div class="md-display-1">Starte in die 1. Phase!</div>
                <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
                <p class="description md-body-2">
                    In der ersten Phase deines Projekts geht es darum, den Nutzungskontext zu verstehen.
                    Daher finden hier ein paar umfassende Analysen statt, wie z.B.:
                </p>
                <p class="description md-caption">Stakeholderanalyse</p>
                <p class="description md-caption">Interviews</p>
                <p class="description md-caption">Beobachtungen</p>
                <p class="description md-caption">Fragebögen</p>
                <p class="description md-body-2">
                    Lade Stakeholder zum Projekt ein oder benenne und verwalte sie. Lade wichtige Dokumente und
                    Ergebnisse hoch und diskutiere mit allen Projektteilnehmern.
                </p>
            </div>
        </Modal>

        <md-chip>{{ currentProject.name }} / Prozess / 1. Analyse</md-chip>
        <p class="md-body-2">2. Nutzungskontext verstehen</p>
        <p class="md-body-1">
            Denn für eine gute Lösung muss man zuhören und beobachten können. Der Nutzungskontext besteht aus den Informationen zum Benutzer, seinen Aufgaben und verbundenen Zielen, seiner verfügbaren Ausrüstung und seiner Umgebung (physisch und sozial), in der er sich befindet. Um diese Nutzungskontextinformation zu erfassen, werden Repräsentaten einer Benutzergruppe interviewt und / oder bei ihrer Arbeit beobachtet. Aus der Analyse der Kontextdaten ergeben sich die Aufgaben, Erfordernisse und Nutzungsprobleme der Benutzer sowie zu klärende Fragen.
        </p>
        <p class="md-caption">Quelle: https://www.procontext.de/methodik-und-wissen/human-centered-design.html</p>
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
                    if(elem.name === "Phase0") return elem;
                    return null;
                });
                if (checkIfUserHasTutorialFinished.length > 0) {
                    this.rewardModalActive = false;
                } else {
                    this.rewardModalActive = true;
                    const tutorial = {
                        name: "Phase0",
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