<template>
  <button class="noselect">{{ text }}</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  border-radius: 15px;
  cursor: pointer;
}
</style>
