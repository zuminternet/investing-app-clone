<template>
  <nav>
    <ul class="header-nav-list">
      <slot></slot>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
nav {
  border-bottom: 1px solid var(--app-bg-color);
  height: 48px;
  line-height: 48px;
  padding: 0 12px;
  background-color: var(--header-nav-bg-color);

  .header-nav-list {
    display: flex;

    li {
      cursor: pointer;
    }
  }
}
</style>
