<template>
  <div class="label-wrapper">
    <label :for="forId" class="reset noselect label-text"><slot /></label>
  </div>
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
.label-wrapper {
  .label-text {
    display: block;
    font-size: 0.8rem;
    font-weight: 500;
    font-style: oblique;
    line-height: 1.2rem;
    color: $grey-700;
  }
}
</style>
