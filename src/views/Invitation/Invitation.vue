<template>
    <div class="Invitation">
        <md-empty-state v-if="isUserLoggedIn && !currentProject">
            <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            Laden...
        </md-empty-state>

        <md-empty-state
                v-if="isUserLoggedIn && error"
                md-icon="error_outline"
                md-label="Da ist leider etwas schief gelaufen.">
        </md-empty-state>

        <md-empty-state
                v-if="isUserLoggedIn && currentProject"
                md-icon="important_devices"
                :md-label="`Du wurdest eingeladen, das Projekt &quot;${currentProject.name}&quot; zu abonnieren.`"
                md-description="Beteilige dich am Design-Prozess, bring neue Ideen ein und unterstütze das Team beim Finden von Lösungen!">
            <subscribe></subscribe>
        </md-empty-state>

        <md-empty-state
                v-if="!isUserLoggedIn"
                md-icon="important_devices"
                :md-label="`Du wurdest eingeladen, ein Projekt zu abonnieren.`"
                md-description="Beteilige dich am Design-Prozess, bring neue Ideen ein und unterstütze das Team beim Finden von Lösungen!">
            <login></login>
        </md-empty-state>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from "vuex";
    import Subscribe from '@/components/projects/Subscribe'
    import Login from '@/views/Login'

    export default {
        components: { Subscribe, Login },
        computed: {
            ...mapGetters('authentication', ['isUserLoggedIn']),
            ...mapActions('projects', ['getProjectById']),
            ...mapState('authentication', ['user']),
            ...mapState('projects', ['currentProject'])
        },
        data: () => ({
            error: false
        }),
        mounted() {
            const routeParamsProjectId = this.$route.params.projectId;
            this.$store.dispatch('projects/getProjectById', routeParamsProjectId).then(() => {
                this.error = false;
            }).finally(() => {
                this.error = this.currentProject == null;
            });
        }
    };
</script>
