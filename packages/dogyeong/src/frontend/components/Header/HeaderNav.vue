<template>
  <nav>
    <slot></slot>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
nav {
  border-bottom: 1px solid var(--app-bg-color);
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  background-color: var(--header-nav-bg-color);
}
</style>
