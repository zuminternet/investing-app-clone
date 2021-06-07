<template>
  <button class="noselect">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
button {
  background-color: $grey-300;
  height: 30px;
  width: max-content;
  border: solid 2px $grey-300;
  border-radius: 10px;
  font-size: 0.7rem;
  line-height: 1rem;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover:not(:disabled) {
    background-color: $grey-500;
    border: solid 2px $grey-500;
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
