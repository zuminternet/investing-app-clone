<template>
  <button :class="$style.button" @click.prevent="$emit('clickHeaderButton')">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HeaderButton',
});
</script>

<style lang="scss" module>
.button {
  padding: 6px;
  margin-right: 8px;
  font-size: 20px;
  color: var(--text-color);
}
</style>
