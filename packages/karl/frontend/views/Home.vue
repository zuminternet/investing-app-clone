<template>
  <div id="home-page">
    <multipurpose-header isHome></multipurpose-header>
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide v-for="(items, index) in itemCollections" :key="index">
        <item-card-list :items="items" :excludingHeight="150" isHome></item-card-list>
      </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor :navigatorButtonNames="bottomNavigatorButtonNames"></bottom-naviagtor>
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';
import { mapState, mapGetters, mapActions } from 'vuex';

import BottomNaviagtor from '../../../common/frontend/components/BottomNaviagtor.vue';
import MultipurposeHeader from '../../../common/frontend/components/MultipurposeHeader.vue';
import ItemCardList from '../../../common/frontend/components/ItemCardList.vue';
import CustomSwiper from '../../../common/frontend/components/CustomSwiper.vue';

import { text } from '../../../common/frontend/constants';
import { createArticles } from '../apis';

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
    ...mapState({
      stockItems: (state) => state.market.stockItems,
    }),
    ...mapGetters('market', {
      itemCollections: 'itemCollections',
    }),
  },

  data() {
    return {
      swiperNavigatorButtonNames: [text.INDICES, text.STOCK, text.CRYPTO_CURRENCY],
      bottomNavigatorButtonNames: [text.MARKET, text.NEWS, text.CALENDAR, text.FAVORITES, text.MORE],
    };
  },

  methods: {
    ...mapActions('market', ['getStocks']),
  },

  async mounted() {},
};
</script>

<style scoped lang="scss">
#home-page {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
