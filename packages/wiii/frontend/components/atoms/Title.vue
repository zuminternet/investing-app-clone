<template>
  <h1 class="card noselect">{{ title }}</h1>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
h1.card {
  color: $blue-700;
  font-size: 2em;
  font-weight: 900;
}
</style>
