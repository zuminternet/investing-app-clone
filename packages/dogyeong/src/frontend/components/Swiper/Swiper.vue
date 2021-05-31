<template>
  <div ref="swiperContainer" class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Swiper from 'swiper';

export default Vue.extend({
  name: 'Swiper',

  mounted() {
    this.swiper = new Swiper(this.$refs.swiperContainer, {
      loop: false,
      touchAngle: 20,
      threshold: 14,
      speed: 150,
      grabCursor: true,
    });

    this.swiper.on('slideChangeTransitionEnd', (swiper) => this.$emit('endSlide', swiper));
  },

  beforeDestroy() {
    this.swiper.destroy();
  },

  methods: {
    slideTo(index) {
      this.swiper.slideTo(index);
    },
  },
});
</script>

<style lang="scss" scoped>
.swiper-container {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
}
</style>
