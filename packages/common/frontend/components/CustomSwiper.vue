<template>
  <div>
    <swiper-navigator :navigatorButtonNames="navigatorButtonNames"></swiper-navigator>
    <swiper class="custom-swiper">
      <slot></slot>
    </swiper>
  </div>
</template>

<script>
import {Swiper} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import SwiperNavigator from './SwiperNavigator.vue'

export default {
  name:"CustomSwiper",
  components: {
    Swiper,
    SwiperNavigator,
  },
  props: ['navigatorButtonNames']
}
</script>

<style scoped lang="scss">
  .custom-swiper {
    display: flex;
    flex:1;
    width: 100%;
  }

</style>