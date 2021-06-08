<template>
  <Words class="noselect title-area title-text">
    <slot></slot>
  </Words>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words';

export default Vue.extend({
  components: { Words },
});
</script>

<style lang="scss" scoped>
.title-area {
  @extend .boundary;

  margin-top: $margin-padding-15;
  color: $blue-900;
}
</style>
