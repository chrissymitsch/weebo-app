<template>
  <div class="AddEvent" v-if="!currentProject.finished">
    <Modal :showModal="active" @closeModal="active=false" size="large">
      <div class="md-display-1">Neuen Termin hinzufügen</div>
      <div class="mode-radios">
        <md-radio v-model="mode" value="single">Einzeltermin</md-radio>
        <md-radio v-model="mode" value="range">Zeitraum</md-radio>
      </div>
      <md-field>
        <label>Wann?</label>
        <date-picker :mode="mode" v-model="selectedDate"
                     :popover="{ placement: 'bottom', visibility: 'click' }"
                     :input-props='{placeholder: "Wann?", readonly: true}'>
          <md-input
                  id="date"
                  slot-scope="{ inputProps }"
                  v-bind="inputProps" />
        </date-picker>
      </md-field>

      <md-field>
        <label>Beschreibung</label>
        <md-input v-model="description" ref="description"
                  maxlength="60" required
        />
      </md-field>

      <md-autocomplete v-model="color" :md-options="types" :md-fuzzy-search="false" readonly>
        <label>Typ</label>

        <template slot="md-autocomplete-item" slot-scope="{ item, term }">
          <span class="color" :style="`background-color: ${colors[item]}`"></span>
          <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
        </template>

        <template slot="md-autocomplete-empty" slot-scope="{ term }">
          Kein Typ "{{ term }}" gefunden.
        </template>
      </md-autocomplete>

      <md-button class="md-raised md-primary" @click="addEvent()">Termin erstellen</md-button>
      <md-button @click="onCancel()">Abbrechen</md-button>
    </Modal>
    <md-button @click="openModal()" class="md-raised"><md-icon>add</md-icon> Termin hinzufügen</md-button>
  </div>
</template>
<script>
  import {mapActions, mapState} from "vuex";
  import DatePicker from 'v-calendar/lib/components/date-picker.umd'
  import Modal from "../Modal";

  export default {
    components: {Modal, DatePicker},
    computed: {
      ...mapState('events', ['events']),
      ...mapState('projects', ['currentProject']),
    },
    props: {
      column: String,
      id: String
    },
    data: () => ({
      active: false,
      selectedDate: null,
      mode: 'single',
      form: null,
      description: null,
      color: null,
      colors: {
        "Deadline": 'crimson',
        "Allgemein": 'darkgray',
        "Meilenstein": 'orange',
        "Feier": 'purple',
        "Test": 'royalblue',
        "Abschluss": 'mediumseagreen',
      },
      types: [
        'Allgemein',
        'Meilenstein',
        'Deadline',
        'Test',
        'Abschluss',
        'Feier'
      ],
    }),
    methods: {
      ...mapActions('events', ['createProjectEvent']),
      ...mapActions('rewards', ['triggerScoreAction']),
      noop () {
        window.alert('noop')
      },
      openModal() {
        this.active = true;
      },
      addEvent () {
        if (this.description != null) {
          if (!this.color) {
            this.color = "Allgemein";
          }
          if (!this.selectedDate) {
            this.selectedDate = new Date();
          }
          if (this.mode === "single") {
            this.form = {
              dot: this.colors[this.color],
              popover: {
                label: this.description,
              },
              description: this.description,
              dates: this.selectedDate,
              excludeDates: null,
            };
          } else {
            this.form = {
              highlight: this.colors[this.color],
              content: this.colors[this.color],
              popover: {
                label: this.description,
              },
              description: this.description,
              dates: this.selectedDate,
              excludeDates: null,
            };
          }

          this.form.projectId = this.currentProject.id;
          this.$store.dispatch('events/createProjectEvent', this.form).then(() => {
            this.active = false;
          }).finally(() => {
            this.$emit('eventCreated');
          });
        }
      },
      onCancel () {
        this.active = false;
        this.description = null;
        this.color = null;
        this.selectedDate = null;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .color {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-right: 16px;
    border: 1px solid rgba(#000, .12);
  }

  .mode-radios {
    display: flex;
    justify-content: flex-start;
    align-content: center;
  }
</style>