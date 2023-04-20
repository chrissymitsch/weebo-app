<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="close">
          <md-button class="md-icon-button" @click="$emit('close')"><md-icon>close</md-icon></md-button>
        </div>
        <div class="main-content">
          <img class="app-logo" src="@/assets/logo.png" />
          <h3 class="title">Install {{ appTitle }}</h3>
          <p class="description">
            Install this application to your home screen for quickly and easy
            access when you're on the go.
          </p>
        </div>

        <div class="footer">
          Just tap
          <img
            class="apple-navigation-action-img"
            src="@/assets/img/apple-navigation-action.png"
          />then 'Add to Home Screen'
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped>
</style>
