<template>
  <div class="swiper-navigator">
    <naviagtor-button
      v-for="(navigatorButtonName, index) in navigatorButtonNames"
      isSwiperNavigatorButton
      :key="index"
      :buttonIndex="index"
      :slideActiveIndex="slideActiveIndex"
      :navigatorButtonName="navigatorButtonName"
      @set-slide-active-index="$emit('set-slide-active-index', $event)"
    ></naviagtor-button>
  </div>
</template>

<script>
import NaviagtorButton from './NaviagtorButton.vue';

export default {
  name: 'SwiperNavigator',
  components: {
    NaviagtorButton,
  },

  props: {
    navigatorButtonNames: {
      type: Array,
      required: true,
    },

    slideActiveIndex: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style scoped lang="scss">
.swiper-navigator {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 50px;
}
</style>
