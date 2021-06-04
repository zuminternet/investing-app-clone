<template>
  <Words class="title noselect" :textType="10">
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
.title {
  @extend .boundary;

  margin-top: $margin-padding-15;
  line-height: 1.5;
  font-size: 2rem;
  font-weight: 900;

  color: $blue-900;
  background-color: $grey-100;
}
</style>
