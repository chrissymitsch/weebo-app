<template>
  <div class="page-container">
    <nav-bar></nav-bar>
    <new-content-available-toastr
            v-if="newContentAvailable"
            class="new-content-available-toastr"
            :refreshing-app="refreshingApp"
            @refresh="serviceWorkerSkipWaiting"
    ></new-content-available-toastr>
    <apple-add-to-home-screen-modal
            v-if="showAddToHomeScreenModalForApple"
            class="apple-add-to-home-screen-modal"
            @close="closeAddToHomeScreenModalForApple(false)"
    >
    </apple-add-to-home-screen-modal>
    <chat></chat>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import NavBar from '@/components/NavBar'
  import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
  import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
  import Chat from '@/components/messages/Chat'

export default {
  components: { NavBar, NewContentAvailableToastr, AppleAddToHomeScreenModal, Chat },
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp'])
  },
  methods: mapActions('app', [
    'closeAddToHomeScreenModalForApple',
    'serviceWorkerSkipWaiting'
  ])
}
</script>
<style lang="scss">
  @import 'src/assets/css/styles.scss';
  @import 'src/assets/css/positioning.scss';
</style>
