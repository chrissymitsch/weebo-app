<template>
    <div class="ProjectInvitation">
        <ShareNetwork
                network="email"
                :url="`https://weebo-b37d8/invitation/${ id }`"
                :title="`Einladung für Projekt ${ currentProject().name }!`"
                :description="`Du hast eine Einladung für das Projekt ${ currentProject().name } erhalten. Klicke auf den Link oder kopiere https://weebo-b37d8/invitation/${ id } in den Browser!`">
            Einladung verschicken
        </ShareNetwork>

    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        props: {
            id: String
        },
        computed: {
            ...mapGetters('projects', ['getProjectById']),
            currentProject() {
                return this.getProjectById(this.id);
            }
        }
    };
</script>
