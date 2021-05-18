<template>
  <swiper class="item-detail-contents-swiper">
      <swiper-slide>
        <item-detail-overall-content></item-detail-overall-content>
      </swiper-slide>
      <swiper-slide>
        <item-card-list :excludingHeight="210">></item-card-list>
      </swiper-slide>
    </swiper>
</template>

<script>
import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import ItemCardList from '../components/ItemCardList.vue'
import ItemDetailOverallContent from '../components/ItemDetailOverallContent.vue'


export default {
  name:"ItemDetailContentsSwiper",
  components: {
    Swiper,
    SwiperSlide,
    ItemCardList,
    ItemDetailOverallContent
  }
}
</script>

<style scoped>
  .item-detail-contents-swiper {
    display: flex;
    flex:1;
    width: 100%;
  }

</style>