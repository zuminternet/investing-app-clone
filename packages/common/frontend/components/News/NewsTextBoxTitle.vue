<template>
  <h4>
    <slot></slot>
  </h4>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NewsTextBoxTitle',
});
</script>

<style lang="scss" scoped>
h4 {
  font-size: 18px;
  margin-bottom: 8px;
}
</style>
