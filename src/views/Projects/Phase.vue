<template>
    <z-view class="Phase">
        <md-dialog-confirm
                :md-active.sync="finishPhaseDialogActive"
                :md-title="`Möchtest du Phase ${$zircle.getParams().currentPhase + 1} wirklich beenden?`"
                md-content="Alle Dateien, Diskussionen etc. werden weiterhin abrufbar sein."
                md-confirm-text="Okay"
                md-cancel-text="Abbrechen!"
                @md-confirm="onConfirm" />

        <p><md-button class="md-icon-button" @click="goBack()"><md-icon>close</md-icon></md-button></p>
        <div class="phase1" v-if="$zircle.getParams().currentPhase == null || $zircle.getParams().currentPhase === 0">
            <p class="md-title">Phase 1: Analyse</p>
            <p class="md-caption">Bereits in Phase 1 können alle Projektteilnehmer einbezogen werden.</p>
        </div>
        <div class="phase2" v-if="$zircle.getParams().currentPhase === 1">
            <p class="md-title">Phase 2: Analyse</p>
            <p class="md-caption">Bereits in Phase 1 können alle Projektteilnehmer einbezogen werden.</p>
        </div>
        <p v-if="(!currentProject.phase && $zircle.getParams().currentPhase === 0) || currentProject.phase === $zircle.getParams().currentPhase">
            <md-button class="md-accent md-raised" @click="finishPhaseDialogActive = true">
                <md-icon>check</md-icon> Phase abschließen
            </md-button>
        </p>
    </z-view>
</template>

<script>
    import { mapActions, mapState } from 'vuex'

    export default {
        name: "Phase",
        computed: {
            ...mapState('projects', ['currentProject'])
        },
        data: () => ({
            finishPhaseDialogActive: false
        }),
        methods: {
            ...mapActions('projects', ['triggerUpdateProjectAction']),
            goBack() {
                this.$zircle.goBack();
            },
            onConfirm () {
                const projectToUpdate = JSON.parse(JSON.stringify(this.currentProject));
                projectToUpdate.phase = this.$zircle.getParams().currentPhase + 1;
                this.triggerUpdateProjectAction(projectToUpdate);
                this.finishPhaseDialogActive = false;
            }
        }
    };
</script>

<style scoped>
</style>
