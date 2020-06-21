<template>
  <div class="AddTask">
    <Modal :showModal="active" @closeModal="active=false" size="large">
      <div class="md-display-1">Neue Aufgabe hinzufügen</div>
      <md-field>
        <label>Was gibt's zu tun?</label>
        <md-input v-model="form.title"
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
      <md-button @click="onCancel()">Abbrechen</md-button>
      <md-button class="md-raised md-primary" @click="addTask()">Aufgabe erstellen</md-button>
    </Modal>
    <md-button @click="active = true"><md-icon>add</md-icon> Aufgabe hinzufügen</md-button>
  </div>
</template>
<script>
  import {mapActions} from "vuex";
  import Modal from "../Modal";

  export default {
    components: {Modal},
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
      addTask () {
        if (this.form.title != null) {
          this.form.column = this.column;
          this.form.projectId = this.id;
          this.$store.dispatch('tasks/createProjectTask', this.form).then(() => {
            this.taskSaved = true;
            this.active = false;
          }).finally(() => this.$emit('taskCreated'));
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

<style lang="scss" scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>