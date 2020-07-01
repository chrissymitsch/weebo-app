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
        </div>
        <div class="phase2" v-if="$zircle.getParams().currentPhase === 1">
            <p class="md-title">Phase 2: Spezifikation</p>
        </div>
        <div class="phase3" v-if="$zircle.getParams().currentPhase === 2">
            <p class="md-title">Phase 3: Modellierung</p>
        </div>
        <div class="phase4" v-if="$zircle.getParams().currentPhase === 3">
            <p class="md-title">Phase 4: Evaluation</p>
        </div>
        <div class="phase5" v-if="$zircle.getParams().currentPhase === 4">
            <p class="md-title">Endgame: Softwareeinführung</p>
        </div>
        <p v-if="(!currentProject.phase && $zircle.getParams().currentPhase === 0) || currentProject.phase === $zircle.getParams().currentPhase">
            <md-button class="md-accent md-raised" @click="finishPhaseDialogActive = true" v-if="isCreator()">
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
            ...mapState('authentication', ['user']),
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
                this.goBack();
            },
            isCreator() {
                return this.currentProject.creator === this.user.id;
            }
        }
    };
</script>

<style scoped>
</style>
