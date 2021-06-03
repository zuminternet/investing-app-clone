<template>
  <p class="pure-text">{{ contents }}</p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    contents: {
      type: [String, Number],
      required: true,
    },
  },
});
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
