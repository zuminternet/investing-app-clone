<template>
  <swiper class="custom-swiper">
    <slot></slot>
  </swiper>
</template>

<script>
import {Swiper} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name:"CustomSwiper",
  components: {
    Swiper,
  }
}
</script>

<style scoped lang="scss">
  .custom-swiper {
    display: flex;
    flex:1;
    width: 100%;
  }

</style>