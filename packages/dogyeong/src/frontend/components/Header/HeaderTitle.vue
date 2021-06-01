<template>
  <h1>
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </h1>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HeaderTitle',
});
</script>

<style lang="scss" scoped>
h1 {
  background-color: var(--header-bg-color);
  width: 100%;
  height: 60px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);
}
</style>
