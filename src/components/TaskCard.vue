<template>
  <div v-if="finishedLoading" class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{task.title}}</p>

      <img
              class="w-6 h-6 rounded-full ml-3"
              :src="creator.photoURL"
              alt="Avatar"
      >
    </div>
    <div class="flex mt-4 justify-between items-center">
      <span class="text-sm text-gray-600">{{format_date(task.createTimestamp)}}</span>
      <badge v-if="task.type" :color="badgeColor">{{task.type}}</badge>
    </div>
  </div>
</template>
<script>
  import moment from 'moment';
  import Badge from "./Badge.vue";

  export default {
    components: {
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
    data: () => ({
      creator: null,
      finishedLoading: false
    }),
    created() {
      this.$store.dispatch('projects/getProjectMember', this.task.creator).then(data => {
        this.creator = data;
      }).finally(() => {
        this.finishedLoading = true;
      });
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
  .w-6 {
    height: 1.5rem;
  }
  /* Unfortunately @apply cannot be setup in codesandbox,
  but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
  .ghost-card {
    opacity: 0.5;
    background: #F7FAFC;
    border: 1px solid #4299e1;
  }
</style>
