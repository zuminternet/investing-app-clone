<template>
  <div id="item-detail-page">
    <multipurpose-header></multipurpose-header>
    <item-detail-price-box></item-detail-price-box>
    <top-naviagtor></top-naviagtor>
    <item-detail-contents-swiper></item-detail-contents-swiper>
    <bottom-naviagtor></bottom-naviagtor>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BottomNaviagtor from '../components/BottomNaviagtor.vue'
import TopNaviagtor from '../components/TopNaviagtor.vue'
import MultipurposeHeader from '../components/MultipurposeHeader.vue'
import ItemDetailContentsSwiper from '../components/ItemDetailContentsSwiper.vue'
import ItemDetailPriceBox from '../components/ItemDetailPriceBox.vue'


export default {
  name:"ItemDetail",
  components: {
    BottomNaviagtor,
    TopNaviagtor,
    MultipurposeHeader,
    ItemDetailContentsSwiper,
    ItemDetailPriceBox
  },

  computed: {
    ...mapState({
      itemDetailInformation: state => state.market.itemDetailInformation
    })
  },

  created() {
    console.log(this.itemDetailInformation)
  }

  
}
</script>

<style>
#item-detail-page {
    display:flex;
    flex-direction: column;
    flex:1
  }

</style>