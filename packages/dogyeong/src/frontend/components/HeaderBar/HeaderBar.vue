<template>
  <header>
    <slot></slot>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HeaderBar',
});
</script>

<style lang="scss" scoped>
header {
  background-color: var(--header-bg-color);
  width: 100%;
  height: 48px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--app-bg-color);
}
</style>
