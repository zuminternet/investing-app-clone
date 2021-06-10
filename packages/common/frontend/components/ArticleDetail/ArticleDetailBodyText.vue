<template>
  <p :class="$style.text">
    <slot />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" module>
.text {
  padding: 20px 0;
}
</style>
