<template>
  <div id="item-detail-page">
    <multipurpose-header :itemDetailInformations="itemDetailInformations"></multipurpose-header>
    <item-detail-price-box :itemDetailInformations="itemDetailInformations"></item-detail-price-box>
    <custom-swiper :navigatorButtonNames="navigatorButtonNames">
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
    <bottom-naviagtor></bottom-naviagtor>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {SwiperSlide} from 'vue-awesome-swiper'
import { text } from '../constants'


import BottomNaviagtor from '../components/BottomNaviagtor.vue'
import TopNaviagtor from '../components/TopNaviagtor.vue'
import MultipurposeHeader from '../components/MultipurposeHeader.vue'
import ItemDetailPriceBox from '../components/ItemDetailPriceBox.vue'
import CustomSwiper from '../components/CustomSwiper.vue'
import ItemDetailOverallContent from '../components/ItemDetailOverallContent.vue'


export default {
  name:"ItemDetail",
  components: {
    BottomNaviagtor,
    TopNaviagtor,
    MultipurposeHeader,
    ItemDetailPriceBox,
    CustomSwiper,
    SwiperSlide,
    ItemDetailOverallContent
  },

  data() {
    return {
      navigatorButtonNames: [text.LATEST,
      text.HOTTEST_NEWS,
      text.CRYPTO_CURRENCY,
      text.FOREIGN_EXCHANGE_MARKET,
      text.STOCK_MARKET,
      text.ECONOMIC_INDICATOR,
      text.ECONOMIC_NEWS,
      text.COVID_19]
    }
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