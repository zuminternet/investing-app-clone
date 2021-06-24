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
  background-color: rgba(224, 224, 224, 1);
  height: 30px;
  width: max-content;
  border: solid 2px rgba(224, 224, 224, 1);
  border-radius: 10px;
  font-size: 0.7rem;
  line-height: 1rem;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:hover:not(:disabled) {
    background-color: rgba(158, 158, 158, 1);
    border: solid 2px rgba(158, 158, 158, 1);
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
