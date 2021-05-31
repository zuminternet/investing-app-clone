<template>
  <div class="swiper-slide">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SwiperSlide',
});
</script>

<style lang="scss" scoped></style>
