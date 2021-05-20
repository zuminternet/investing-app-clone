<template>
  <swiper class="item-detail-contents-swiper">
      <swiper-slide>
        <item-detail-overall-content :itemDetailInformations="itemDetailInformations"></item-detail-overall-content>
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
  },
  props: ['itemDetailInformations'],
}
</script>

<style scoped lang="scss">
  .item-detail-contents-swiper {
    display: flex;
    flex:1;
    width: 100%;
  }

</style>