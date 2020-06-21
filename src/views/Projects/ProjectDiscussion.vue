<template>
    <div class="ProjectDiskussion" v-if="currentProject">
        <md-chip>{{ currentProject.name }} / Diskussion</md-chip>
        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <md-card class="discussion">
                    <p class="md-caption text-center">21.06.2020</p>
                    <md-divider></md-divider>
                    <md-card-header>
                        <span class="md-body-2">Hans Wurst</span>
                        <span class="md-caption"> 19:15 Uhr</span>
                    </md-card-header>
                    <md-card-content>
                        Hallo Leute
                    </md-card-content>

                    <md-divider></md-divider>

                    <md-card-header class="md-body-2">Hans Wurst</md-card-header>
                    <md-card-content>
                        Blabla hat was hochgeladen
                    </md-card-content>
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
            ...mapState('projects', ['currentProject'])
        },
        data: () => ({
            finishedLoading: 0
        }),
        created() {
        }
    }
</script>
