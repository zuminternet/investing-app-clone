<template>
  <h1 class="title noselect">{{ title }}</h1>
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
.title {
  @extend .boundary;

  margin-top: $margin-padding-15;
  line-height: 1.5;
  font-size: 2em;
  font-weight: 900;

  color: $blue-900;
  background-color: $grey-100;
}
</style>
