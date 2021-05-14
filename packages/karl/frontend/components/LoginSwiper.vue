<template>
  <swiper class="swiper" :options="swiperOptions">
    <swiper-slide class="swiper-slide">
      <div class="swiper-img"></div>
      <CustomText :message="realTimePrice"></CustomText>
      <CustomText :message="realTimePriceDetail"></CustomText>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <div class="swiper-img"></div>
      <CustomText :message="realTimePrice"></CustomText>
      <CustomText :message="realTimePriceDetail"></CustomText>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <div class="swiper-img"></div>
      <CustomText :message="realTimePrice"></CustomText>
      <CustomText :message="realTimePriceDetail"></CustomText>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <div class="swiper-img"></div>
      <CustomText :message="realTimePrice"></CustomText>
      <CustomText :message="realTimePriceDetail"></CustomText>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import { CustomText } from '../components'
import { text } from '../constants'

Vue.use(VueAwesomeSwiper);

export default {
  name: "LoginSwiper",
  components: {
    Swiper,
    SwiperSlide,
    CustomText
  },


  data: function() {
    return {
      swiperOptions : {
        pagination: {
          el: '.swiper-pagination'
        },
      },
      realTimePrice: text.realTimePrice,
      realTimePriceDetail: text.realTimePriceDetail,
    }
  }
}
</script>

<style scoped>
  .swiper {
    display: flex;
    width: 100%;
  }
  .swiper-img {
    width: 80px;
    height: 80px;
    background-color: brown;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: chartreuse;
    align-items: center;
    text-align: center;
    font-weight: bold;
  }


</style>