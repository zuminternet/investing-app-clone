<template>
  <div>
    <slot name="left"></slot>
    <h1>
      <slot></slot>
    </h1>
    <slot name="right"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HeaderTitle',
});
</script>

<style lang="scss" scoped>
div {
  background-color: var(--header-bg-color);
  width: 100%;
  height: 60px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid var(--border-color);

  h1 {
    font-size: 20px;
    font-weight: 600;
    flex: 1;
  }
}
</style>
