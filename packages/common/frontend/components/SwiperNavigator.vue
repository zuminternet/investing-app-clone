<template>
  <div class="swiper-navigator">
    <naviagtor-button
      v-for="(navigatorButtonName, index) in navigatorButtonNames"
      :key="index"
      :buttonIndex="index"
      :slideActiveIndex="slideActiveIndex"
      @set-slide-active-index="$emit('set-slide-active-index', $event)"
      >{{ navigatorButtonName }}</naviagtor-button
    >
  </div>
</template>

<script>
import NaviagtorButton from './NaviagtorButton.vue';

export default {
  name: 'SwiperNavigator',
  components: {
    NaviagtorButton,
  },
  props: ['navigatorButtonNames', 'slideActiveIndex'],
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
