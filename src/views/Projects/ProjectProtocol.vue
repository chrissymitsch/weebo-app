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
        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <p v-if="!finishedLoading" class="text-center">
                    <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
                    Aktivitäten werden geladen...
                </p>

                <md-card class="discussion" v-if="finishedLoading">
                    <md-card-content v-for="(message) in messageList" :key="message.id">
                        <message :message="message"></message>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Message from "../../components/messages/Message";
    import TutorialModal from "../../components/rewards/TutorialModal";

    export default {
        components: {TutorialModal, Message},
        computed: {
            ...mapState('app', ['networkOnLine']),
            ...mapState('projects', ['currentProject']),
            ...mapState('messages', ['messages']),
        },
        data: () => ({
            finishedLoading: 0,
            messageList: []
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
                return list.filter(message => message.projectId === this.currentProject.id && message.type !== "fileComment")
            },
        },
        created() {
            if (this.currentProject) {
                this.$store.dispatch('messages/getMessages', this.currentProject.id).then(() => {
                    const messageToSort = JSON.parse(JSON.stringify(this.messages));
                    this.messageList = this.sortMessageList(this.filterMessageList(messageToSort));
                }).finally(() => {
                    this.finishedLoading = true;
                });
            }
        }
    }
</script>
