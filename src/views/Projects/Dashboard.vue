<template>
    <div class="Dashboard">
        <rewarding :showModal="rewardModalActive" @closeModal="rewardModalActive=false" size="large">
            <md-progress-spinner v-if="!tutorialSaved" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            <div v-if="tutorialSaved">
                <div class="md-display-1">Verwalte dein Projekt</div>
                <p class="description md-body-2">
                    Lade alle Beteiligten zur Zusammenarbeit ein, Plane Aufgaben und Termine
                    und durchlaufe den nutzerzentrierten Design-Prozess gemeinsam!
                </p>
                <p class="description"><img src="@/assets/img/stern.png" /></p>
                <p class="description md-body-2">
                    Sammle Punkte und Auszeichnungen, um mehr Funktionen freizuschalten!
                </p>
            </div>
        </rewarding>

        <md-chip>{{ project.name }} / Dashboard</md-chip>

        <md-card md-with-hover>
            <md-card-content>
                <z-canvas :views="$options.components"></z-canvas>
            </md-card-content>
        </md-card>

        <md-card class="process-step" md-with-hover>
            <md-ripple>
                <md-card-header>
                    <div class="md-title">Projektstatus</div>
                </md-card-header>

                <md-card-content>
                    Level 1
                </md-card-content>
            </md-ripple>
        </md-card>

        <p></p>

        <div class="md-layout">
            <div class="md-layout-item">
                <md-card class="process-step md-accent" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title">Phase 1</div>
                            <div class="md-subhead">Analyse</div>
                        </md-card-header>

                        <md-card-actions>
                            <router-link :to="{ name: 'project-phase1' }">
                                <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                            </router-link>
                            <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card class="process-step" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title">Phase 2</div>
                            <div class="md-subhead">Spezifikation</div>
                        </md-card-header>

                        <md-card-actions>
                            <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                            <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card class="process-step" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title">Phase 3</div>
                            <div class="md-subhead">Modellierung</div>
                        </md-card-header>

                        <md-card-actions>
                            <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                            <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
            <div class="md-layout-item">
                <md-card class="process-step" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                            <div class="md-title">Phase 4</div>
                            <div class="md-subhead">Evaluation</div>
                        </md-card-header>

                        <md-card-actions>
                            <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                            <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                        </md-card-actions>
                    </md-ripple>
                </md-card>
            </div>
        </div>
        <p></p>
        <md-card class="process-step" md-with-hover>
            <md-ripple>
                <md-card-media md-small>
                    <img src="@/assets/img/pokal.png" alt="Pokal">
                </md-card-media>

                <md-card-header>
                    <div class="md-title">ENDGAME</div>
                    <div class="md-subhead">Softwareeinführung</div>
                </md-card-header>

                <md-card-actions>
                    <md-button class="md-icon-button"><md-icon>search</md-icon></md-button>
                    <md-button class="md-icon-button"><md-icon>done</md-icon></md-button>
                </md-card-actions>
            </md-ripple>
        </md-card>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import Rewarding from "../../components/Rewarding";

    export default {
        computed: {
            ...mapState('rewards', ['tutorials'])
        },
        components: {
            Rewarding,
            /* eslint-disable vue/no-unused-components */
            ProcessCircle: () => import('../../components/ProcessCircle'),
            Phase1: ()  => import('../../components/Phase1'),
            Phase2: ()  => import('../../components/Phase2'),
            Phase3: ()  => import('../../components/Phase3'),
            Phase4: ()  => import('../../components/Phase4'),
        },
        props: {
            project: Object
        },
        data: () => ({
            tutorialSaved: false,
            rewardModalActive: false,
        }),
        methods: {
            triggerReward() {
                const checkIfUserHasTutorialFinished = this.tutorials.filter(function(elem) {
                    if(elem.name === "Dashboard") return elem;
                    return null;
                });
                if (checkIfUserHasTutorialFinished.length > 0) {
                    this.rewardModalActive = false;
                } else {
                    this.rewardModalActive = true;
                    const tutorial = {
                        name: "Dashboard",
                        type: "tutorial"
                    };
                    this.$store.dispatch('rewards/createFinishedTutorial', tutorial).then(() => {
                        this.tutorialSaved = true;
                    });
                }
            }
        },
        created() {
            setTimeout(function () { this.triggerReward() }.bind(this), 1000);
        },
        mounted () {
            this.$zircle.config({
                style: {
                    theme: 'zircle',
                    mode: 'light'
                }
            });
            this.$zircle.setView('ProcessCircle');
        }
    }
</script>

<style lang="scss" scoped>
    .z-canvas {
        position: relative;
        width: 100%;
        height: 350px;
    }

    .theme-zircle {
        --shade-color: white;
        --primary-color: rgba(0, 0, 0, .3);
        --accent-color: #17b2e8;
    }
    .spots-enter {
        transform: scale(0);
        transition: transform 2s
    }
    .spots-enter-active {
        transform: scale(1);
        transition: transform 2s
    }

    .process-step {
        max-height: 100px;

        .md-ripple {
            display: flex;
            justify-content: space-between;

            .md-card-media {
                padding: 8px;

                img {
                    width: 50px;
                }
            }

            .md-card-header {
                padding: 8px;
                margin-top: 0;
                max-width: 50%;

                .md-title {
                    margin-top: 0;
                    font-size: 16px;
                }
            }

            .md-card-actions {
                max-width: 50%;
            }
        }
    }
</style>