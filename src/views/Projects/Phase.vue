<template>
    <z-view class="Phase">
        <md-dialog-confirm
                :md-active.sync="finishPhaseDialogActive"
                :md-title="`Möchtest du Phase ${$zircle.getParams().currentPhase + 1} wirklich beenden?`"
                md-content="Alle Dateien, Kommentare etc. werden weiterhin abrufbar sein."
                md-confirm-text="Okay"
                md-cancel-text="Abbrechen!"
                @md-confirm="onConfirm" />

        <md-dialog-confirm
                :md-active.sync="startPhaseDialogActive"
                :md-title="`Möchtest du Phase ${$zircle.getParams().currentPhase + 1} erneut starten?`"
                md-content="Iterationen sind in einem nutzerzentrierten Prozess notwendig, um entsprechend auf Feedback
                zu reagieren und das Design anzupassen."
                md-confirm-text="Okay"
                md-cancel-text="Abbrechen!"
                @md-confirm="onConfirmStart" />

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
            <md-button class="md-accent md-raised" @click="finishPhaseDialogActive = true" v-if="isAdmin()">
                <md-icon>check</md-icon> Phase abschließen
            </md-button>
        </p>
        <p v-if="(currentProject.phase === 4)">
            <md-button class="md-accent md-raised" @click="startPhaseDialogActive = true" v-if="isAdmin()">
                <md-icon>check</md-icon> Diese Phase starten
            </md-button>
        </p>
    </z-view>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import axios from "axios";

    export default {
        name: "Phase",
        computed: {
            ...mapState('authentication', ['user']),
            ...mapState('projects', ['currentProject'])
        },
        data: () => ({
            finishPhaseDialogActive: false,
            startPhaseDialogActive: false
        }),
        methods: {
            ...mapActions('projects', ['triggerUpdateProjectAction']),
            ...mapActions('messages', ['createMessage']),
            goBack() {
                this.$zircle.goBack();
            },
            onConfirm () {
                const projectToUpdate = JSON.parse(JSON.stringify(this.currentProject));
                projectToUpdate.phase = this.$zircle.getParams().currentPhase + 1;
                if (projectToUpdate.phase === 4 && projectToUpdate.level) {
                    projectToUpdate.level += projectToUpdate.level;
                } else if (projectToUpdate.phase === 4 && !projectToUpdate.level) {
                    projectToUpdate.level = 1;
                }
                this.triggerUpdateProjectAction(projectToUpdate);
                this.finishPhaseDialogActive = false;
                this.createMessage({
                    "projectId": this.currentProject.id,
                    "type": "system",
                    "data": {
                        "text": `${this.user.displayName} hat die Projektphase ${projectToUpdate.phase} abgeschlossen.`
                    }
                });

                axios.post(`https://fcm.googleapis.com/fcm/send`,
                    {
                        "to": `/topics/${this.currentProject.id}`,
                        "notification": {
                            "title": `${this.currentProject.name}`,
                            "body": `${this.user.displayName} hat die Projektphase ${projectToUpdate.phase} abgeschlossen.`,
                            "icon": "./img/icons/android-chrome-192x192.png"
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `key=AAAAoR5OX9Q:APA91bGRAJLk7CIuIaRkVTsTqTKM8wa6vjnTBMzX4BZEis27Da4cJicr4ggkt32blBTUwi7omqmQtEwQIFmTmObsbS0vFs0rx1YRFzGvRvQZzcCs_MO9vwkhYrVQ0RoiiA8fsjjQ91uB`
                        },
                    });
                this.goBack();
            },
            onConfirmStart() {
                const projectToUpdate = JSON.parse(JSON.stringify(this.currentProject));
                projectToUpdate.phase = this.$zircle.getParams().currentPhase;
                if (projectToUpdate.phase === 4 && projectToUpdate.level) {
                    projectToUpdate.level += projectToUpdate.level;
                } else if (projectToUpdate.phase === 4 && !projectToUpdate.level) {
                    projectToUpdate.level = 1;
                }
                this.triggerUpdateProjectAction(projectToUpdate);
                this.startPhaseDialogActive = false;
                this.createMessage({
                    "projectId": this.currentProject.id,
                    "type": "system",
                    "data": {
                        "text": `${this.user.displayName} hat die Projektphase ${projectToUpdate.phase + 1} erneut gestartet.`
                    }
                });

                axios.post(`https://fcm.googleapis.com/fcm/send`,
                    {
                        "to": `/topics/${this.currentProject.id}`,
                        "notification": {
                            "title": `${this.currentProject.name}`,
                            "body": `${this.user.displayName} hat die Projektphase ${projectToUpdate.phase + 1} erneut gestartet.`,
                            "icon": "./img/icons/android-chrome-192x192.png"
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `key=AAAAoR5OX9Q:APA91bGRAJLk7CIuIaRkVTsTqTKM8wa6vjnTBMzX4BZEis27Da4cJicr4ggkt32blBTUwi7omqmQtEwQIFmTmObsbS0vFs0rx1YRFzGvRvQZzcCs_MO9vwkhYrVQ0RoiiA8fsjjQ91uB`
                        },
                    });

                this.goBack();
            },
            isAdmin() {
                return this.currentProject.creator === this.user.id;
            }
        }
    };
</script>

<style scoped>
</style>
