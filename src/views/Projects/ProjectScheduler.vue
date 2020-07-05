<template>
    <div class="ProjectScheduler" v-if="currentProject">
        <md-dialog-confirm
                v-if="selectedDay"
                :md-active.sync="deletionDialogActive"
                :md-title="`Möchtest du den Termin &quot;${selectedDay.description}&quot; löschen?`"
                md-confirm-text="Ja."
                md-cancel-text="Nein!"
                @md-confirm="onConfirmDeletion" />

        <tutorial-modal tutorialName="ProjectScheduler">
            <div class="md-display-1 text-center">Sehen, was wann los ist</div>
            <p class="description"><img src="@/assets/logo.png" width="200" /></p>
            <p class="description md-body-2">
                Wann stehen Deadlines an? Wann Tests? Wann habt ihr Meilensteine geplant?<br />
                Behaltet alle Termine hier im Überblick und fügt neue Termine hinzu.<br />
                Vergesst nicht, eine Feier zu Ehren eurer Erfolge zu planen!
            </p>
        </tutorial-modal>

        <Modal :showModal="dayModalActive" @closeModal="dayModalActive=false" size="large">
            <div v-if="this.selectedDay">
                <p class="md-title">{{this.selectedDay.description}}</p>
                <p class="md-body-2" v-if="this.selectedDay.eventDates.end && this.selectedDay.eventDates.start">
                    {{format_date(this.selectedDay.eventDates.start)}}
                    bis
                    {{format_date(this.selectedDay.eventDates.end)}}
                </p>
                <p class="md-body-2" v-if="!this.selectedDay.eventDates.end || !this.selectedDay.eventDates.start">
                    {{format_date(this.selectedDay.eventDates)}}
                </p>
                <md-divider></md-divider>
                <md-table>
                    <md-table-row>
                        <md-table-head>Von</md-table-head>
                        <md-table-head>Erstellt</md-table-head>
                        <md-table-head></md-table-head>
                    </md-table-row>

                    <md-table-row>
                        <md-table-cell><avatar :user-id="selectedDay.creator"></avatar></md-table-cell>
                        <md-table-cell>{{ format_date(selectedDay.createTimestamp) }}</md-table-cell>
                        <md-table-cell>
                            <md-button v-if="!isProjectEventDeletionPending(selectedDay.id)" class="md-icon-button md-dense" @click="triggerDeletionDialog()"><md-icon>delete</md-icon></md-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
        </Modal>

        <md-chip>{{ currentProject.name }} / Terminplaner</md-chip>

        <add-event class="add-event-button" :id="currentProject.id" :column="null" @eventCreated="updateCalendar"></add-event>

        <calendar class="custom_calendar" is-expanded :attributes='attributes' :key="rerenderCalendar">
            <template v-slot:day-content="{ day, dayEvents }">
                <div>
                    <div class="day-label">{{day.label}}</div>
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
    import {mapActions, mapGetters, mapState} from 'vuex';
    import Calendar from 'v-calendar/lib/components/calendar.umd';
    import TutorialModal from "../../components/rewards/TutorialModal";
    import AddEvent from "../../components/events/AddEvent";
    import Modal from "../../components/Modal";
    import Avatar from "../../components/users/Avatar";

    export default {
        computed: {
            ...mapState('projects', ['currentProject']),
            ...mapState('events', ['events']),
            ...mapGetters('events', ['isProjectEventDeletionPending'])
        },
        components: {
            Avatar,
            Modal,
            AddEvent,
            TutorialModal,
            Calendar,
        },
        data: () => ({
            attributes: [],
            rerenderCalendar: 0,
            deletionDialogActive: false,
            selectedDay: null,
            dayModalActive: false
        }),
        methods: {
            ...mapActions('events', ['deleteProjectEvent']),
            format_date(value){
                if (value) {
                    if (moment(value).isValid()) {
                        return moment(value).format('DD.MM.YYYY');
                    }
                    return moment.unix(value.seconds).format('DD.MM.YYYY');
                }
                return '';
            },
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
                        event.dot = eventFromBase.dot;
                        event.popover = eventFromBase.popover;
                        event.description = eventFromBase.description;
                        const formattedDate = moment(eventFromBase.dates);
                        event.dates = new Date(formattedDate.year(), formattedDate.month(), formattedDate.date());
                        event.excludeDates = eventFromBase.excludeDates;
                    } else {
                        event.highlight = eventFromBase.highlight;
                        event.content = eventFromBase.content;
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
                        createTimestamp: eventFromBase.createTimestamp,
                        creator: eventFromBase.creator,
                        eventDates: event.dates,
                        description: eventFromBase.description,
                        color: eventFromBase.dot || eventFromBase.highlight
                    };
                    this.attributes.push(event);
                }
            },
            triggerDeletionDialog() {
                this.deletionDialogActive = true;
            },
            onConfirmDeletion() {
                if (!this.isProjectEventDeletionPending(this.selectedDay.id)) {
                    this.deleteProjectEvent({"projectId": this.currentProject.id, "eventId": this.selectedDay.id});
                    const index = this.attributes.findIndex(event => event.customData.id === this.selectedDay.id);
                    this.attributes.splice(index, 1);
                    this.dayModalActive = false;
                }
            },
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

    .vc-bg-crimson-600 {
        background-color: crimson;
    }

    .vc-bg-darkgray-600 {
        background-color: darkgray;
    }

    .vc-bg-mediumseagreen-600 {
        background-color: mediumseagreen;
    }

    .vc-bg-royalblue-600 {
        background-color: royalblue;
    }

    .vc-bg-crimson-500 {
        background-color: crimson;
    }

    .vc-bg-darkgray-500 {
        background-color: darkgray;
    }

    .vc-bg-mediumseagreen-500 {
        background-color: mediumseagreen;
    }

    .vc-bg-royalblue-500 {
        background-color: royalblue;
    }

    .vc-bg-crimson-200 {
        background-color: lightsalmon;
    }

    .vc-bg-darkgray-200 {
        background-color: gainsboro;
    }

    .vc-bg-mediumseagreen-200 {
        background-color: palegreen;
    }

    .vc-bg-royalblue-200 {
        background-color: lightblue;
    }

    @media (max-width: 729px) {
        .day-label {
            text-align: center;
            cursor: pointer;
        }
    }

    @media (min-width: 730px) {
        .vc-highlight, .vc-dot {
            display: none;
        }
    }

    .custom-content {
        border: 1px solid $light-grey-color;
        height: 100px;
        overflow: auto;
        min-width: 50px;
        max-width: 100px;
        width: 100%;

        @media (max-width: 729px) {
            display: none;
        }
    }

    .md-chip.event-chip {
        cursor: pointer;
        padding: 4px;
        width: 100%;
        border-radius: 4px;
        height: auto;
        font-size: 12px;
        margin-bottom: 2px;

        .md-ripple {
            text-overflow: ellipsis;
            white-space: break-spaces;
        }
    }

</style>