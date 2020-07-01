<template>
  <div class="Modal">
    <div class="modal-mask" v-if="modalActive">
      <div :class="`modal-wrapper ${size}`" @click.self="$emit('closeModal')">
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
    name: 'Modal',
    props: {
      showModal: Boolean,
      size: String
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
