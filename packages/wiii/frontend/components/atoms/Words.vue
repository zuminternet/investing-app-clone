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
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;

  color: inherit;
  background-color: transparent;
  cursor: auto;

  &.title-text {
    line-height: 1.5;
    font-size: 2rem;
    font-weight: 900;

    cursor: pointer;
  }

  &.subtitle {
    font-size: 1.4rem;
    line-height: 1.5;
  }

  &.mini {
    width: fit-content;
    font-size: 0.6rem;
    line-height: 1.3;
    font-style: oblique;
    color: $grey-500;
  }
}
</style>
