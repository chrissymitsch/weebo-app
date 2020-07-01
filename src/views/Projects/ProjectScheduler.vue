<template>
    <div class="ProjectScheduler" v-if="currentProject">
        <md-chip>{{ currentProject.name }} / Terminplaner</md-chip>
        <calendar is-expanded :attributes='attributes'></calendar>
        <date-picker :mode='mode' v-model='selectedDate' />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Calendar from 'v-calendar/lib/components/calendar.umd'
    import DatePicker from 'v-calendar/lib/components/date-picker.umd'

    const now = new Date();

    export default {
        computed: {
            ...mapState('projects', ['currentProject']),
            attributes() {
                return [
                    // Attributes for todos
                    ...this.todos.map(todo => ({
                        dates: todo.dates,
                        dot: {
                            color: todo.color,
                            class: todo.isComplete ? 'opacity-75' : '',
                        },
                        popover: {
                            label: todo.description,
                        },
                        customData: todo,
                    })),
                ];
            }
        },
        components: {
            Calendar,
            DatePicker
        },
        data: () => ({
            date: now,
            selectedDate: null,
            mode: 'range',
            todos: [
                {
                    description: 'Take Noah to basketball practice.',
                    isComplete: false,
                    dates: { weekdays: 6 }, // Every Friday
                    color: 'red',
                },
            ]
        }),
    }
</script>
