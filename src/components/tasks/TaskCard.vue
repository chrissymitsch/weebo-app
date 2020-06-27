<template>
  <div>
    <md-card v-if="task">
      <md-card-content class="task-card">
        <md-field v-if="editTask">
          <md-input v-model="editableTask.title" ref="title" maxlength="60"/>
        </md-field>
        <p v-if="!editTask">{{task.title}}</p>
        <md-menu md-size="medium" md-align-trigger>
          <div md-menu-trigger><avatar :user-id="task.creator"></avatar></div>

          <md-menu-content>
            <md-menu-item @click="changeCreator()">
              Mir zuweisen
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-card-content>
      <md-divider></md-divider>
      <md-card-content class="task-card">
        <span class="md-caption">{{format_date(task.createTimestamp)}}</span>
        <md-button v-if="!editTask" class="md-icon-button md-dense" @click="triggerEditFunctions()"><md-icon>edit</md-icon></md-button>
        <md-button v-if="editTask" class="md-icon-button md-dense" @click="saveEditedTask()"><md-icon>check</md-icon></md-button>
        <md-menu md-size="medium" md-align-trigger>
          <badge :color="getBadgeColor()" md-menu-trigger>
            {{getBadgeName()}}
          </badge>

          <md-menu-content>
            <div v-for="(badgeColor, index) in colorMappings" :key="index">
              <md-menu-item @click="changeBadge(index)">
                <badge :color="badgeColor" md-menu-trigger>{{ nameMappings[index] }}</badge>
              </md-menu-item>
            </div>
          </md-menu-content>
        </md-menu>
      </md-card-content>
    </md-card>
    <md-card v-if="!task" class="empty-task md-accent">
      <md-card-content>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import moment from 'moment';
  import Badge from "./Badge.vue";
  import Avatar from "../users/Avatar";

  export default {
    components: {
      Avatar,
      Badge
    },
    props: {
      task: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      ...mapState('authentication', ['user']),
      ...mapState('projects', ['currentProject'])
    },
    data: () => ({
      editableTask: null,
      colorMappings: {
        "0": "silver",
        "1": "royalblue",
        "2": "crimson",
        "3": "seagreen",
        "4": "darkmagenta",
        "5": "gold"
      },
      nameMappings: {
        "0": "Allgemein",
        "1": "Analyse",
        "2": "Spezifikation",
        "3": "Modellierung",
        "4": "Evaluation",
        "5": "Softwareeinführung"
      },
      editTask: false
    }),
    methods: {
      getBadgeColor() {
        if (!this.task.type) {
          return this.colorMappings["0"];
        }
        return this.colorMappings[this.task.type];
      },
      getBadgeName() {
        if (!this.task.type) {
          return this.nameMappings["0"];
        }
        return this.nameMappings[this.task.type];
      },
      format_date(value){
        if (value) {
          return moment(value).format('DD.MM.YYYY')
        }
        return '';
      },
      saveTask() {
        this.$store.dispatch('tasks/updateProjectTask', {projectId: this.currentProject.id, task: this.editableTask}).then(() => {
          this.$emit('taskEdited');
        });
      },
      triggerEditFunctions() {
        if (!this.editableTask) {
          this.editableTask = JSON.parse(JSON.stringify(this.task));
        }
        this.editTask = !this.editTask;
      },
      saveEditedTask() {
        this.editTask = !this.editTask;
        this.saveTask();
      },
      changeCreator() {
        if (!this.editableTask) {
          this.editableTask = JSON.parse(JSON.stringify(this.task));
        }
        this.editableTask.creator = this.user.id;
        this.saveTask();
      },
      changeBadge(badge) {
        if (!this.editableTask) {
          this.editableTask = JSON.parse(JSON.stringify(this.task));
        }
        this.editableTask.type = badge;
        this.saveTask();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .task-card {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 8px;
    align-items: center;

    .md-avatar {
      margin: 0;
    }

    .md-input {
      font-size: 14px;
    }

    .md-menu .md-chip {
      cursor: pointer;
    }
  }

  .empty-task {
    opacity: 0.2;
  }

  .ghost-card {
    opacity: 0.5;
    background: #F7FAFC;
    border: 1px solid #4299e1;
  }
</style>
