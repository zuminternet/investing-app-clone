<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NewsList',
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  background-color: white;
}
</style>
