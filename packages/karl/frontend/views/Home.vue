<template>
  <div id="home-page">
    <multipurpose-header isHome></multipurpose-header>
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide v-for="(items, index) in itemCollections" :key="index">
        <item-card-list :items="items" :excludedHeight="150" isHome></item-card-list>
      </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor :navigatorButtonNames="bottomNavigatorButtonNames"></bottom-naviagtor>
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';
import { mapGetters, mapActions } from 'vuex';

import BottomNaviagtor from '../../../common/frontend/components/BottomNaviagtor.vue';
import MultipurposeHeader from '../../../common/frontend/components/MultipurposeHeader.vue';
import ItemCardList from '../../../common/frontend/components/ItemCardList.vue';
import CustomSwiper from '../../../common/frontend/components/CustomSwiper.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'Home',
  components: {
    BottomNaviagtor,
    MultipurposeHeader,
    CustomSwiper,
    ItemCardList,
    SwiperSlide,
  },
  computed: {
    ...mapGetters('market', {
      itemCollections: 'itemCollections',
    }),
  },

  data() {
    const { INDICES, STOCK, CRYPTO_CURRENCY, MARKET, NEWS, BOOKMARK, MORE } = text;

    return {
      swiperNavigatorButtonNames: [INDICES, STOCK, CRYPTO_CURRENCY],
      bottomNavigatorButtonNames: [MARKET, NEWS, BOOKMARK, MORE],
    };
  },

  methods: {
    ...mapActions('market', ['getStocks', 'getIndices', 'getCryptos']),
  },

  created() {
    this.getStocks();
    this.getIndices();
    this.getCryptos();
  },
};
</script>

<style scoped lang="scss">
#home-page {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
