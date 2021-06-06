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
  border: none;
  border-radius: 10px;
  font-size: 0.7rem;
  line-height: 1rem;
  cursor: pointer;
}
</style>
