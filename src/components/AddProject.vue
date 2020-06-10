<template>
  <div>
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Neues Projekt anlegen</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100 md-small-size-100">
              <md-field :class="getValidationClass('projectName')">
                <label>Projektname</label>
                <md-input v-model="form.projectName" :disabled="projectCreationPending"
                          maxlength="30"
                          @input="setProjectNameToCreate"
                          @keypress.enter="validate()" />
                <span class="md-error" v-if="!$v.form.projectName.required">Es muss ein Projektname angegeben werden!</span>
                <span class="md-error" v-else-if="!$v.form.projectName.minlength || !$v.form.projectName.maxlength">Der Projektname ist ungültig!</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="projectCreationPending" />

        <md-card-actions>
          <md-button
                  class="md-raised md-primary create-project-btn"
                  @click="validate()"
                  :disabled="$v.$invalid && projectCreationPending">Projekt anlegen</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="projectSaved">Das Projekt wurde erfolgreich erstellt.</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {
    name: 'FormValidation',
    computed: mapState('projects', [
      'projectCreationPending'
    ]),
    mixins: [validationMixin],
    data: () => ({
      form: {
        projectName: null
      },
      projectSaved: false
    }),
    validations: {
      form: {
        projectName: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(30)
        }
      }
    },
    methods: {
      ...mapMutations('projects', ['setProjectNameToCreate']),
      ...mapActions('projects', ['triggerAddProjectAction']),
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName];

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
        return null;
      },
      clearForm () {
        this.$v.$reset();
        this.form.projectName = null;
      },
      validate () {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.triggerAddProjectAction(this.$store.navigator);
          this.projectSaved = true;
          this.clearForm();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .create-project-btn {
    cursor: pointer;
  }
</style>
