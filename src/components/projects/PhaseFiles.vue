<template>
  <md-list class="files-list" v-if="phaseFiles.length > 0">
    <md-list-item md-expand>
      <span class="md-list-item-text">Dateien</span>

      <div slot="md-expand">
        <div class="show-for-small">
          <md-list>
            <md-list-item v-for="(file, index) in phaseFiles" :key="index">
                                <span class="md-list-item-text persona-name">
                                    <a :href="file.url" target=_blank>{{ file.name }}</a>
                                </span>
            </md-list-item>
          </md-list>
        </div>

        <md-table class="hide-for-small" v-model="phaseFiles" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-sort-by="type">
              <a :href="item.url" target=_blank>
                <md-icon>
                  {{getTypeIcon(item.type)}}
                </md-icon>
                <md-tooltip md-direction="top">{{ item.type }}</md-tooltip>
              </a>
            </md-table-cell>
            <md-table-cell md-label="Dateiname" md-sort-by="name">
              <a :href="item.url" target=_blank>{{ item.name }}</a>
            </md-table-cell>
            <md-table-cell md-label="Größe" md-sort-by="size">{{ formatBytes(item.size) }}</md-table-cell>
            <md-table-cell md-label="Erstellt" md-sort-by="createTimestamp">{{ format_date(item.createTimestamp) }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </md-list-item>
  </md-list>
</template>

<script>
  import {mapState} from "vuex";
  import moment from "moment";

  export default {
    computed: {
      ...mapState('files', ['files']),
      ...mapState('projects', ['currentProject'])
    },
    data: () => ({
      phaseFiles: []
    }),
    props: {
      givenPhase: Number
    },
    mounted() {
      if (this.files) {
        this.phaseFiles = (JSON.parse(JSON.stringify(this.files))).filter(file => (file.phase === this.givenPhase) || (!file.phase && this.givenPhase === 0));
      }
    },
    methods: {
      getTypeIcon(type) {
        if (type && type.startsWith("image")) {
          return "insert_photo";
        }
        if (type && type.startsWith("text")) {
          return "text_snippet";
        }
        return "insert_drive_file";
      },
      formatBytes(bytes) {
        if (!bytes || bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / (k ** i)).toFixed(0))} ${sizes[i]}`;
      },
      format_date(value){
        if (value) {
          return moment(value).format('DD.MM.YYYY, HH:mm')
        }
        return '';
      },
    }
  };
</script>

<style lang="scss" scoped>
  .files-list {
    margin-top: 24px;
  }
</style>