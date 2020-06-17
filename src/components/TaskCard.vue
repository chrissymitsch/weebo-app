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
        <badge v-if="task.type" :color="badgeColor">{{task.type}}</badge>
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
  import Avatar from "./Avatar";

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
          Design: "purple",
          "Feature Request": "teal",
          Backend: "blue",
          QA: "green",
          default: "teal"
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
