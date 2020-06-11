<template>
    <div class="ProjectInvitation">
        <md-card>
            <md-card-header>
                <md-empty-state
                        md-icon="directions_boat"
                        md-label="Nimm alle mit ins Boot!"
                        md-description="Teile dein Projekt mit Team-Mitgliedern, Kunden, Auftraggebern, usw., damit du
                        Weebo als Kollaborations-Tool für dein Projekt nutzen kannst.">
                </md-empty-state>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-layout md-gutter">
                        <div class="md-layout-item">
                            <ShareNetwork
                                    network="email"
                                    :url="invitationLink"
                                    :title="`Einladung für Projekt ${ project.name }!`"
                                    :description="`Du hast eine Einladung für das Projekt ${ project.name } erhalten. Klicke auf den Link oder kopiere ${ invitationLink } in den Browser!`">
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
                                    :title="`Einladung für Projekt ${ project.name }!`"
                                    :description="`Du hast eine Einladung für das Projekt ${ project.name } erhalten.`">
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
                                    :title="`Einladung für Projekt ${ project.name }!`"
                                    :description="`Du hast eine Einladung für das Projekt ${ project.name } erhalten.`">
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
                                    :title="`Einladung für Projekt ${ project.name }!`"
                                    :description="`Du hast eine Einladung für das Projekt ${ project.name } erhalten.`">
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
            </md-card-content>

            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">Funktionen</div>
                </md-card-header-text>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-list>
                                <md-subheader>Du (Admin)</md-subheader>

                                <md-list-item>
                                    <md-checkbox v-model="permissionsAdmin" disabled value="pa1" />
                                    <span class="md-list-item-text">Projekte anlegen / bearbeiten / löschen</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-checkbox v-model="permissionsAdmin" disabled value="pa2" />
                                    <span class="md-list-item-text">Einladungslink versenden</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-checkbox v-model="permissionsAdmin" disabled value="pa3" />
                                    <span class="md-list-item-text">Teilnehmer verwalten</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-checkbox v-model="permissionsAdmin" disabled value="pa4" />
                                    <span class="md-list-item-text">Dokumente hochladen</span>
                                </md-list-item>

                            </md-list>
                        </div>
                        <div class="md-layout-item">
                            <md-list>
                                <md-subheader>Eingeladene Projektteilnehmer</md-subheader>

                                <md-list-item>
                                    <md-checkbox v-model="permissionsMember" disabled value="pm1" />
                                    <span class="md-list-item-text">Projekte anlegen / bearbeiten / löschen</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-checkbox v-model="permissionsMember" disabled value="pm2" />
                                    <span class="md-list-item-text">Einladungslink versenden</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-checkbox v-model="permissionsMember" disabled value="pm3" />
                                    <span class="md-list-item-text">Teilnehmer verwalten</span>
                                </md-list-item>
                                <md-list-item>
                                    <md-checkbox v-model="permissionsMember" disabled value="pm4" />
                                    <span class="md-list-item-text">Dokumente hochladen</span>
                                </md-list-item>

                            </md-list>
                        </div>
                    </div>
                </div>
            </md-card-content>

        </md-card>

        <md-snackbar :md-active.sync="copied">Link in Zwischenablage kopiert.</md-snackbar>
    </div>
</template>

<script>
    export default {
        data: () => ({
            invitationLink: null,
            copied: false,
            permissionsAdmin: ['pa1','pa2','pa3','pa4'],
            permissionsMember: ['pm4']
        }),
        props: {
            project: Object
        },
        created() {
            this.makeInvitationLink(this.project.id);
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
    .md-card {
        display: inline-block;
        vertical-align: top;
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