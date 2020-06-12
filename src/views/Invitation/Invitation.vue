<template>
    <div class="Invitation">
        <h1 class="loading-title" v-if="isUserLoggedIn && project === null && !error">
            <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            Laden...
        </h1>
        <p class="loading-title" v-if="isUserLoggedIn && error">
            <md-icon>mood_bad</md-icon> Da ist leider etwas schief gelaufen.
        </p>

        <md-empty-state
                v-if="isUserLoggedIn && project"
                md-icon="important_devices"
                :md-label="`Du wurdest eingeladen, das Projekt &quot;${project.name}&quot; zu abonnieren.`"
                md-description="Beteilige dich am Design-Prozess, bring neue Ideen ein und unterstütze das Team beim Finden von Lösungen!">

            <subscribe :project="project"></subscribe>
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
    import Subscribe from '@/components/Subscribe'
    import Login from '@/views/Login'

    export default {
        components: { Subscribe, Login },
        computed: {
            ...mapGetters('authentication', ['isUserLoggedIn']),
            ...mapActions('projects', ['getProjectById']),
            ...mapState('projects', ['currentProject'])
        },
        data: () => ({
            project: null,
            error: false
        }),
        created() {
            this.$store.dispatch('projects/getProjectById', this.$route.params.projectId).then(() => {
                this.project = this.currentProject;
                this.error = false;
            }).finally(() => {
                this.error = this.project == null;
            });
        }
    };
</script>
