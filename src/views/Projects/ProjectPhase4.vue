<template>
    <div class="ProjectPhase2">
        <tutorial-modal tutorialName="Phase3">
            <div class="md-display-1 text-center">Letzte Phase!</div>
            <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
            <p class="description md-body-2">
                Feedback der Nutzer ist nicht nur in den vorherigen Phasen wichtig!
                Insbesondere in der Evaluationsphase entscheidet das Nutzerfeedback über den weiteren Verlauf des
                nutzerzentrierten Designprozesses.
            </p>
            <p class="description md-caption">Plane Termine für User-Tests und andere nutzerzentrierte Evaluationsmethoden.</p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Prozess / 4. Evaluation</md-chip>
        <phase-files :given-phase="3"></phase-files>

        <p class="text-center"><img src="@/assets/img/phase4.png" class="phase-image" /></p>
        <md-card>
            <md-card-header class="md-title">Design evaluieren</md-card-header>
            <md-card-content>
                Benutzerzentrierte Evaluierung (die Evaluierung aus der Benutzerperspektive) ist innerhalb der mensch-zentrierten Gestaltung eine erforderliche Aktivität.
            </md-card-content>
            <md-card-content>
                Selbst in den frühen Phasen des Projekts sollten Gestaltungskonzepte bewertet werden, um ein besseres Verständnis für die Benutzererfordernisse zu gewinnen. Die reale Nutzung eines Produkts, Systems oder einer Dienstleistung ist komplex und obwohl Leitlinien zur ergonomischen Gestaltung eine nützliche Hilfe für die Gestalter darstellen können, ist die benutzerzentrierte Evaluierung ein entscheidendes Element der menschzentrierten Gestaltung. Dennoch ist die Evaluierung durch Benutzer [...] in jeder Phase des Projekts nicht immer praktikabel oder kostengünstig. Unter diesen Umständen sollten Gestaltungslösungen auch auf andere Weise bewertet werden — zum Beispiel durch die Modellierung von Aufgaben und Simulationen. Diese Methoden konzentrieren sich auf die Frage, wie Benutzer das System erfahren, selbst wenn die Benutzer möglicherweise nicht direkt beteiligt sind. Die benutzerzentrierte Evaluierung kann verwendet werden, um:
            </md-card-content>
            <md-card-content>
                a) neue Informationen über die Benutzererfordernisse zu sammeln;
            </md-card-content>
            <md-card-content>
                b) Rückmeldungen über die Stärken und Schwächen der Gestaltungslösung aus der Benutzerperspektive zu geben (um die Gestaltung zu verbessern);
            </md-card-content>
            <md-card-content>
                c) zu beurteilen, ob Nutzungsanforderungen erreicht wurden (darin kann die Beurteilung der Konformität mit internationalen, nationalen, lokalen, firmeneigenen oder gesetzlichen Normen enthalten sein);
            </md-card-content>
            <md-card-content>
                d) Ausgangsdaten zu erheben oder Vergleiche zwischen Gestaltungsalternativen durchzuführen.
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