<template>
  <div class="AddTask">
    <Modal :showModal="active" @closeModal="active=false" size="large">
      <div class="md-display-1">Neue Aufgabe hinzufügen</div>
      <md-field>
        <label>Was gibt's zu tun?</label>
        <md-input v-model="form.title" ref="title"
                  maxlength="60"
        />
      </md-field>
      <md-field>
        <label>Phase</label>
        <md-select v-model="form.type" name="type" id="type">
          <md-option value="0">Allgemein</md-option>
          <md-option value="1">1. Analyse</md-option>
          <md-option value="2">2. Spezifikation</md-option>
          <md-option value="3">3. Modellierung</md-option>
          <md-option value="4">4. Evaluation</md-option>
          <md-option value="5">5. Softwareeinführung</md-option>
        </md-select>
      </md-field>
      <md-button class="md-raised md-primary" @click="addTask()">Aufgabe erstellen</md-button>
      <md-button @click="onCancel()">Abbrechen</md-button>
    </Modal>
    <md-button @click="openModal()" class="md-raised"><md-icon>add</md-icon> Aufgabe hinzufügen</md-button>
  </div>
</template>
<script>
  import {mapActions, mapState} from "vuex";
  import Modal from "../Modal";

  export default {
    components: {Modal},
    computed: {
      ...mapState('tasks', ['tasks']),
    },
    props: {
      column: String,
      id: String
    },
    data: () => ({
      active: false,
      value: null,
      form: {
        title: null,
        type: null,
        column: null
      },
      taskSaved: false
    }),
    methods: {
      ...mapActions('tasks', ['createProjectTask']),
      ...mapActions('rewards', ['triggerScoreAction']),
      openModal() {
        this.active = true;
        this.$nextTick(() => {
          this.$refs.title.$el.focus();
        });
      },
      addTask () {
        if (this.form.title != null) {
          this.form.column = this.column;
          this.form.position = this.tasks.length;
          this.form.projectId = this.id;
          this.$store.dispatch('tasks/createProjectTask', this.form).then(() => {
            this.taskSaved = true;
            this.active = false;
          }).finally(() => {
            this.triggerScoreAction({name: "addTask", score: 1, type: "score"});
            this.$toast.success('+1 Punkt für Aufgabe erstellen', {
              position: 'top-right',
              duration: 60000 // 1 minute
            });
            this.$emit('taskCreated');
          });
        }
      },
      onCancel () {
        this.active = false;
        this.form.title = null;
        this.form.type = null;
      }
    }
  }
</script>