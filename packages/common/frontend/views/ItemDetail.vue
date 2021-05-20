<template>
  <div id="item-detail-page">
    <multipurpose-header :itemDetailInformations="itemDetailInformations"></multipurpose-header>
    <item-detail-price-box :itemDetailInformations="itemDetailInformations"></item-detail-price-box>
    <top-naviagtor></top-naviagtor>
    <custom-swiper>
      <swiper-slide>
        <item-detail-overall-content :itemDetailInformations="itemDetailInformations" :excludingHeight="210"></item-detail-overall-content>
      </swiper-slide>
      <swiper-slide>
        <item-detail-overall-content :itemDetailInformations="itemDetailInformations" :excludingHeight="210"></item-detail-overall-content>
      </swiper-slide>
      <swiper-slide>
        <item-detail-overall-content :itemDetailInformations="itemDetailInformations" :excludingHeight="210"></item-detail-overall-content>
      </swiper-slide>
    </custom-swiper>
    <!-- <item-detail-contents-swiper :itemDetailInformations="itemDetailInformations"></item-detail-contents-swiper> -->
    <bottom-naviagtor></bottom-naviagtor>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {SwiperSlide} from 'vue-awesome-swiper'


import BottomNaviagtor from '../components/BottomNaviagtor.vue'
import TopNaviagtor from '../components/TopNaviagtor.vue'
import MultipurposeHeader from '../components/MultipurposeHeader.vue'
import ItemDetailContentsSwiper from '../components/ItemDetailContentsSwiper.vue'
import ItemDetailPriceBox from '../components/ItemDetailPriceBox.vue'
import CustomSwiper from '../components/CustomSwiper.vue'
import ItemDetailOverallContent from '../components/ItemDetailOverallContent.vue'


export default {
  name:"ItemDetail",
  components: {
    BottomNaviagtor,
    TopNaviagtor,
    MultipurposeHeader,
    ItemDetailContentsSwiper,
    ItemDetailPriceBox,
    CustomSwiper,
    SwiperSlide,
    ItemDetailOverallContent
  },

  computed: {
    ...mapState({
      itemDetailInformations: state => state.market.itemDetailInformations
    })
  },
  
}
</script>

<style scoped lang='scss'>
#item-detail-page {
    display:flex;
    flex-direction: column;
    flex:1
  }

</style>