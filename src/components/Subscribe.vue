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
            ...mapState('projects', ['subscriptionPending'])
        },
        data: () => ({
            subscriptionSuccessful: false
        }),
        props: {
            project: Object
        },
        methods: {
            ...mapActions('projects', ['triggerSubscribeProjectAction']),
            subscribe() {
                this.triggerSubscribeProjectAction(this.$store.navigator);
                this.subscriptionSuccessful = true;
            }
        }
    };
</script>
