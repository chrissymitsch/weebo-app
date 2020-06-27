<template>
  <div class="main-wrapper">
    <div class="page-wrapper">
      <h1 class="title">
        <md-progress-spinner class="md-accent" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        Laden...
      </h1>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isNil } from 'lodash'

export default {
  computed: mapState('authentication', ['user']),
  watch: {
    user: {
      handler(user) {
        if (user === undefined) return;

        if (this.$route.query.redirectUrl === this.$route.path) {
          this.$router.push('/')
        }

        const redirectUrl = isNil(user)
          ? `/login?redirectUrl=${this.$route.query.redirectUrl}`
          : this.$route.query.redirectUrl;

        this.$router.push(redirectUrl)
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/theme/variables.scss';

  .title {
    text-align: center;
  }

  .page-wrapper {
    height: 100vh;
    display: flex;
    justify-content: start;
    flex-direction: column;
  }
</style>