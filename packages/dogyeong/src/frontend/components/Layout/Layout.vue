<template>
  <div class="layout"><slot></slot></div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  main {
    overflow: hidden;
  }
}
</style>
