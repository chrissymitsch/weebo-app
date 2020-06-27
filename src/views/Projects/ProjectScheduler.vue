<template>
    <div class="ProjectScheduler" v-if="currentProject">
        <md-chip>{{ currentProject.name }} / Terminplaner</md-chip>
        <md-datepicker v-model="date" />
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    const now = new Date();

    export default {
        computed: {
            ...mapState('projects', ['currentProject']),
        },
        data: () => ({
            date: now
        }),
    }
</script>
