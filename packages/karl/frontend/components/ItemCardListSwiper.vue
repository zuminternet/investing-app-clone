<template>
  <swiper class="item-card-list-swiper">
      <swiper-slide>
        <item-card-list></item-card-list>
      </swiper-slide>
      <swiper-slide>
        <item-card-list></item-card-list>
      </swiper-slide>
      <swiper-slide>
        <item-card-list></item-card-list>
      </swiper-slide>
    </swiper>
</template>

<script>
import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import ItemCardList from '../components/ItemCardList.vue'


export default {
  name:"ItemCardListSwiper",
  components: {
    Swiper,
    SwiperSlide,
    ItemCardList
  }
}
</script>

<style>
  .item-card-list-swiper {
    flex:1
  }

</style>