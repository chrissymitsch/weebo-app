<template>
    <div class="Dashboard">
        <Modal :showModal="rewardModalActive" @closeModal="rewardModalActive=false" size="large">
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
        </Modal>

        <md-chip>{{ currentProject.name }} / Dashboard</md-chip>

        <md-card class="project-status margin8" md-with-hover>
            <md-ripple>
                <md-card-header>
                    <div class="md-title">Projektstatus</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <p class="md-body-2" v-if="currentProject.level">Level {{currentProject.level}}</p>
                            <p class="md-body-2" v-if="!currentProject.level">Level 1</p>
                            <md-progress-bar class="md-accent" md-mode="determinate" :md-value="currentProject.phase * 25"></md-progress-bar>
                        </div>
                        <div class="md-layout-item">
                            <p class="md-body-2">Letzte Aktivität: {{format_unix_date(currentProject.updateTimestamp.seconds)}}</p>
                            <p class="md-body-2">Teilnehmer: {{currentProject.members.length}}</p>
                            <p class="md-body-2">Offene Aufgaben: XYZ</p>
                        </div>
                    </div>
                </md-card-content>
            </md-ripple>
        </md-card>

        <md-card md-with-hover>
            <md-card-content>
                <z-canvas :views="$options.components"></z-canvas>
            </md-card-content>
        </md-card>


    </div>
</template>

<script>
    import {mapState} from "vuex";
    import moment from 'moment';
    import Modal from "../../components/Modal";

    export default {
        computed: {
            ...mapState('rewards', ['tutorials']),
            ...mapState('projects', ['currentProject'])
        },
        components: {
            Modal,
            /* eslint-disable vue/no-unused-components */
            ProcessCircle: () => import('../../components/projects/ProcessCircle'),
            Phase: ()  => import('./Phase')
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
            },
            format_unix_date(value){
                if (value) {
                    return (moment.unix(value).format('DD.MM.YYYY, HH:mm')).concat(" Uhr");
                }
                return '';
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
    @import '@/theme/variables.scss';

    .z-canvas {
        position: relative;
        width: 100%;
        height: 350px;
    }

    .theme-zircle {
        --shade-color: white;
        --primary-color: rgba(0, 0, 0, .3);
        --accent-color: #039BE5;
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

    .project-status .md-card-header {
        background: $vue-color;
    }
</style>