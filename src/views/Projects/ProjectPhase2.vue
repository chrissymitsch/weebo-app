<template>
    <div class="ProjectPhase2">
        <tutorial-modal tutorialName="Phase1">
            <div class="md-display-1 text-center">Projektphase 2!</div>
            <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
            <p class="description md-body-2">In der zweiten Phase deines Projekts geht es um die Spezifikation der Anforderungen.</p>
            <p class="description md-caption">Dokumentiere und visualisiere die Analyseergebnisse (Anforderungen).</p>
            <p class="description md-caption">Diskutiere mit allen Projektteilnehmern über Personas und Dateien.</p>
            <p class="description md-caption">Diskutiere die Organisation des Projekts und sorge für Transparenz.</p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Prozess / 2. Spezifikation</md-chip>
        <phase-files :given-phase="1"></phase-files>

        <p class="text-center"><img src="@/assets/img/phase2.png" class="phase-image" /></p>
        <md-card>
            <md-card-header class="md-title">Nutzungsanforderungen festlegen</md-card-header>
            <md-card-content>
                Bei den meisten Gestaltungsprojekten stellt die Bestimmung der Benutzererfordernisse und die Festlegung der funktionalen und weiteren Anforderungen an das Produkt oder System eine Hauptaktivität dar. Bei der menschzentrierten Gestaltung muss diese Aktivität erweitert werden, um eine klare Darstellung der Nutzungsanforderungen im Zusammenhang mit der Beschreibung des vorgesehenen Nutzungskontexts und der wirtschaftlichen Ziele des Systems zu liefern.
            </md-card-content>
            <md-card-content>
                In Abhängigkeit vom Anwendungsbereich des Systems können die Nutzungsanforderungen Forderungen nach organisatorischen Änderungen und abgeänderten Arbeitsweisen umfassen, und sie können Vorschläge in Bezug auf Möglichkeiten zur Kombination von Produkten und Dienstleistungen unterbreiten. Wenn bekannt ist, dass das vorgeschlagene interaktive System die organisatorische Praxis beeinflussen wird, sollten organisatorische Stakeholder in den Entwicklungsprozess einbezogen werden, um sowohl die organisatorischen als auch die technischen Systeme zu optimieren.
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