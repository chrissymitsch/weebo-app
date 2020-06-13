<template>
  <div class="Rewarding">
    <div class="modal-mask" v-if="modalActive">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="close">
            <md-button class="md-icon-button" @click="$emit('closeModal')"><md-icon>close</md-icon></md-button>
          </div>
          <div class="main-content">
            <slot>Verflucht seist du, Perry das Schnabeltier!</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Rewarding',
    props: {
      showModal: Boolean
    },
    data: () => ({
      modalActive: false
    }),
    watch: {
      showModal() {
        this.modalActive = this.showModal;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
