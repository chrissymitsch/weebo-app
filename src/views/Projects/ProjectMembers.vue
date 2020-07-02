<template>
    <div class="ProjectMembers" v-if="currentProject">
        <tutorial-modal tutorialName="ProjectMembers">
            <div class="md-display-1 text-center">Alle Teilnehmer deines Projekts</div>
            <p class="description"><img src="@/assets/img/astronaut2.png" width="200" /></p>
            <p class="description md-body-2">
                Hier siehst du alle <i>Stakeholder</i> deines Projekts. Die Admins sind entsprechend gekennzeichnet.
                Sie haben spezielle Berechtigungen, wie z.B. neue Teilnehmer einladen oder momentane Teilnehmer
                entfernen, also pass gut auf, dass du sie nicht verägerst ;)
            </p>
            <p class="description md-body-2">
                Du kannst dir übrigens auch die Profile der anderen ansehen. Schau doch mal nach, was dort so zu finden
                ist!
            </p>
        </tutorial-modal>

        <md-chip>{{ currentProject.name }} / Projektteilnehmer</md-chip>

        <p v-if="currentProject.members && finishedLoading === 0" class="text-center">
            <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
            Projektteilnehmer werden geladen...
        </p>
        <p v-if="!currentProject.members || (finishedLoading === currentProject.members.length && (!members || members.length === 0))" class="text-center">
            Keine Projektteilnehmer.
        </p>
        <div v-if="currentProject.members && finishedLoading === currentProject.members.length && members && members.length > 0">
            <div class="member-list">
                <project-member v-for="(member) in members" :key="member.id" :data="member"></project-member>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import ProjectMember from "../../components/projects/ProjectMember";
    import TutorialModal from "../../components/rewards/TutorialModal";

    export default {
        components: {TutorialModal, ProjectMember},
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
