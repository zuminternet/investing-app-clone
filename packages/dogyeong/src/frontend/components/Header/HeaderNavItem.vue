<template>
  <li :class="{ active: active }" @click.prevent="$emit('clickItem')">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HeaderNavItem',

  props: {
    active: {
      type: Boolean,
      default: () => false,
    },
  },
});
</script>

<style lang="scss" scoped>
li {
  margin-right: 16px;
  color: var(--sub-text-color);

  &.active {
    color: var(--text-color);
  }
}
</style>
