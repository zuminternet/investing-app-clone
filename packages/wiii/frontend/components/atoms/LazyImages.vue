<template>
  <img :data-src="src" :alt="alt" ref="lazyImage" />
</template>

<script lang="ts">
import Vue from 'vue';
import lazyloading from '@/utils/lazyloading';

export default Vue.extend({
  name: 'LazyImage',

  props: {
    src: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      default: '',
    },
  },

  mounted() {
    lazyloading(this.$refs.lazyImage);
  },
});
</script>

<style lang="scss" scoped>
img {
  object-fit: contain;
}
</style>
