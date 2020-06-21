<template>
    <div class="Invitation">
        <md-empty-state v-if="isUserLoggedIn && !error && !projectLoadingFinished">
            <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
            Laden...
        </md-empty-state>

        <md-empty-state
                v-if="isUserLoggedIn && error && projectLoadingFinished"
                md-icon="error_outline"
                md-label="Da ist leider etwas schief gelaufen.">
        </md-empty-state>

        <md-empty-state
                v-if="isUserLoggedIn && projectLoadingFinished && !error"
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
            ...mapState('projects', ['currentProject', 'userProjects'])
        },
        data: () => ({
            error: false,
            projectLoadingFinished: false
        }),
        created() {
            const routeParamsProjectId = this.$route.params.projectId;
            if (this.userProjects) {
                const checkIfUserHasProject = this.userProjects.filter(function (elem) {
                    if (elem.projectId === routeParamsProjectId) return elem;
                    return null;
                });
                if (checkIfUserHasProject.length > 0) {
                    this.error = true;
                    this.projectLoadingFinished = true;
                } else {
                    this.$store.dispatch('projects/getProjectById', this.$route.params.projectId).then(() => {
                        this.error = false;
                    }).finally(() => {
                        this.error = this.currentProject == null;
                        this.projectLoadingFinished = true;
                    });
                }
            }
        }
    };
</script>
