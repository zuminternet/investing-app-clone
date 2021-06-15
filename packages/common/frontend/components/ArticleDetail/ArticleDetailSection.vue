<template>
  <section :class="$style.section">
    <slot />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" module>
.section {
  padding: 12px;
}
</style>
