<template>
  <h3 :class="$style.title">
    <slot />
  </h3>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" module>
.title {
  margin-bottom: 12px;
}
</style>
