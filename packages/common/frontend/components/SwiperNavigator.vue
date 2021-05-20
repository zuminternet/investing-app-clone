<template>
  <div class="swiper-navigator">
    <naviagtor-button v-for="(navigatorButtonName, index) in navigatorButtonNames" :key="index">{{navigatorButtonName}}</naviagtor-button>
  </div>
</template>

<script>
import NaviagtorButton from './NaviagtorButton.vue'

export default {
  name: "SwiperNavigator",
  components: {
    NaviagtorButton,
  },
  props: ['navigatorButtonNames'],
}
</script>
<style scoped lang="scss">
  .swiper-navigator {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    height: 50px;
  }
</style>