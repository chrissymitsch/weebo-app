<template>
    <div class="ProjectPersonas" v-if="currentProject">
        <md-dialog-confirm
                v-if="selectedPersonaForDeletion"
                :md-active.sync="deletionDialogActive"
                :md-title="`Möchtest du die Persona &quot;${selectedPersonaForDeletion.name}&quot; löschen?`"
                md-confirm-text="Ja."
                md-cancel-text="Nein!"
                @md-confirm="onConfirmDeletion" />

        <tutorial-modal tutorialName="ProjectPersonas">
            <div class="md-display-1 text-center">Es ist Zeit, Personas zu erstellen!</div>
            <p class="description"><img src="@/assets/img/astronaut1.png" width="200" /></p>
            <p class="description md-body-2">
                In Phase 1 des nutzerzentrierten Designprozesses, der Analysephase, geht es darum, den Kontext der
                Nutzung deines Systems festzulegen.<br />
                Personas stellen fiktive Repräsentationen potenzieller Nutzer dar. Um herauszufinden, welche Bedürfnisse
                deine potenziellen Nutzer haben, solltest du mit deinem Projektteam Personas erarbeiten.<br />
                Damit es einfacher geht, steht dir ein vorstrukturiertes Formular mit allen nötigen Inhalten zur
                Verfügung. Außerdem kannst du ab Phase 2 mit allen Projektteilnehmern über die fertigen Personas
                diskutieren, um Anforderungen zu erarbeiten.
            </p>
        </tutorial-modal>


        <md-chip>{{ currentProject.name }} / Personas und Szenarien</md-chip>

        <Modal :showModal="personaModalActive" @closeModal="personaModalActive=false" size="large">
            <div v-if="selectedPersona">
                <persona-details :persona="selectedPersona"></persona-details>
                <md-table class="hide-for-small">
                    <md-table-row>
                        <md-table-head>Von</md-table-head>
                        <md-table-head>Am</md-table-head>
                    </md-table-row>

                    <md-table-row>
                        <md-table-cell><avatar :user-id="selectedPersona.creator"></avatar></md-table-cell>
                        <md-table-cell>{{ format_date(selectedPersona.createTimestamp) }}</md-table-cell>
                    </md-table-row>
                </md-table>
                <p v-if="currentProject.phase && currentProject.phase !== 0">
                    Du kannst hier Persona <i>{{selectedPersona.name}}</i> kommentieren oder dich dafür bedanken!
                </p>
                <p v-if="!currentProject.phase || currentProject.phase === 0">
                    Bedanke dich für diese Persona!
                </p>
                <md-button v-if="selectedPersona.creator === user.id" class="md-raised" disabled><md-icon>favorite_border</md-icon>Danke</md-button>
                <md-button v-if="selectedPersona.creator !== user.id" class="md-raised md-accent" @click="addThankYou(selectedPersona.creator)">
                    <md-icon>favorite_border</md-icon>
                    Danke
                </md-button>

                <md-card v-if="currentProject.phase && currentProject.phase !== 0">
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
                <md-card :key="rerenderMessages">
                    <md-card-content v-for="(selectedPersonaMessage, index) in selectedPersonaMessages" :key="index">
                        <avatar :user-id="selectedPersonaMessage.author"></avatar> {{selectedPersonaMessage.data.text}}
                    </md-card-content>
                </md-card>
            </div>
        </Modal>

        <div class="persona-layout show-for-small">
            <add-persona :id="currentProject.id" @personaCreated="updatePersona"></add-persona>
            <md-list class="md-dense">
                <md-list-item v-for="(persona, index) in searched" :key="index">
                    <md-button v-if="currentProject.phase && currentProject.phase !== 0" @click="triggerPersonaModal(persona)"><md-icon>message</md-icon> ({{countMessages(persona.id)}})</md-button>
                    <span class="md-list-item-text persona-name">
                        <a href="#" @click="triggerPersonaModal(persona)">{{ persona.name }}</a>
                    </span>
                </md-list-item>
            </md-list>
        </div>

        <div class="persona-layout hide-for-small">
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
                        <a href="#" @click="triggerPersonaModal(item)">{{ item.name }}</a>
                    </md-table-cell>
                    <md-table-cell md-label="Kommentare" v-if="currentProject.phase && currentProject.phase !== 0">
                        <md-badge md-dense :md-content="countMessages(item.id)">
                            <md-button class="md-icon-button" @click="triggerPersonaModal(item)"><md-icon>message</md-icon></md-button>
                        </md-badge>
                    </md-table-cell>
                    <md-table-cell md-label="Erstellt" md-sort-by="createTimestamp">{{ format_date(item.createTimestamp) }}</md-table-cell>
                    <md-table-cell>
                        <md-button v-if="!isProjectPersonaDeletionPending(item.id)" class="md-icon-button md-dense" @click="triggerDeletionDialog(item)"><md-icon>delete</md-icon></md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import moment from "moment";
    import AddPersona from "../../components/personas/AddPersona";
    import Avatar from "../../components/users/Avatar";
    import Modal from "../../components/Modal";
    import PersonaDetails from "../../components/personas/PersonaDetails";
    import TutorialModal from "../../components/rewards/TutorialModal";

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
        components: {TutorialModal, PersonaDetails, Modal, Avatar, AddPersona},
        computed: {
            ...mapState('authentication', ['user']),
            ...mapState('projects', ['currentProject']),
            ...mapState('personas', ['personas']),
            ...mapState('messages', ['messages']),
            ...mapGetters('personas', ['isProjectPersonaDeletionPending'])
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
            deletionDialogActive: false,
            selectedPersonaForDeletion: null,
            rerenderMessages: 0
        }),
        methods: {
            ...mapActions('projects', ['triggerUpdateThankYouAction']),
            ...mapActions('rewards', ['triggerScoreAction']),
            ...mapActions('messages', ['createMessage']),
            ...mapActions('personas', ['deleteProjectPersona']),
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
            countMessages(personaId) {
                return this.messages.filter(message => message.type === "personaComment" && message.personaId === personaId).length;
            },
            getPersonaMessages(personaId) {
                this.selectedPersonaMessages = this.sortMessageList(this.messages.filter(message => message.type === "personaComment" && message.personaId === personaId));
            },
            addThankYou(receiver) {
                this.triggerUpdateThankYouAction({"projectMemberId": receiver, "projectId": this.currentProject.id});
                this.triggerScoreAction({name: "thankYou", score: 1, type: "score"});
                this.$toast.success('Du hast ein Dankeschön verteilt (+1 Punkt)', {
                    position: 'top-right',
                    duration: 60000 // 1 minute
                });
            },
            addComment () {
                if (this.form.comment != null) {
                    this.selectedPersonaMessages = null;
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
                        this.rerenderMessages += 1;
                    });
                }
            },
            triggerDeletionDialog(selectedPersona) {
                this.deletionDialogActive = true;
                this.selectedPersonaForDeletion = selectedPersona;
            },
            onConfirmDeletion() {
                if (!this.isProjectPersonaDeletionPending(this.selectedPersonaForDeletion.id)) {
                    this.deleteProjectPersona({"projectId": this.currentProject.id, "personaId": this.selectedPersonaForDeletion.id});
                    this.searched = JSON.parse(JSON.stringify(this.personas));

                }
            },
        },
        created () {
            this.searched = JSON.parse(JSON.stringify(this.personas));
        },
    }
</script>

<style lang="scss" scoped>
    .persona-layout {
        margin-top: 24px;
    }

    .persona-name {
        max-width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>