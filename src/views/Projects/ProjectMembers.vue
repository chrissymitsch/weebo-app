<template>
    <div class="ProjectMembers" v-if="currentProject">
        <md-chip>{{ currentProject.name }} / Projektteilnehmer</md-chip>

        <p v-if="currentProject.members && finishedLoading === 0" class="text-center">
            <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
            Projektteilnehmer werden geladen...
        </p>
        <p v-if="!currentProject.members || (finishedLoading === currentProject.members.length && (!members || members.length === 0))" class="text-center">
            Keine Projektteilnehmer.
        </p>
        <md-list v-if="currentProject.members && finishedLoading === currentProject.members.length && members && members.length > 0" class="md-triple-line md-dense">
            <div v-for="(member) in members" :key="member.id">
                <md-list-item>
                    <md-avatar>
                        <img :src="member.photoURL" alt="People">
                    </md-avatar>

                    <div class="md-list-item-text">
                        <span>{{ member.displayName }}</span>
                        <span>Brunch this weekend?</span>
                        <p>I'll be in your neighborhood doing errands this week. Do you want to meet?</p>
                    </div>

                    <md-button class="md-icon-button md-list-action">
                        <md-icon class="md-primary">star</md-icon>
                    </md-button>
                </md-list-item>

                <md-divider class="md-inset"></md-divider>
            </div>
        </md-list>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState('app', ['networkOnLine']),
            ...mapState('projects', ['currentProject'])
        },
        data: () => ({
            members: [],
            finishedLoading: 0
        }),
        created() {
            if (this.currentProject.members) {
                for (let i = 0; i < this.currentProject.members.length; i += 1) {
                    this.$store.dispatch('projects/getProjectMember', this.currentProject.members[i]).then(data => {
                        this.members.push(data);
                    }).finally(() => {
                        this.finishedLoading = i + 1;
                    });
                }
            }
        }
    }
</script>
