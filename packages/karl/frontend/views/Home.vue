<template>
  <div class="home-page">
    <multipurpose-header isHome></multipurpose-header>

    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide>
        <loading v-if="indicesIsLoading" :loadingHeight="490" />
        <error v-else-if="indicesIsError" :errorHeight="490" />
        <empty v-else-if="!indicesItems.length" :emptyHeight="490" />
        <item-card-list v-else :items="indicesItems" :excludedHeight="150" isHome></item-card-list>
      </swiper-slide>
      <swiper-slide>
        <loading v-if="stocksIsLoading" :loadingHeight="490" />
        <error v-else-if="stocksIsError" :errorHeight="490" />
        <empty v-else-if="!stockItems.length" :emptyHeight="490" />
        <item-card-list v-else :items="stockItems" :excludedHeight="150" isHome></item-card-list>
      </swiper-slide>
      <swiper-slide>
        <loading v-if="cryptosIsLoading" :loadingHeight="490" />
        <error v-else-if="cryptosIsError" :errorHeight="490" />
        <empty v-else-if="!cryptoItems.length" :emptyHeight="490" />
        <item-card-list v-else :items="cryptoItems" :excludedHeight="150" isHome></item-card-list>
      </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor :navigatorButtonNames="bottomNavigatorButtonNames"></bottom-naviagtor>
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';
import { mapActions, mapState } from 'vuex';

import Loading from '../components/Loading.vue';
import Error from '../components/Error.vue';
import Empty from '../components/Empty.vue';
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
    Loading,
    Error,
    Empty,
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.user,

      indicesItems: (state) => state.market.indicesItems,
      stockItems: (state) => state.market.stockItems,
      cryptoItems: (state) => state.market.cryptoItems,

      indicesIsLoading: (state) => state.market.indicesIsLoading,
      indicesIsError: (state) => state.market.indicesIsError,
      stocksIsLoading: (state) => state.market.stocksIsLoading,
      stocksIsError: (state) => state.market.stocksIsError,
      cryptosIsLoading: (state) => state.market.cryptosIsLoading,
      cryptosIsError: (state) => state.market.cryptosIsError,
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
    ...mapActions('market', [
      'getStocks',
      'getIndices',
      'getCryptos',
      'setIndicesIsLoading',
      'setStocksIsLoading',
      'setCryptosIsLoading',
    ]),
    ...mapActions('user', ['getUser']),
  },

  async mounted() {
    const { userEmail, userGoogleId } = this.userInfo;

    this.setIndicesIsLoading(true);
    this.setStocksIsLoading(true);
    this.setCryptosIsLoading(true);

    if (!userEmail || !userGoogleId) {
      await this.getUser();
    }

    this.getStocks().then(() => {
      this.setIndicesIsLoading(false);
    });
    this.getIndices().then(() => {
      this.setStocksIsLoading(false);
    });
    this.getCryptos().then(() => {
      this.setCryptosIsLoading(false);
    });
  },
};
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
