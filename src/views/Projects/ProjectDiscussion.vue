<template>
    <div class="ProjectDiskussion" v-if="currentProject">
        <md-chip>{{ currentProject.name }} / Diskussion</md-chip>
        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <p v-if="!finishedLoading" class="text-center">
                    <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
                    Aktivitäten werden geladen...
                </p>

                <md-card class="discussion" v-if="finishedLoading">
                    <p class="md-caption text-center">21.06.2020</p>
                    <div v-for="(message) in messageList" :key="message.id">
                        <md-divider></md-divider>
                        <md-card-header>
                            <span class="md-body-2">Hans Wurst</span>
                            <span class="md-caption"> 19:15 Uhr</span>
                        </md-card-header>
                        <md-card-content>
                            {{message.data.text}}
                        </md-card-content>

                        <md-divider></md-divider>

                        <md-card-header class="md-body-2">Hans Wurst</md-card-header>
                        <md-card-content>
                            Blabla hat was hochgeladen
                        </md-card-content>
                    </div>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState('app', ['networkOnLine']),
            ...mapState('projects', ['currentProject']),
            ...mapState('messages', ['messages'])
        },
        data: () => ({
            finishedLoading: 0,
            messageList: []
        }),
        methods: {
            sortMessageList(list) {
                function compare(a, b) {
                    if (a.createTimestamp < b.createTimestamp)
                        return -1;
                    if (a.createTimestamp > b.createTimestamp)
                        return 1;
                    return 0;
                }
                return list.sort(compare);
            },
        },
        created() {
            if (this.currentProject) {
                this.$store.dispatch('messages/getMessages', this.currentProject.id).then(() => {
                    const messageToSort = JSON.parse(JSON.stringify(this.messages));
                    this.messageList = this.sortMessageList(messageToSort);
                    console.log(this.messageList)
                }).finally(() => {
                    this.finishedLoading = true;
                });
            }
        }
    }
</script>
