<template>
  <div id="home-page">
    <multipurpose-header></multipurpose-header>
    <top-naviagtor></top-naviagtor>
    <item-card-list-swiper></item-card-list-swiper>
    <bottom-naviagtor></bottom-naviagtor>
  </div>
</template>

<script>
import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import BottomNaviagtor from '../components/BottomNaviagtor.vue'
import TopNaviagtor from '../components/TopNaviagtor.vue'
import MultipurposeHeader from '../components/MultipurposeHeader.vue'
import ItemCardList from '../components/ItemCardList.vue'
import ItemCardListSwiper from '../components/ItemCardListSwiper.vue'


export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide,
    BottomNaviagtor,
    TopNaviagtor,
    MultipurposeHeader,
    ItemCardList,
    ItemCardListSwiper
  }
};
</script>

<style>
  #home-page {
    display:flex;
    flex-direction: column;
    flex:1
  }

  /* .item-card-list-swiper {
    flex:1
  } */
</style>
