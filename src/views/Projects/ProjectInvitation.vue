<template>
    <div class="ProjectInvitation">
        <rewarding :showModal="rewardModalActive" @closeModal="rewardModalActive=false" size="large">
            <md-progress-spinner v-if="!tutorialSaved" class="md-accent" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            <div v-if="tutorialSaved">
                <div class="md-display-1">Nimm alle mit an Board!</div>
                <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
                <p class="description md-body-2">
                    Lade alle Beteiligten zur Zusammenarbeit ein, indem du eine Einladung per E-Mail, SMS, WhatsApp,
                    Telegram oder per Direktlink verschickst! Sobald eine Einladung angenommen wurde, wird die Liste
                    der Projektteilnehmer aktualisiert.
                </p>
            </div>
        </rewarding>

        <md-chip>{{ currentProject.name }} / Einladung verschicken</md-chip>

        <md-empty-state
                md-label="Nimm alle mit an Board!"
                md-description="Teile dein Projekt mit Team-Mitgliedern, Kunden, Auftraggebern, usw., damit du
                Weebo als Kollaborations-Tool für dein Projekt nutzen kannst.">
            <md-avatar class="md-large md-accent"><img src="@/assets/img/rakete.png" /></md-avatar>
        </md-empty-state>
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-layout md-gutter">
                <div class="md-layout-item">
                    <ShareNetwork
                            network="email"
                            :url="invitationLink"
                            :title="`Einladung für Projekt ${ currentProject.name }!`"
                            :description="`Du hast eine Einladung für das Projekt ${ currentProject.name } erhalten. Klicke auf den Link oder kopiere ${ invitationLink } in den Browser!`">
                        <md-button class="md-raised md-primary">
                            <md-icon>mail_outline</md-icon>
                            <span>E-Mail</span>
                        </md-button>
                    </ShareNetwork>
                </div>
                <div class="md-layout-item">
                    <ShareNetwork
                            network="sms"
                            :url="invitationLink"
                            :title="`Einladung für Projekt ${ currentProject.name }!`"
                            :description="`Du hast eine Einladung für das Projekt ${ currentProject.name } erhalten.`">
                        <md-button class="md-raised md-primary">
                            <md-icon>sms</md-icon>
                            <span>SMS</span>
                        </md-button>
                    </ShareNetwork>
                </div>
                <div class="md-layout-item">
                    <ShareNetwork
                            network="whatsapp"
                            :url="invitationLink"
                            :title="`Einladung für Projekt ${ currentProject.name }!`"
                            :description="`Du hast eine Einladung für das Projekt ${ currentProject.name } erhalten.`">
                        <md-button class="md-raised md-primary btn-whatsapp">
                            <img class="button-logo" alt="" src="@/assets/img/WhatsApp.svg" />
                            <span>WhatsApp</span>
                        </md-button>
                    </ShareNetwork>
                </div>
                <div class="md-layout-item">
                    <ShareNetwork
                            network="telegram"
                            :url="invitationLink"
                            :title="`Einladung für Projekt ${ currentProject.name }!`"
                            :description="`Du hast eine Einladung für das Projekt ${ currentProject.name } erhalten.`">
                        <md-button class="md-raised md-primary btn-telegram">
                            <img class="button-logo" alt="" src="@/assets/img/Telegram_logo.svg" />
                            <span>Telegram</span>
                        </md-button>
                    </ShareNetwork>
                </div>
            </div>
        </div>
        <md-field>
            <label>Einladungslink</label>
            <md-input id="invitationLink" v-model="invitationLink" />
            <md-button @click.stop.prevent="copyLink">Kopieren</md-button>
        </md-field>

        <div class="md-layout md-gutter">
            <div class="md-layout-item md-layout md-gutter">
                <div class="md-layout-item">
                    <md-card class="md-accent">
                        <md-card-content>
                            <md-list class="md-accent">
                                <md-subheader>Du (Admin)</md-subheader>

                                <md-list-item>
                                    <md-icon class="md-accent">check_box</md-icon>
                                    <span class="md-list-item-text">Projekte anlegen / bearbeiten / löschen</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-icon class="md-accent">check_box</md-icon>
                                    <span class="md-list-item-text">Einladungslink versenden</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-icon class="md-accent">check_box</md-icon>
                                    <span class="md-list-item-text">Teilnehmer verwalten</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-icon class="md-accent">check_box</md-icon>
                                    <span class="md-list-item-text">Dokumente hochladen</span>
                                </md-list-item>
                            </md-list>
                        </md-card-content>
                    </md-card>
                </div>
                <div class="md-layout-item">
                    <md-card class="md-accent">
                        <md-card-content>
                            <md-list class="md-accent">
                                <md-subheader>Eingeladene Projektteilnehmer</md-subheader>

                                <md-list-item>
                                    <md-icon class="md-accent">check_box_outline_blank</md-icon>
                                    <span class="md-list-item-text">Projekte anlegen / bearbeiten / löschen</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-icon class="md-accent">check_box_outline_blank</md-icon>
                                    <span class="md-list-item-text">Einladungslink versenden</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-icon class="md-accent">check_box_outline_blank</md-icon>
                                    <span class="md-list-item-text">Teilnehmer verwalten</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-icon class="md-accent">check_box</md-icon>
                                    <span class="md-list-item-text">Dokumente hochladen</span>
                                </md-list-item>
                            </md-list>
                        </md-card-content>
                    </md-card>
                </div>
            </div>
        </div>
        <md-snackbar :md-active.sync="copied">Link in Zwischenablage kopiert.</md-snackbar>
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
            invitationLink: null,
            copied: false,
            tutorialSaved: false,
            rewardModalActive: false
        }),
        created() {
            this.makeInvitationLink(this.currentProject.id);
            setTimeout(function () { this.triggerReward() }.bind(this), 1000);
        },
        methods: {
            makeInvitationLink(projectId) {
                this.invitationLink = `${window.location.protocol}//${window.location.host}/invitation/${ projectId }`
            },
            copyLink() {
                const copyText = document.getElementById("invitationLink");

                copyText.select();
                copyText.setSelectionRange(0, 99999);

                document.execCommand("copy");
                this.copied = true;
            },
            triggerReward() {
                const checkIfUserHasTutorialFinished = this.tutorials.filter(function(elem) {
                    if(elem.name === "Invitation") return elem;
                    return null;
                });
                if (checkIfUserHasTutorialFinished.length > 0) {
                    this.rewardModalActive = false;
                } else {
                    this.rewardModalActive = true;
                    const tutorial = {
                        name: "Invitation",
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