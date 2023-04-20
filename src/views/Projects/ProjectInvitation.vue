<template>
    <div class="ProjectInvitation">
        <tutorial-modal tutorialName="Invitation">
            <div class="md-display-1 text-center">Nimm alle mit an Board!</div>
            <p class="description"><img src="@/assets/img/rakete.png" width="200" /></p>
            <p class="description md-body-2">
                Lade alle Projektbeteiligten zur Zusammenarbeit ein, indem du eine Einladung per E-Mail, SMS, WhatsApp,
                Telegram oder per Direktlink verschickst! Sobald eine Einladung angenommen wurde, wird die Liste
                der Projektteilnehmer aktualisiert.
            </p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Einladung verschicken</md-chip>

        <md-empty-state
                md-label="Nimm alle mit an Board!"
                md-description="Teile dein Projekt mit Team-Mitgliedern, Kunden, Auftraggebern usw., damit du
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
                            :title="`Du hast eine Einladung für das Projekt ${ currentProject.name } erhalten.`">
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
                            :title="`Du hast eine Einladung für das Projekt ${ currentProject.name } erhalten.`">
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
                            :title="`Du hast eine Einladung für das Projekt ${ currentProject.name } erhalten.`">
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

        <md-card>
            <md-card-header>
                <p class="md-body-2">Übersicht über einige wichtige Funktionalitäten</p>
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                        <md-list class="md-dense">
                            <md-subheader>Du (Admin)</md-subheader>
                            <md-list-item>
                                <md-icon class="md-accent">check_box</md-icon>
                                <span class="md-list-item-text">Projekte anlegen / bearbeiten / löschen</span>
                            </md-list-item>
                            <md-list-item>
                                <md-icon class="md-accent">check_box</md-icon>
                                <span class="md-list-item-text">Projekte abonnieren und entfernen</span>
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
                            <md-list-item>
                                <md-icon class="md-accent">check_box</md-icon>
                                <span class="md-list-item-text">Termine erstellen / bearbeiten / löschen</span>
                            </md-list-item>
                            <md-list-item>
                                <md-icon class="md-accent">check_box</md-icon>
                                <span class="md-list-item-text">Gruppenchat nutzen</span>
                            </md-list-item>
                            <md-list-item>
                                <md-icon class="md-accent">check_box</md-icon>
                                <span class="md-list-item-text">Personas erstellen</span>
                            </md-list-item>
                        </md-list>
                    </div>
                    <div class="md-layout-item">
                        <md-list class="md-dense">
                            <md-subheader>Eingeladene Projektteilnehmer</md-subheader>
                            <md-list-item>
                                <md-icon class="md-accent">check_box_outline_blank</md-icon>
                                <span class="md-list-item-text">Projekte anlegen / bearbeiten / löschen</span>
                            </md-list-item>
                            <md-list-item>
                                <md-icon class="md-accent">check_box</md-icon>
                                <span class="md-list-item-text">Projekte abonnieren und entfernen</span>
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
                            <md-list-item>
                                <md-icon class="md-accent">check_box</md-icon>
                                <span class="md-list-item-text">Termine erstellen / bearbeiten / löschen</span>
                            </md-list-item>
                            <md-list-item>
                                <md-icon class="md-accent">check_box</md-icon>
                                <span class="md-list-item-text">Gruppenchat nutzen</span>
                            </md-list-item>
                            <md-list-item>
                                <md-icon class="md-accent">check_box</md-icon>
                                <span class="md-list-item-text">Personas erstellen</span>
                            </md-list-item>
                        </md-list>
                    </div>
                </div>
            </md-card-content>
        </md-card>

        <md-snackbar :md-active.sync="copied">Link in Zwischenablage kopiert.</md-snackbar>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import TutorialModal from "../../components/rewards/TutorialModal";

    export default {
        computed: {
            ...mapState('projects', ['currentProject'])
        },
        components: {TutorialModal},
        data: () => ({
            invitationLink: null,
            copied: false
        }),
        created() {
            this.makeInvitationLink(this.currentProject.id);
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
            }
        }
    };
</script>

<style lang="scss" scoped>
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