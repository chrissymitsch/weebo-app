<template>
    <div class="ProjectPhase2">
        <tutorial-modal tutorialName="Phase2">
            <div class="md-display-1 text-center">Es geht in die 3. Phase!</div>
            <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
            <p class="description md-body-2">
                In der dritten Phase des Projektgestaltungsprozesses geht es um die
                Modellierung von Lösungen auf Grundlage der Anforderungen.
            </p>
            <p class="description md-caption">Lade alle möglichen Dateien hoch, wie Wireframes, Prototypen, Simulationen, usw.</p>
            <p class="description md-caption">Vermittle die Lösungen an alle Stakeholder.</p>
            <p class="description md-caption">Diskutiere über die Lösungen und entwickle weitere Aufgaben und Anforderungen.</p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Prozess / 3. Modellierung</md-chip>
        <phase-files :given-phase="2"></phase-files>

        <p class="text-center"><img src="@/assets/img/phase3.png" class="phase-image" /></p>
        <md-card>
            <md-card-header class="md-title">Gestaltlösungen erarbeiten</md-card-header>
            <md-card-content>
                Gestaltungsentscheidungen haben einen wesentlichen Einfluss auf die User Experience. Die menschzentrierte Gestaltung zielt darauf ab, eine gute User Experience dadurch zu erreichen, dass dieses während des Gestaltungsprozesses berücksichtigt wird [...].
            </md-card-content>
            <md-card-content>
                Mögliche Gestaltungslösungen werden unter Berücksichtigung der Beschreibung des Nutzungskontexts, der Ergebnisse jeglicher Ausgangsevaluierung, des etablierten Stands der Technik in der Anwendungsdomäne, der Richtlinien und Normen zur Gestaltung und Gebrauchstauglichkeit sowie der Erfahrungen und Kenntnisse des mit der Gestaltung befassten multidisziplinären Teams entwickelt. Sobald mögliche Gestaltungslösungen detailliert erarbeitet und bewertet wurden, können sich daraus weitere Nutzungsanforderungen ergeben.
            </md-card-content>
            <md-card-actions><p class="md-caption">DIN EN ISO 9241-210</p></md-card-actions>
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