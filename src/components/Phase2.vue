<template>
    <z-view class="Phase2">
        <p class="md-title">Phase 2: Spezifikation</p>
        <p class="md-caption">In dieser Phase werden Anforderungen spezifiziert.</p>
        <p><md-button class="md-icon-button" @click="goBack()"><md-icon>close</md-icon></md-button></p>
    </z-view>
</template>

<script>
    export default {
        name: "Phase2",
        methods: {
            goBack() {
                this.$zircle.goBack();
            }
        }
    };
</script>

<style scoped>
</style>
