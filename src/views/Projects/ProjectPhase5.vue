<template>
    <div class="ProjectPhase2">
        <tutorial-modal tutorialName="Phase4">
            <div class="md-display-1 text-center">Alle Anforderungen erfüllt?</div>
            <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
            <p class="description md-body-2">
                Sobald alle Anforderungen erfüllt wurden, startet die Einführung der Software mithilfe
                nutzerzentrierter Methoden.
            </p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Prozess / 5. Softwareeinführung</md-chip>

        <p class="text-center"><img src="@/assets/img/phase4.png" class="phase-image" /></p>
        <md-card>
            <md-card-header class="md-title">Softwareeinführungsprozess</md-card-header>
            <md-card-content>

            </md-card-content>
        </md-card>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import TutorialModal from "../../components/rewards/TutorialModal";
    import PhaseFiles from "../../components/projects/PhaseFiles";

    export default {
        computed: {
            ...mapState('projects', ['currentProject'])
        },
        components: {PhaseFiles, TutorialModal},
    };
</script>

<style lang="scss" scoped>
    .phase-image {
        margin-top: 24px;
        margin-bottom: 24px;
        width: 100%;
        max-width: 500px;
    }
</style>