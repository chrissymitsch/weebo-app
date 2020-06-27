<template>
    <div class="ProjectPersonas" v-if="currentProject && currentProject.phase === 1">
        <md-chip>{{ currentProject.name }} / Personas und Szenarien</md-chip>

        <Modal :showModal="personaModalActive" @closeModal="personaModalActive=false" size="large">
            <div v-if="selectedPersona">
                <persona-details :persona="selectedPersona"></persona-details>
                <md-table>
                    <md-table-row>
                        <md-table-head>Von</md-table-head>
                        <md-table-head>Am</md-table-head>
                    </md-table-row>

                    <md-table-row>
                        <md-table-cell><avatar :user-id="selectedPersona.creator"></avatar></md-table-cell>
                        <md-table-cell>{{ format_date(selectedPersona.createTimestamp) }}</md-table-cell>
                    </md-table-row>
                </md-table>
                <p>
                    Du kannst hier Persona <i>{{selectedPersona.name}}</i> kommentieren oder dich dafür bedanken!
                </p>
                <md-button v-if="selectedPersona.creator === user.id" class="md-raised" disabled><md-icon>favorite_border</md-icon>Danke</md-button>
                <md-button v-if="selectedPersona.creator !== user.id" class="md-raised md-accent" @click="addThankYou(selectedPersona.creator)">
                    <md-icon>favorite_border</md-icon>
                    Danke
                </md-button>

                <md-card>
                    <md-card-content>
                        <md-field>
                            <label>Kommentar</label>
                            <md-input v-model="form.comment" ref="comment"
                                      maxlength="200"
                            />
                        </md-field>
                    </md-card-content>
                    <md-card-actions>
                        <md-button class="md-raised md-primary" @click="addComment()">Kommentieren</md-button>
                    </md-card-actions>
                </md-card>
                <md-card>
                    <md-card-content v-for="selectedPersonaMessage in selectedPersonaMessages" :key="selectedPersonaMessage.id">
                        <avatar :user-id="selectedPersonaMessage.author"></avatar> {{selectedPersonaMessage.data.text}}
                    </md-card-content>
                </md-card>
            </div>
        </Modal>

        <div class="persona-layout">
            <add-persona :id="currentProject.id" @personaCreated="updatePersona"></add-persona>
            <md-divider></md-divider>
            <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
                <md-table-toolbar>
                    <div class="md-toolbar-section-start">
                        <h1 class="md-title">Personas</h1>
                    </div>

                    <md-field md-clearable class="md-toolbar-section-end">
                        <md-input placeholder="Nach Personas suchen..." v-model="search" @input="searchOnTable" />
                    </md-field>
                </md-table-toolbar>

                <md-table-empty-state
                        v-if="search"
                        md-label="Keine Personas gefunden."
                        :md-description="`Für '${search}' wurden keine Personas gefunden.`">
                </md-table-empty-state>

                <md-table-empty-state
                        v-if="!search"
                        md-label="Keine Personas gefunden."
                        md-description="Es wurden noch keine Personas erstellt. Füge neue Personas über den Button 'Persona erstellen' hinzu.">
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Name" md-sort-by="name">
                        <a :href="item.url" target=_blank>{{ item.name }}</a>
                    </md-table-cell>
                    <md-table-cell md-label="Kommentare" md-sort-by="type">
                        <md-button class="md-icon-button" @click="triggerPersonaModal(item)"><md-icon>message</md-icon></md-button>
                    </md-table-cell>
                    <md-table-cell md-label="" md-sort-by="createTimestamp">{{ format_date(item.createTimestamp) }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import moment from "moment";
    import AddPersona from "../../components/personas/AddPersona";
    import Avatar from "../../components/users/Avatar";
    import Modal from "../../components/Modal";
    import PersonaDetails from "../../components/personas/PersonaDetails";

    const toLower = text => {
        return text.toString().toLowerCase()
    };

    const searchByName = (items, term) => {
        if (term) {
            return items.filter(item => toLower(item.name).includes(toLower(term)))
        }

        return items
    };

    export default {
        components: {PersonaDetails, Modal, Avatar, AddPersona},
        computed: {
            ...mapState('authentication', ['user']),
            ...mapState('projects', ['currentProject']),
            ...mapState('personas', ['personas']),
            ...mapState('messages', ['messages'])
        },
        data: () => ({
            search: null,
            searched: [],
            personaModalActive: false,
            selectedPersona: null,
            selectedPersonaMessages: null,
            form: {
                comment: null,
            },
        }),
        methods: {
            ...mapActions('projects', ['triggerUpdateThankYouAction']),
            ...mapActions('rewards', ['triggerScoreAction']),
            ...mapActions('messages', ['createMessage']),
            searchOnTable () {
                this.searched = searchByName(this.personas, this.search)
            },
            updatePersona () {
                this.searched = JSON.parse(JSON.stringify(this.personas));
            },
            format_date(value){
                if (value) {
                    return moment(value).format('DD.MM.YYYY, HH:mm')
                }
                return '';
            },
            triggerPersonaModal(persona) {
                this.personaModalActive = true;
                this.selectedPersona = JSON.parse(JSON.stringify(persona));
                this.getPersonaMessages(persona.id);
            },
            sortMessageList(list) {
                function compare(a, b) {
                    if (a.createTimestamp > b.createTimestamp)
                        return -1;
                    if (a.createTimestamp < b.createTimestamp)
                        return 1;
                    return 0;
                }
                return list.sort(compare);
            },
            getPersonaMessages(personaId) {
                this.selectedPersonaMessages = this.sortMessageList(this.messages.filter(message => message.type === "personaComment" && message.personaId === personaId));
            },
            addThankYou(receiver) {
                this.triggerUpdateThankYouAction(receiver);
                this.triggerScoreAction({name: "thankYou", score: 1, type: "score"});
                this.$toast.success('Du hast ein Dankeschön verteilt (+1 Punkt)', {
                    position: 'top-right',
                    duration: 60000 // 1 minute
                });
            },
            addComment () {
                if (this.form.comment != null) {
                    this.form.personaId = this.selectedPersona.id;
                    this.form.projectId = this.currentProject.id;
                    this.form.type = "personaComment";
                    this.form.data = {
                        "text": this.form.comment
                    };
                    this.form.author = this.user.id;
                    this.$store.dispatch('messages/createMessage', this.form).then(() => {
                        this.form.comment = null;
                    }).finally(() => {
                        this.triggerScoreAction({name: "addMessage", score: 1, type: "score"});
                        this.$toast.success('+1 Punkt für das Erstellen eines Kommentars', {
                            position: 'top-right',
                            duration: 60000 // 1 minute
                        });
                        this.createMessage({
                            "projectId": this.currentProject.id,
                            "type": "system",
                            "data": {
                                "text": `Neuer Kommentar von ${this.user.displayName} für Persona "${this.selectedPersona.name}".`
                            }
                        });
                        this.getPersonaMessages(this.form.personaId);
                    });
                }
            },
        },
        created () {
            this.searched = JSON.parse(JSON.stringify(this.personas));
        },
    }
</script>

<style scoped>
    .persona-layout {
        margin-top: 24px;
    }
</style>