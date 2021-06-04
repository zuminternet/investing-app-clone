<template>
  <p class="pure-text">
    <slot></slot>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss">
.pure-text {
  margin: 0;
  height: fit-content;
  font-size: 14px;
  line-height: 2;
  color: $grey-700;
  background-color: transparent;

  cursor: auto;

  .dark & {
    background-color: transparent;
    color: $grey-300;
  }
}
</style>
