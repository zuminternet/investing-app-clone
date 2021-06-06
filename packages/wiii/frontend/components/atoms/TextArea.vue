<template>
  <textarea @input="$emit('change-text-handler', $event)" :value="replyText" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    replyText: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
  width: 100%;
  height: 100%;
  min-height: 50px;
  max-height: 150px;
  margin: 5px;
  border: none;
  border-radius: 10px;

  &:focus {
    outline: none;
    box-shadow: 0 0 2px $grey-700;
  }
}
</style>