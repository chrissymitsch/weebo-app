<template>
    <div class="ProjectSettings">
        <tutorial-modal tutorialName="Settings">
            <div class="md-display-1 text-center">Verwalte die Einstellungen deines Projekts!</div>
            <p class="description"><img src="@/assets/img/ufo.png" width="200" /></p>
            <p class="description md-body-2">
                Du kannst jederzeit den Namen deines Projekts und die Rechte der Teilnehmer verwalten.
            </p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Einstellungen</md-chip>
        <form novalidate class="md-layout" @submit.prevent="null">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label>Projektname</label>
                                <md-input name="name" id="name" />
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-card-actions>
                    <md-button type="submit" class="md-primary">Projekt speichern</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import TutorialModal from "../../components/rewards/TutorialModal";

    export default {
        computed: {
            ...mapState('projects', ['currentProject'])
        },
        components: {TutorialModal}
    };
</script>

<style lang="scss" scoped>
    .md-card {
        display: inline-block;
        vertical-align: top;

        .md-card-content .md-list-item-container {
            font-size: 12px;
        }
    }

    .md-list-item-content {
        min-height: 12px;
    }

    .md-button {
        min-width: 128px;
    }

    .md-button.btn-whatsapp {
        background-color: #2CB742!important;
    }

    .md-button.btn-telegram {
        background-color: #2FA6DA!important;
    }
</style>