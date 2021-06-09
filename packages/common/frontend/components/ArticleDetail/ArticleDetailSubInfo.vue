<template>
  <p :class="$style.info">
    <slot />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" module>
.info {
  border-bottom: 1px solid gray;
  padding-bottom: 8px;
  word-break: keep-all;
}
</style>
