<template>
  <label :for="forId" class="noselect"><slot /></label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    forId: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
label {
  width: 100%;
  text-align: left;
  font-size: 0.8rem;
  color: $grey-700;
}
</style>