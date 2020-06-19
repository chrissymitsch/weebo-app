<template>
    <div class="ProjectSettings">
        <rewarding :showModal="rewardModalActive" @closeModal="rewardModalActive=false" size="large">
            <md-progress-spinner v-if="!tutorialSaved" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            <div v-if="tutorialSaved">
                <div class="md-display-1">Verwalte die Einstellungen deines Projekts!</div>
                <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
                <p class="description md-body-2">
                    Du kannst jederzeit den Namen deines Projekts, die Rechte der Teilnehmer und alle weiteren Infos verwalten.
                </p>
            </div>
        </rewarding>

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
    import Rewarding from "../../components/Rewarding";

    export default {
        computed: {
            ...mapState('rewards', ['tutorials']),
            ...mapState('projects', ['currentProject'])
        },
        components: {Rewarding},
        data: () => ({
            tutorialSaved: false,
            rewardModalActive: false
        }),
        created() {
            setTimeout(function () { this.triggerReward() }.bind(this), 1000);
        },
        methods: {
            triggerReward() {
                const checkIfUserHasTutorialFinished = this.tutorials.filter(function(elem) {
                    if(elem.name === "Settings") return elem;
                    return null;
                });
                if (checkIfUserHasTutorialFinished.length > 0) {
                    this.rewardModalActive = false;
                } else {
                    this.rewardModalActive = true;
                    const tutorial = {
                        name: "Settings",
                        type: "tutorial"
                    };
                    this.$store.dispatch('rewards/createFinishedTutorial', tutorial).then(() => {
                        this.tutorialSaved = true;
                    });
                }
            }
        }
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