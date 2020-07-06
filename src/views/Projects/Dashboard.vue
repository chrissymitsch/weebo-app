<template>
    <div class="Dashboard">
        <tutorial-modal tutorialName="Dashboard">
            <div class="md-display-1 text-center">Willkommen in deinem Projekt-Dashboard</div>
            <p class="description"><img src="@/assets/logo.png" width="200" /></p>
            <p class="description md-body-2">
                Hier kannst du den aktuellen Status und einige interessante Details deines Projekts ansehen.
                Über das linke Menü kannst du dich über deine Projektphase informieren und dir alle
                Projektteilnehmer anzeigen lassen.
                Das obere Menü dient dazu, in deiner aktuellen Phase Aktionen auszuführen.
                Schau dich doch mal um, du kannst Aufgaben anlegen, Dateien hochladen, Termine planen und mehr.
            </p>
        </tutorial-modal>

        <md-dialog-confirm
                :md-active.sync="finishPhaseDialogActive"
                :md-title="`Möchtest du Phase ${getCurrentProjectPhase()} wirklich beenden?`"
                md-content="Alle Dateien, Kommentare etc. werden weiterhin abrufbar sein."
                md-confirm-text="Okay"
                md-cancel-text="Abbrechen!"
                @md-confirm="onConfirmFinishPhase" />

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

        <md-card class="welcome-card" v-if="currentProject && currentProject.phase === 1 &&
        (!currentProject.level || currentProject.level < 1)">
            <md-card-content>
                <p class="md-body-2">Neu!</p>
                Ab sofort kannst du dich mit allen Projektteilnehmern im Gruppenchat (Button am unteren rechten Rand)
                unterhalten! Außerdem kannst du nun Personas und Dateien kommentieren.
            </md-card-content>
        </md-card>

        <md-card class="welcome-card" v-if="currentProject && currentProject.level >= 1">
            <md-card-content>
                <p class="md-body-2">Neu!</p>
                Ab sofort kannst du dich im Kreativmodus austoben und Entwürfe, Skizzen, Wireframes o.ä. zeichnen.
            </md-card-content>
        </md-card>

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
                                    <p class="md-subheading">Zuletzt aktualisiert</p>
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
                    <div @click="routeTo('schedules')">
                        <md-ripple>
                            <md-card-header class="md-subheading">
                                <md-icon>insert_invitation</md-icon> Nächster Termin
                            </md-card-header>

                            <md-card-content v-if="getNextEvent().length > 0">
                                <p class="md-body-2">{{format_date(getNextEvent()[0].date)}}</p>
                                <p class="md-body-2">{{getNextEvent()[0].description}}</p>
                                <p class="md-caption">(Noch {{getDaysBetween(getNextEvent()[0].date)}} Tage bis zum Termin)</p>
                            </md-card-content>
                            <md-card-content v-if="getNextEvent().length === 0">
                                <p class="md-body-2">Noch keine Termine erstellt.</p>
                            </md-card-content>
                        </md-ripple>
                    </div>
                </md-card>
            </div>

            <div class="md-layout-item">
                <md-card class="project-status margin8" md-with-hover>
                    <div @click="routeTo('discussion')">
                        <md-ripple>
                            <md-card-header class="md-subheading">
                                <md-icon>message</md-icon> Neuster Beitrag
                            </md-card-header>

                            <md-card-content v-if="getLatestMessage()">
                                <message :message="getLatestMessage()"></message>
                            </md-card-content>
                        </md-ripple>
                    </div>
                </md-card>
            </div>
        </div>


        <div class="md-layout md-gutter welcome-card">
            <div class="md-layout-item md-small-size-100">
                <md-card>
                    <md-card-content>
                        <p class="md-title">Willkommen auf dem Dashboard deines Projekts.</p>
                        <p class="md-body-1">
                            Sieh dir hier an, was du und alle anderen Teilnehmer in dieser Phase alles erledigen
                            können und sollten!
                        </p>
                        <div class="md-layout md-gutter welcome-card">
                            <div class="md-layout-item md-small-size-100 md-body-2">
                                <p v-if="currentProject.phase === 0 || !currentProject.phase">
                                    Analysephase
                                </p>
                                <p v-if="currentProject.phase === 1">
                                    Spezifikationsphase
                                </p>
                                <p v-if="currentProject.phase === 2">
                                    Modellierungsphase
                                </p>
                                <p v-if="currentProject.phase === 3">
                                    Evaluationsphase
                                </p>
                                <p v-if="currentProject.phase === 4">
                                    Anforderungen prüfen
                                </p>
                            </div>
                        </div>
                        <div class="md-layout md-gutter welcome-card">
                            <div class="md-layout-item md-small-size-100">
                                <md-list class="md-dense" v-if="currentProject.phase === 0 || !currentProject.phase">
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="projectMembers.length > 1">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="projectMembers.length <= 1">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Stakeholder einladen</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="getPhaseTasks('Neu').length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="getPhaseTasks('Neu').length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Aufgaben erstellen</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="personas.length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="personas.length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Personas anlegen</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="getPhaseFiles().length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="getPhaseFiles().length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Dateien zur Analyse hochladen</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="events.length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="events.length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Termine planen (z.B. Deadlines, Meilensteine)</span>
                                    </md-list-item>
                                </md-list>
                                <md-list class="md-dense" v-if="currentProject.phase === 1">
                                    <md-list-item>
                                        <md-icon class="md-accent"
                                                 v-if="getPhaseTasks('In Bearbeitung').length > 0 || getPhaseTasks('Geschafft!').length > 0">
                                            check_box
                                        </md-icon>
                                        <md-icon class="md-accent"
                                                 v-if="getPhaseTasks('In Bearbeitung').length <= 0 && getPhaseTasks('Geschafft!').length <= 0">
                                            check_box_outline_blank
                                        </md-icon>
                                        <span class="md-list-item-text">Aufgaben bearbeiten und beenden</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="getPersonaMessages().length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="getPersonaMessages().length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Personas diskutieren</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="getPhaseFiles().length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="getPhaseFiles().length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Dateien hochladen und diskutieren (z.B. Anforderungen)</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="events.length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="events.length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Weitere Termine planen (z.B. Deadlines, Meilensteine)</span>
                                    </md-list-item>
                                </md-list>
                                <md-list class="md-dense" v-if="currentProject.phase === 2">
                                    <md-list-item>
                                        <md-icon class="md-accent"
                                                 v-if="getPhaseTasks('In Bearbeitung').length > 0 || getPhaseTasks('Geschafft!').length > 0">
                                            check_box
                                        </md-icon>
                                        <md-icon class="md-accent"
                                                 v-if="getPhaseTasks('In Bearbeitung').length <= 0 && getPhaseTasks('Geschafft!').length <= 0">
                                            check_box_outline_blank
                                        </md-icon>
                                        <span class="md-list-item-text">Aufgaben bearbeiten und beenden</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="getPhaseFiles().length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="getPhaseFiles().length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Dateien hochladen und an alle vermitteln (z.B. Prototypen, Wireframes)</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="events.length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="events.length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Weitere Termine planen (z.B. User-Test)</span>
                                    </md-list-item>
                                </md-list>
                                <md-list class="md-dense" v-if="currentProject.phase === 3">
                                    <md-list-item>
                                        <md-icon class="md-accent"
                                                 v-if="getPhaseTasks('In Bearbeitung').length > 0 || getPhaseTasks('Geschafft!').length > 0">
                                            check_box
                                        </md-icon>
                                        <md-icon class="md-accent"
                                                 v-if="getPhaseTasks('In Bearbeitung').length <= 0 || getPhaseTasks('Geschafft!').length <= 0">
                                            check_box_outline_blank
                                        </md-icon>
                                        <span class="md-list-item-text">Aufgaben bearbeiten und beenden</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="getPhaseFiles().length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="getPhaseFiles().length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Dateien hochladen und diskutieren (z.B. Testergebnisse)</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent" v-if="events.length > 0">check_box</md-icon>
                                        <md-icon class="md-accent" v-if="events.length <= 0">check_box_outline_blank</md-icon>
                                        <span class="md-list-item-text">Termine planen (z.B. User-Test, Deadlines)</span>
                                    </md-list-item>
                                </md-list>
                                <md-list class="md-dense" v-if="currentProject.phase === 4">
                                    <md-list-item>
                                        <md-icon class="md-accent"
                                                 v-if="getPhaseTasks('Neu').length > 0 || getPhaseTasks('Geschafft!').length > 0">
                                            check_box
                                        </md-icon>
                                        <md-icon class="md-accent"
                                                 v-if="getPhaseTasks('Neu').length <= 0 || getPhaseTasks('Geschafft!').length <= 0">
                                            check_box_outline_blank
                                        </md-icon>
                                        <span class="md-list-item-text">Aufgaben beenden oder neue erstellen</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent">help</md-icon>
                                        <span class="md-list-item-text">Anforderungen prüfen und Prozessphasen erneut durchlaufen</span>
                                    </md-list-item>
                                    <md-list-item>
                                        <md-icon class="md-accent">help</md-icon>
                                        <span class="md-list-item-text">Maßnahmen für den nutzerzentrierten Softwareeinführungsprozess ergreifen</span>
                                    </md-list-item>
                                </md-list>
                            </div>
                        </div>
                    </md-card-content>
                    <md-card-actions>
                        <md-button class="md-accent md-raised" @click="finishPhaseDialogActive = true"
                                   v-if="isAdmin() && (!currentProject.phase || currentProject.phase < 4)">
                            <md-icon>check</md-icon> Phase abschließen
                        </md-button>
                    </md-card-actions>
                </md-card>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import moment from 'moment';
    import Modal from "../../components/Modal";
    import Avatar from "../../components/users/Avatar";
    import Message from "../../components/messages/Message";
    import TutorialModal from "../../components/rewards/TutorialModal";

    export default {
        computed: {
            ...mapState('authentication', ['user']),
            ...mapState('messages', ['messages']),
            ...mapState('projects', ['currentProject', 'projectMembers']),
            ...mapState('tasks', ['tasks']),
            ...mapState('personas', ['personas']),
            ...mapState('files', ['files']),
            ...mapState('events', ['events'])
        },
        components: {
            TutorialModal,
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
            congratulationsModalActive: false,
            finishPhaseDialogActive: false
        }),
        methods: {
            ...mapActions('projects', ['triggerUpdateProjectAction']),
            ...mapActions('messages', ['createMessage']),
            format_date(value) {
                if (value) {
                    return (moment(value).format('DD.MM.YYYY'));
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
            },
            isAdmin() {
                return this.currentProject.creator === this.user.id;
            },
            getCurrentProjectPhase() {
                if (this.currentProject.phase) {
                    return this.currentProject.phase + 1;
                }
                return 1;
            },
            onConfirmFinishPhase () {
                const projectToUpdate = JSON.parse(JSON.stringify(this.currentProject));
                projectToUpdate.phase = this.getCurrentProjectPhase();
                if (projectToUpdate.phase === 4 && projectToUpdate.level) {
                    projectToUpdate.level += projectToUpdate.level;
                } else if (projectToUpdate.phase === 4 && !projectToUpdate.level) {
                    projectToUpdate.level = 1;
                }
                this.createMessage({
                    "projectId": this.currentProject.id,
                    "type": "system",
                    "data": {
                        "text": `${this.user.displayName} hat die Projektphase "${this.getCurrentProjectPhase()}" abgeschlossen.`
                    }
                });
                this.triggerUpdateProjectAction(projectToUpdate);
                this.finishPhaseDialogActive = false;
            },
            getPhaseTasks(status) {
                let phase = 1;
                if (this.currentProject.phase) {
                    phase = Number(this.currentProject.phase);
                }
                return this.tasks.filter(task => (Number(task.type) === phase + 1) && task.column === status);
            },
            getPhaseFiles() {
                return this.files.filter(file => file.phase === (this.currentProject.phase || 0));
            },
            getPersonaMessages() {
                return this.messages.filter(message => message.type === "personaComment");
            },
            sortEventsList(list) {
                function compare(a, b) {
                    if (moment(a.date).isBefore(b.date))
                        return -1;
                    if (moment(a.date).isAfter(b.date))
                        return 1;
                    return 0;
                }
                return list.sort(compare);
            },
            getNextEvent() {
                const filteredEvents = [];
                for (let i = 0; i < this.events.length; i += 1) {
                    if (this.events[i].dates && this.events[i].dates.start) {
                        if (moment(this.events[i].dates.start).isValid() &&
                            moment().isBefore(moment(this.events[i].dates.start))) {
                            filteredEvents.push({
                                date: moment(this.events[i].dates.start),
                                description: this.events[i].description
                            });
                        } else if (!moment(this.events[i].dates.start).isValid() &&
                            moment().isBefore(moment.unix(this.events[i].dates.start.seconds))) {
                            filteredEvents.push({
                                date: moment.unix(this.events[i].dates.start.seconds),
                                description: this.events[i].description
                            });
                        }
                    } else if (this.events[i].dates && !this.events[i].dates.start) {
                        if (moment(this.events[i].dates).isValid() &&
                            moment().isBefore(moment(this.events[i].dates))) {
                            filteredEvents.push({
                                date: moment(this.events[i].dates),
                                description: this.events[i].description
                            });
                        } else if (!moment(this.events[i].dates).isValid() &&
                            moment().isBefore(moment.unix(this.events[i].dates.seconds))) {
                            filteredEvents.push({
                                date: moment.unix(this.events[i].dates.seconds),
                                description: this.events[i].description
                            });
                        }
                    }
                }
                if (filteredEvents.length > 0) {
                    return this.sortEventsList(filteredEvents);
                }
                return filteredEvents;
            },
            getDaysBetween(date) {
                return date.diff(moment(), 'days') + 1;
            }
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
                    if (newValue.phase !== oldValue.phase && (!newValue.level || newValue.level < 1)) {
                        this.congratulationsModalActive = true;
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/theme/variables.scss';

    .welcome-card {
        margin-top: 24px;
        margin-bottom: 24px;
    }

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