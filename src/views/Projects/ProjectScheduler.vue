<template>
    <div class="ProjectScheduler" v-if="currentProject">
        <tutorial-modal tutorialName="ProjectScheduler">
            <div class="md-display-1 text-center">Sehen, was wann los ist</div>
            <p class="description"><img src="@/assets/logo.png" width="200" /></p>
            <p class="description md-body-2">
                Wann stehen Deadlines an? Wann Tests? Wann habt ihr Meilensteine geplant?<br />
                Behaltet alle Termine hier im Überblick und fügt neue Termine hinzu.<br />
                Vergesst nicht, eine Feier zu Ehren eurer Erfolge zu planen!
            </p>
        </tutorial-modal>


        <md-chip>{{ currentProject.name }} / Terminplaner</md-chip>
        <calendar is-expanded :attributes='attributes'></calendar>
        <date-picker :mode='mode' v-model='selectedDate' />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Calendar from 'v-calendar/lib/components/calendar.umd'
    import DatePicker from 'v-calendar/lib/components/date-picker.umd'
    import TutorialModal from "../../components/rewards/TutorialModal";

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
            TutorialModal,
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
