<template>
    <div class="Subscribe">
        <md-button v-if="!subscriptionSuccessful" class="md-raised md-primary" @click="subscribe()" :disabled="subscriptionPending">
            <md-icon>notifications_none</md-icon>
            Abonnieren
        </md-button>

        <md-snackbar :md-active.sync="subscriptionSuccessful">Du hast das Projekt erfolgreich abonniert.</md-snackbar>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        computed: {
            ...mapState('projects', ['currentProject', 'subscriptionPending']),
            ...mapState('authentication', ['user'])
        },
        data: () => ({
            subscriptionSuccessful: false
        }),
        methods: {
            ...mapActions('projects', ['triggerSubscribeProjectAction']),
            ...mapActions('messages', ['createMessage']),
            subscribe() {
                this.triggerSubscribeProjectAction(this.$store.navigator);
                this.createMessage({
                    "projectId": this.currentProject.id,
                    "type": "system",
                    "data": {
                        "text": `${this.user.displayName} hat das Projekt abonniert.`
                    }
                });
                this.subscriptionSuccessful = true;
                this.$router.push("/projects")
            }
        }
    };
</script>
