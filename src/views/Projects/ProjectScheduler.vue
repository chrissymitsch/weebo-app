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

        <Modal :showModal="dayModalActive" @closeModal="dayModalActive=false">
            <div v-if="this.selectedDay">{{this.selectedDay.description}}</div>
        </Modal>

        <md-chip>{{ currentProject.name }} / Terminplaner</md-chip>

        <add-event class="add-event-button" :id="currentProject.id" :column="null" @eventCreated="updateCalendar"></add-event>

        <calendar class="custom_calendar" is-expanded :attributes='attributes' :key="rerenderCalendar">
            <template v-slot:day-content="{ day, dayEvents }">
                <div>
                    {{day.label}}
                    <div class="custom-content" v-on="dayEvents">
                        <div v-for="(attr, index) in day.attributes" :key="index">
                            <a @click="dateClick(attr.customData)">
                                <md-chip class="md-primary md-dense event-chip"
                                         :style="`background-color: ${attr.customData.color}`"
                                         >
                                    <md-ripple>{{attr.customData.description}}</md-ripple>
                                </md-chip>
                            </a>
                        </div>
                    </div>
                </div>
            </template>
        </calendar>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapState } from 'vuex';
    import Calendar from 'v-calendar/lib/components/calendar.umd';
    import TutorialModal from "../../components/rewards/TutorialModal";
    import AddEvent from "../../components/events/AddEvent";
    import Modal from "../../components/Modal";

    export default {
        computed: {
            ...mapState('projects', ['currentProject']),
            ...mapState('events', ['events']),
        },
        components: {
            Modal,
            AddEvent,
            TutorialModal,
            Calendar,
        },
        data: () => ({
            attributes: [],
            rerenderCalendar: 0,
            selectedDay: null,
            dayModalActive: false
        }),
        methods: {
            updateCalendar() {
                this.renderAllEvents();
                this.rerenderCalendar += 1;
            },
            dateClick(day) {
                this.selectedDay = day;
                this.dayModalActive = true;
            },
            renderAllEvents() {
                this.attributes = [];
                for (let i = 0; i < this.events.length; i += 1) {
                    const event = {};
                    const eventFromBase = JSON.parse(JSON.stringify(this.events[i]));
                    if (eventFromBase.dot) {
                        event.popover = eventFromBase.popover;
                        event.description = eventFromBase.description;
                        const formattedDate = moment(eventFromBase.dates);
                        event.dates = new Date(formattedDate.year(), formattedDate.month(), formattedDate.date());
                        event.excludeDates = eventFromBase.excludeDates;
                    } else {
                        event.popover = eventFromBase.popover;
                        event.description = eventFromBase.description;
                        let formattedStartDate = null;
                        let formattedEndDate = null;
                        if (moment(eventFromBase.dates.start).isValid() && moment(eventFromBase.dates.end).isValid()) {
                            formattedStartDate = moment(eventFromBase.dates.start);
                            formattedEndDate = moment(eventFromBase.dates.end);
                        } else {
                            formattedStartDate = moment.unix(eventFromBase.dates.start.seconds);
                            formattedEndDate = moment.unix(eventFromBase.dates.end.seconds);
                        }
                        event.dates = {
                            start: new Date(formattedStartDate.year(), formattedStartDate.month(), formattedStartDate.date()),
                            end: new Date(formattedEndDate.year(), formattedEndDate.month(), formattedEndDate.date())
                        };
                        event.excludeDates = eventFromBase.excludeDates;
                    }
                    event.customData = {
                        id: eventFromBase.id,
                        description: eventFromBase.description,
                        color: eventFromBase.dot || eventFromBase.highlight
                    };
                    this.attributes.push(event);
                }
            }
        },
        mounted() {
            this.renderAllEvents();
        }
    }
</script>

<style lang="scss">
    @import '@/theme/variables.scss';

    .add-event-button {
        margin-top: 24px;
    }

    .custom-content {
        border: 1px solid $light-grey-color;
        width: 100%;
        height: 100px;
        overflow: auto;
    }

    .md-chip.event-chip {
        cursor: pointer;
        padding: 4px;
        width: 100%;
        text-overflow: ellipsis;
        border-radius: 4px;
    }

</style>