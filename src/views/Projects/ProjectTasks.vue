<template>
    <div class="ProjectTasks" v-if="currentProject">
        <md-chip>{{ currentProject.name }} / Aufgaben-Board</md-chip>
        <p v-if="!finishedLoading" class="text-center">
            <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner><br />
            Aufgaben werden geladen...
        </p>
        <p v-if="finishedLoading && (!columns || columns.length === 0)" class="text-center">
            Keine Aufgaben.
        </p>
        <add-task :id="currentProject.id" :column="null" @taskCreated="updateColumns"></add-task>

        <md-chip :class="getActivatedBadge('Alle')" @click="activatedBadgeType = 'Alle'">
            Alle
        </md-chip>
        <md-chip v-for="(badge, index) in nameMappings" :class="getActivatedBadge(index)" :key="index" @click="activatedBadgeType = index">
            {{badge}}
        </md-chip>

        <div class="md-layout" v-if="finishedLoading && columns && columns.length > 0">
            <div class="md-layout-item column-width" v-for="(column, index) in filteredTasksInColumns" :index="index" :key="column.title">
                <div>
                    <p class="md-title text-center">{{column.title}}</p>
                    <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
                    <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks" @change="change(column, index)">
                        <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                        <task-card
                                v-for="(task) in column.tasks"
                                :key="task.id"
                                :task="task"
                                @taskEdited="updateColumns"
                        ></task-card>
                        <!-- </transition-group> -->
                    </draggable>
                    <task-card :task="null"></task-card>
                    <add-task :id="currentProject.id" :column="column.title" @taskCreated="updateColumns"></add-task>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import TaskCard from "@/components/tasks/TaskCard.vue";
    import AddTask from "@/components/tasks/AddTask.vue";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "App",
        components: {
            TaskCard,
            AddTask,
            draggable
        },
        computed: {
            ...mapState('app', ['networkOnLine']),
            ...mapState('tasks', ['tasks']),
            ...mapState('projects', ['currentProject']),
            filteredTasksInColumns() {
                if (this.activatedBadgeType === "Alle") {
                    return this.columns;
                }
                const filteredColumns = [];
                for (let i = 0; i < this.columns.length; i += 1) {
                    filteredColumns[i] = JSON.parse(JSON.stringify(this.columns[i]));
                    filteredColumns[i].tasks = this.columns[i].tasks.filter(
                        task => {
                            return (task.type === this.activatedBadgeType) || (!this.activatedBadgeType && (task.type === "0" || !task.type))
                        }
                    );
                }
                return filteredColumns;
            }
        },
        data: () => ({
            nameMappings: {
                "0": "Allgemein",
                "1": "Analyse",
                "2": "Spezifikation",
                "3": "Modellierung",
                "4": "Evaluation",
                "5": "Softwareeinführung"
            },
            finishedLoading: true,
            originalColumns: [],
            columns: [
                {
                    title: "Neu",
                    tasks: []
                },
                {
                    title: "In Bearbeitung",
                    tasks: []
                },
                {
                    title: "Geschafft!",
                    tasks: []
                }
            ],
            activatedBadgeType: null
        }),
        mounted() {
            if (this.currentProject) {
                if (!this.currentProject.phase) {
                    this.activatedBadgeType = "1";
                } else {
                    this.activatedBadgeType = Number(this.currentProject.phase) + 1;
                }
                for (let i = 0; i < this.columns.length; i += 1) {
                    for (let j = 0; j < this.tasks.length; j += 1) {
                        if (this.tasks[j].column === this.columns[i].title || this.tasks[j].column === null && i === 0) {
                            this.columns[i].tasks.push(this.tasks[j]);
                        }
                    }
                    this.columns[i].tasks = this.sortColumns(this.columns[i].tasks);
                }
                this.originalColumns = JSON.parse(JSON.stringify(this.columns));
            }
        },
        methods: {
            ...mapActions('tasks', ['updateProjectTask']),
            ...mapActions('rewards', ['triggerScoreAction']),
            sortColumns(column) {
                function compare(a, b) {
                    if (a.position > b.position)
                        return 1;
                    if (a.position < b.position)
                        return -1;
                    return 0;
                }
                return column.sort(compare);
            },
            updateColumns() {
                if (this.currentProject) {
                    this.finishedLoading = false;
                    this.$store.dispatch('tasks/getTasks', this.currentProject.id).then(() => {
                        for (let i = 0; i < this.columns.length; i += 1) {
                            this.columns[i].tasks = [];
                            for (let j = 0; j < this.tasks.length; j += 1) {
                                if (this.tasks[j].column === this.columns[i].title || this.tasks[j].column === null && i === 0) {
                                    this.columns[i].tasks.push(this.tasks[j]);
                                }
                            }
                            this.columns[i].tasks = this.sortColumns(this.columns[i].tasks);
                        }
                    }).finally(() => {
                        this.finishedLoading = true;
                    });
                }
            },
            change(column, index) {
                for (let i = 0; i < column.tasks.length; i += 1) {
                    const updatedTask = JSON.parse(JSON.stringify(column.tasks[i]));
                    updatedTask.column = column.title;
                    updatedTask.position = i;
                    this.updateProjectTask({projectId: this.currentProject.id, task: updatedTask});
                }
                // new finished Task for user
                if (index === 2 && this.originalColumns[2].tasks.length < column.tasks.length) {
                    this.triggerScoreAction({name: "finishTask", score: 1, type: "score"});
                    this.$toast.success('+1 Punkt für Aufgabe abschließen', {
                        position: 'top-right',
                        duration: 60000 // 1 minute
                    });
                }
            },
            getActivatedBadge(phase) {
                if (this.activatedBadgeType === phase) {
                    return "md-accent";
                }
                return "";
            }
        }
    };
</script>

<style scoped>
    .md-layout {
        margin-top: 24px;
    }

    .column-width {
    }
    /* Unfortunately @apply cannot be setup in codesandbox,
    but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
    .ghost-card {
        opacity: 0.5;
        background: #F7FAFC;
        border: 1px solid #4299e1;
    }
</style>
