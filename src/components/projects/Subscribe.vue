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
    import axios from "axios";

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
                if (this.user.token) {
                    axios.post(`https://iid.googleapis.com/iid/v1/${this.user.token}/rel/topics/${this.currentProject.id}`,
                        {},
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `key=AAAAoR5OX9Q:APA91bGRAJLk7CIuIaRkVTsTqTKM8wa6vjnTBMzX4BZEis27Da4cJicr4ggkt32blBTUwi7omqmQtEwQIFmTmObsbS0vFs0rx1YRFzGvRvQZzcCs_MO9vwkhYrVQ0RoiiA8fsjjQ91uB`
                            },
                        });
                }
                this.subscriptionSuccessful = true;
                this.$router.push("/projects")
            }
        }
    };
</script>
