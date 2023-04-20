<template>
    <div class="ProjectProtocol" v-if="currentProject">
        <tutorial-modal tutorialName="ProjectProtocol">
            <div class="md-display-1 text-center">Was ist alles passiert...</div>
            <p class="description"><img src="@/assets/img/saturn.png" width="200" /></p>
            <p class="description md-body-2">
                während du weg warst?<br />
                Das steht hier geschrieben. Chat-Diskussionen, Mitteilungen über Kommentare, neue Dateien o.ä. findest
                du hier. Verpasse nichts mehr und schaue regelmäßig ins Aktivitätsprotokoll.
            </p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Aktivitätsprotokoll</md-chip>
        <p v-if="!finishedLoading" class="text-center protocol-layout">
            <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
            Aktivitäten werden geladen...
        </p>

        <md-table class="protocol-layout" v-if="finishedLoading" v-model="messageList" md-sort="createTimestamp" md-sort-order="desc" md-card md-fixed-header>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Aktivitäten und Nachrichten</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Nach Nachrichten suchen..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                    v-if="search"
                    md-label="Keine Nachrichten gefunden."
                    :md-description="`Für '${search}' wurden keine Nachrichten gefunden.`">
            </md-table-empty-state>

            <md-table-empty-state
                    v-if="!search"
                    md-label="Keine Nachrichten gefunden."
                    :md-description="`Für dieses Projekt wurden keine Nachrichten gefunden.`">
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-sort-by="createTimestamp">
                    <message :message="item"></message>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Message from "../../components/messages/Message";
    import TutorialModal from "../../components/rewards/TutorialModal";

    const toLower = text => {
        return text.toString().toLowerCase()
    };

    const searchByText = (items, term) => {
        if (term) {
            return items.filter(item => {
                if (item.data.text) {
                    return toLower(item.data.text).includes(toLower(term));
                }
                return false;
            });
        }
        return items
    };

    export default {
        components: {TutorialModal, Message},
        computed: {
            ...mapState('app', ['networkOnLine']),
            ...mapState('projects', ['currentProject']),
            ...mapState('messages', ['messages']),
        },
        data: () => ({
            finishedLoading: 0,
            messageList: [],
            search: null
        }),
        methods: {
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
            filterMessageList(list) {
                return list.filter(message => message.projectId === this.currentProject.id && message.type !== "fileComment" && message.type !== "personaComment")
            },
            searchOnTable () {
                const messageToSort = JSON.parse(JSON.stringify(this.messages));
                this.messageList = searchByText(this.filterMessageList(messageToSort), this.search);
            },
        },
        created() {
            if (this.currentProject) {
                this.$store.dispatch('messages/getMessages', this.currentProject.id).then(() => {
                    const messageToSort = JSON.parse(JSON.stringify(this.messages));
                    this.messageList = this.filterMessageList(messageToSort);
                }).finally(() => {
                    this.finishedLoading = true;
                });
            }
        }
    }
</script>

<style lang="scss">

    .md-table table {
        max-width: 100%!important;
        width: 100%!important;
    }

    .protocol-layout {
        margin-top: 24px;
    }
</style>