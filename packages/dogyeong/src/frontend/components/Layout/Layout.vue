<template>
  <div class="main-layout"><slot></slot></div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  main {
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
  }
}
</style>
