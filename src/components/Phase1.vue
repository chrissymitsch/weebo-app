<template>
    <z-view class="Phase1">
        <md-dialog-confirm
                :md-active.sync="finishPhaseDialogActive"
                md-title="Möchtest du Phase 1 wirklich beenden?"
                md-content="Alle Dateien, Diskussionen etc. werden weiterhin abrufbar sein."
                md-confirm-text="Okay"
                md-cancel-text="Abbrechen!"
                @md-confirm="onConfirm" />

        <p><md-button class="md-icon-button" @click="goBack()"><md-icon>close</md-icon></md-button></p>
        <p class="md-title">Phase 1: Analyse</p>
        <p class="md-caption">Bereits in Phase 1 können alle Projektteilnehmer einbezogen werden.</p>
        <p v-if="currentProject.phase === 0">
            <md-button class="md-accent" @click="finishPhaseDialogActive = true">
                <md-icon>check</md-icon> Phase abschließen
            </md-button>
        </p>
    </z-view>
</template>

<script>
    import { mapActions, mapState } from 'vuex'

    export default {
        name: "Phase1",
        computed: {
            ...mapState('projects', ['currentProject'])
        },
        data: () => ({
            finishPhaseDialogActive: false
        }),
        methods: {
            ...mapActions('projects', ['triggerFinishPhaseAction']),
            goBack() {
                this.$zircle.goBack();
            },
            onConfirm () {
                const projectToUpdate = this.currentProject;
                projectToUpdate.phase = 1;
                this.triggerFinishPhaseAction(projectToUpdate);
                this.finishPhaseDialogActive = false;
            }
        }
    };
</script>

<style scoped>
</style>
