<template>
  <input :type="type" class="card" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
});
</script>

<style lang="scss" scoped>
input {
  @extend .card;

  text-align: center;
  font-size: 1rem;
  padding: 15px 0;
  line-height: 1.1rem;
  border: 0;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 5px rgba($grey-300, 0.5);
  }
}
</style>
