<template>
  <div id="home-page">
    <multipurpose-header></multipurpose-header>
    <custom-swiper :navigatorButtonNames="navigatorButtonNames">
      <swiper-slide v-for="(items, index) in itemCollections" :key="index">
        <item-card-list :items="items" :excludingHeight="150"></item-card-list>
      </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor></bottom-naviagtor>
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper'
import { mapState, mapGetters } from 'vuex'

import BottomNaviagtor from '../components/BottomNaviagtor.vue'
import MultipurposeHeader from '../components/MultipurposeHeader.vue'
import ItemCardList from '../components/ItemCardList.vue'
import CustomSwiper from '../../../common/frontend/components/CustomSwiper.vue'

import { text } from '../constants'

export default {
  name: 'Home',
  components: {
    BottomNaviagtor,
    MultipurposeHeader,
    CustomSwiper,
    ItemCardList
  },
  computed: {
    ...mapState({
      stockItems: state => state.market.stockItems
    }),
    ...mapGetters('market', {
      itemCollections: 'itemCollections'
    })
  },

  data() {
    return {
      navigatorButtonNames: [text.INDICES, text.STOCK, text.CRYPTO_CURRENCY]
    }
  }
};
</script>

<style scoped>
  #home-page {
    display:flex;
    flex-direction: column;
    flex:1
  }


</style>