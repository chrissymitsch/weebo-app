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


        <Modal :showModal="congratulationsModalActive" @closeModal="congratulationsModalActive=false" size="large">
            <md-empty-state
                    md-label="Glückwunsch!"
                    md-icon="verified"
                    md-description="Du hast die Phase abgeschlossen! Alle Dateien, die darin erstellt wurden,
                        sind weiterhin über die Prozesshistorie erreichbar.
                        Je nach Phase kannst du nun neue Funktionen benutzen!">
            </md-empty-state>
        </Modal>


        <md-chip>{{ currentProject.name }} / Dashboard</md-chip>

        <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <z-canvas :views="$options.components"></z-canvas>
            </div>

            <div class="md-layout-item">
                <md-card class="project-status margin8" md-with-hover>
                    <md-ripple>
                        <md-card-header class="md-subheading">
                            <md-icon>favorite_border</md-icon> Mitarbeiter des Monats
                        </md-card-header>
                        <md-card-content class="text-center" v-if="getMemberOfTheMonth().winnerScore < 1">
                            <p class="md-body-2">
                                Noch niemand.
                            </p>
                        </md-card-content>
                        <md-card-content class="text-center" v-if="getMemberOfTheMonth().winnerScore > 0">
                            <avatar :user-id="getMemberOfTheMonth().winner"></avatar>
                            <p class="md-body-2">
                                Mit {{getMemberOfTheMonth().winnerScore}}x <i>Danke</i>
                            </p>
                        </md-card-content>
                    </md-ripple>
                </md-card>

                <md-card class="project-status margin8" md-with-hover>
                    <div @click="routeTo('tasks')">
                        <md-ripple>
                            <md-card-header class="md-subheading">
                                <md-icon>list</md-icon> Offene Aufgaben
                            </md-card-header>

                            <md-card-content>
                                <div class="md-layout md-gutter profile-stats">
                                    <div class="md-layout-item text-center">
                                        <p class="md-subheading">{{getOpenTasks('all')}}</p>
                                        <p class="md-caption">GESAMT</p>
                                    </div>
                                    <div class="md-layout-item text-center">
                                        <p class="md-subheading">{{getOpenTasks(currentProject.phase)}}</p>
                                        <p class="md-caption opentasks-phasename" v-if="!currentProject.phase">{{phaseNameMappings["0"]}}</p>
                                        <p class="md-caption opentasks-phasename" v-if="currentProject.phase">{{phaseNameMappings[currentProject.phase]}}</p>
                                    </div>
                                    <div class="md-layout-item text-center">
                                        <p class="md-subheading">{{getOpenTasks('other')}}</p>
                                        <p class="md-caption">ALLGEMEIN</p>
                                    </div>
                                </div>
                            </md-card-content>
                        </md-ripple>
                    </div>
                </md-card>

                <md-card class="project-status margin8" md-with-hover>
                    <md-ripple>
                        <md-card-content>
                            <div class="md-layout md-gutter profile-stats">
                                <div class="md-layout-item text-center">
                                    <p class="md-subheading">Letzte Aktivität</p>
                                    <p class="md-caption">{{format_unix_date(currentProject.updateTimestamp.seconds)}}</p>
                                </div>
                                <div class="md-layout-item text-center">
                                    <p class="md-subheading">Neustes Mitglied</p>
                                    <p class="md-caption">
                                        <avatar :user-id="currentProject.members[currentProject.members.length - 1]"></avatar>
                                    </p>
                                </div>
                            </div>
                        </md-card-content>
                    </md-ripple>
                </md-card>

            </div>
        </div>
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <md-card class="project-status margin8" md-with-hover>
                    <md-ripple>
                        <md-card-header class="md-subheading">
                            14
                        </md-card-header>

                        <md-card-content>
                            Noch 13 Tage bis
                            <p class="md-display-1">Usability-Test</p>
                        </md-card-content>
                    </md-ripple>
                </md-card>
            </div>

            <div class="md-layout-item">
                <md-card class="project-status margin8" md-with-hover>
                    <div @click="routeTo('discussion')">
                        <md-ripple>
                            <md-card-header class="md-subheading">
                                Neuste Beiträge
                            </md-card-header>

                            <md-card-content v-if="getLatestMessage()">
                                <message :message="getLatestMessage()"></message>
                            </md-card-content>
                        </md-ripple>
                    </div>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import moment from 'moment';
    import Modal from "../../components/Modal";
    import Avatar from "../../components/users/Avatar";
    import Message from "../../components/projects/Message";

    export default {
        computed: {
            ...mapState('messages', ['messages']),
            ...mapState('rewards', ['tutorials']),
            ...mapState('projects', ['currentProject', 'projectMembers']),
            ...mapState('tasks', ['tasks'])
        },
        components: {
            Message,
            Avatar,
            Modal,
            /* eslint-disable vue/no-unused-components */
            ProcessCircle: () => import('../../components/projects/ProcessCircle'),
            Phase: () => import('./Phase')
        },
        data: () => ({
            tutorialSaved: false,
            rewardModalActive: false,
            phaseNameMappings: {
                "0": "ANALYSE",
                "1": "SPEZIFIKATION",
                "2": "MODELLIERUNG",
                "3": "EVALUATION",
                "4": "SOFTWAREEINFÜHRUNG"
            },
            congratulationsModalActive: false
        }),
        methods: {
            triggerReward() {
                const checkIfUserHasTutorialFinished = this.tutorials.filter(function (elem) {
                    if (elem.name === "Dashboard") return elem;
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
            format_date(value) {
                if (value) {
                    return (moment(value).format('DD.MM.YYYY, HH:mm')).concat(" Uhr");
                }
                return '';
            },
            format_unix_date(value) {
                if (value) {
                    return (moment.unix(value).format('DD.MM.YYYY, HH:mm')).concat(" Uhr");
                }
                return '';
            },
            getOpenTasks(type) {
                if (type === 'all') {
                    return this.tasks.filter(task => task.column === "Neu").length;
                }
                if (type === 'other') {
                    return this.tasks.filter(task => task.type === "0" && task.column === "Neu").length;
                }
                if (!type) {
                    return this.tasks.filter(task => task.type === "1" && task.column === "Neu").length;
                }
                return this.tasks.filter(task => task.type === (Number(type) + 1).toString() && task.column === "Neu").length;
            },
            routeTo(route) {
                this.$router.push(route);
            },
            getLatestMessage() {
                return this.messages.filter(message => message.id === this.currentProject.newMessage)[0];
            },
            getMemberOfTheMonth() {
                const thisMonth = moment().format("MM").toString();
                const thisYear = moment().year().toString();
                const searchString = thisMonth.concat(".").concat(thisYear);
                const allScores = [];
                const allMembers = [];
                this.projectMembers.filter(member => {
                    let memberScores = 0;
                    if (member.thankYou) {
                        const scoresToCount = member.thankYou.filter(thanks => thanks.date.includes(searchString) && thanks.projectId === this.currentProject.id);
                        for (let i = 0; i < scoresToCount.length; i += 1) {
                            memberScores += Number(scoresToCount[i].score);
                        }
                    }
                    allScores.push(memberScores);
                    allMembers.push(member.id);
                    return true;
                });
                const maxScore = allScores.indexOf(Math.max(...allScores));
                return {"winner": allMembers[maxScore], "winnerScore": Math.max(...allScores)};
            }
        },
        created() {
            setTimeout(function () {
                this.triggerReward()
            }.bind(this), 1000);
        },
        mounted() {
            this.$zircle.config({
                style: {
                    theme: 'zircle',
                    mode: 'light'
                }
            });
            this.$zircle.setView('ProcessCircle');
        },
        watch: {
            currentProject(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (newValue.phase !== oldValue.phase) {
                        this.congratulationsModalActive = true;
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/theme/variables.scss';

    .opentasks-phasename {
        word-break: break-all;
    }

    .z-canvas {
        position: relative;
        width: 100%;
        height: 350px;
        background-color: $light-grey-color;
    }

    .z-label {
        font-size: 12px;
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
</style>