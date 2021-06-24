<template>
  <input :type="type" class="card" @input="$emit('change-input-handler', $event)" :value="newValue" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    newValue: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
input {
  @extend .card;

  text-align: center;
  font-size: 1rem;
  font-style: oblique;
  padding: 15px 0;
  line-height: 1.1rem;
  border: 0;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 5px rgba($grey-300, 0.5);
  }

  .dark & {
    color: rgba($neon-green, 0.7);
  }
}
</style>
