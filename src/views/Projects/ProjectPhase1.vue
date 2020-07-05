<template>
    <div class="ProjectPhase1">
        <tutorial-modal tutorialName="Phase0">
            <div class="md-display-1 text-center">Starte in die 1. Phase!</div>
            <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
            <p class="description md-body-2">
                In der ersten Phase deines Projekts geht es darum, den Nutzungskontext zu verstehen und festzulegen.
                Daher finden hier ein paar umfassende Analysen statt, wie z.B.:
            </p>
            <p class="description md-caption">Stakeholderanalyse</p>
            <p class="description md-caption">Interviews</p>
            <p class="description md-caption">Beobachtungen</p>
            <p class="description md-caption">Fragebögen</p>
            <p class="description md-caption">Zielgruppe</p>
            <p class="description md-body-2">
                Lade Stakeholder zum Projekt ein oder verwalte sie. Erstelle Aufgaben, lade wichtige Dokumente und
                Ergebnisse hoch, plane Termine und erstelle Personas.
            </p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Prozess / 1. Analyse</md-chip>
        <md-list class="files-list">
            <md-list-item md-expand>
                <span class="md-list-item-text">Dateien</span>

                <div slot="md-expand">
                </div>
            </md-list-item>
        </md-list>

        <p class="text-center"><img src="@/assets/img/phase1.png" class="phase-image" /></p>
        <md-card>
            <md-card-header class="md-title">Nutzungskontext verstehen und festlegen</md-card-header>
            <md-card-content>
                Die Benutzermerkmale, Aufgaben und die organisatorische, technische und physische Umgebung bestimmen den Kontext, in dem das System verwendet wird. Es ist sinnvoll, Informationen zum aktuellen Kontext zu sammeln und zu analysieren, um denjenigen Kontext zu verstehen und anschließend festzulegen, der für das zukünftige System gelten wird. Durch die Analyse bestehender oder ähnlicher Systeme (gegebenenfalls einschließlich manueller Systeme) können, sofern nach wie vor zutreffend, Informationen zum gesamten Spektrum der Kontextfragestellungen gewonnen werden, einschließlich Mängel und Ausgangsniveaus für Leistung und Zufriedenstellung. Dadurch können Notwendigkeiten, Probleme und Einschränkungen aufgezeigt werden, die ansonsten möglicherweise übersehen werden können, vom zukünftigen System jedoch abgedeckt werden müssen. Außerdem bleiben einige Aspekte des aktuellen Kontexts bestehen, selbst wenn das System völlig neu ist. Falls ein vorhandenes System nachgerüstet oder verbessert werden soll, werden einige dieser Informationen bereits zur Verfügung stehen. Falls umfangreiche Ergebnisse von Rückmeldungen seitens der Benutzer, Berichte von Benutzerbetreuern und sonstige Daten vorliegen, dann können diese eine Grundlage dafür bilden, Schwerpunkte bei Systemmodifikationen und -änderungen festzulegen.
            </md-card-content>
            <md-card-actions><p class="md-caption">DIN EN ISO 9241-210</p></md-card-actions>
        </md-card>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import TutorialModal from "../../components/rewards/TutorialModal";

    export default {
        computed: {
            ...mapState('rewards', ['tutorials']),
            ...mapState('projects', ['currentProject'])
        },
        components: {TutorialModal},
    };
</script>

<style lang="scss" scoped>
    .files-list {
        margin-top: 24px;
    }

    .phase-image {
        margin-top: 24px;
        margin-bottom: 24px;
        width: 100%;
        max-width: 500px;
    }
</style>