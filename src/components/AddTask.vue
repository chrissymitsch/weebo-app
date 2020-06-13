<template>
  <div class="AddTask">
    <modal v-if="active">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                Aufgabe hinzufügen
                <md-button class="md-icon-button" @click="active = false"><md-icon>close</md-icon></md-button>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <md-field>
                  <label>Was gibt's zu tun?</label>
                  <md-input v-model="form.title"
                            maxlength="60"
                            />
                </md-field>
                <md-field>
                  <label>Typ</label>
                  <md-select v-model="form.type" name="type" id="type">
                    <md-option value="0">---</md-option>
                    <md-option value="Design">Design</md-option>
                    <md-option value="Feature Request">Feature Request</md-option>
                  </md-select>
                </md-field>

              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button" @click="onCancel()">
                  Abbrechen
                </button>
                <button class="modal-default-button" @click="addTask()">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <md-button @click="active = true"><md-icon>add</md-icon> Aufgabe hinzufügen</md-button>
  </div>
</template>
<script>
  import {mapActions} from "vuex";

  export default {
    props: {
      column: String,
      projectId: String
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
          this.$store.dispatch('tasks/createProjectTask', this.form, this.projectId).then(() => {
            this.taskSaved = true;
            this.active = false;
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