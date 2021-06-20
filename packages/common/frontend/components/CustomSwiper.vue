<template>
  <div>
    <swiper-navigator
      :navigatorButtonNames="navigatorButtonNames"
      :slideActiveIndex="slideActiveIndex"
      @set-slide-active-index="setSlideActiveIndex"
    ></swiper-navigator>
    <swiper class="custom-swiper" ref="customSwiper" @slideChange="getSlideIndex">
      <slot></slot>
    </swiper>
  </div>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

import SwiperNavigator from './SwiperNavigator.vue';

export default {
  name: 'CustomSwiper',
  components: {
    Swiper,
    SwiperNavigator,
  },
  props: {
    navigatorButtonNames: {
      type: Array,
      required: true,
    },
  },

  computed: {
    swiper() {
      return this.$refs.customSwiper.$swiper;
    },
  },
  methods: {
    getSlideIndex() {
      this.slideActiveIndex = this.swiper.activeIndex;
    },
    setSlideActiveIndex(buttonIndex) {
      this.swiper.activeIndex = buttonIndex;
      this.slideActiveIndex = this.swiper.activeIndex;
    },
  },

  data() {
    return {
      slideActiveIndex: 0,
    };
  },

  mounted() {
    this.getSlideIndex();
  },
};
</script>

<style scoped lang="scss">
.custom-swiper {
  display: flex;
  flex: 1;
  width: 100%;
}
</style>
