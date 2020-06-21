<template>
  <div>
    <md-card v-if="task">
      <md-card-content class="task-card">
        <p>{{task.title}}</p>
        <avatar :user-id="task.creator"></avatar>
      </md-card-content>
      <md-divider></md-divider>
      <md-card-content class="task-card">
        <span class="md-caption">{{format_date(task.createTimestamp)}}</span>
        <badge :color="badgeColor">{{badgeTypeName}}</badge>
      </md-card-content>
    </md-card>
    <md-card v-if="!task" class="empty-task md-accent">
      <md-card-content>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
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
      badgeColor() {
        const mappings = {
          0: "silver",
          1: "royalblue",
          2: "crimson",
          3: "seagreen",
          4: "darkmagenta",
          5: "gold",
          default: "silver"
        };
        return mappings[this.task.type] || mappings.default;
      },
      badgeTypeName() {
        const mappings = {
          0: "Allgemein",
          1: "Analyse",
          2: "Spezifikation",
          3: "Modellierung",
          4: "Evaluation",
          5: "Softwareeinführung",
          default: "Allgemein"
        };
        return mappings[this.task.type] || mappings.default;
      }
    },
    methods: {
      format_date(value){
        if (value) {
          return moment(value).format('DD.MM.YYYY')
        }
        return '';
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
