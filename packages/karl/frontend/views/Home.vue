<template>
  <div class="home-page">
    <multipurpose-header isHome></multipurpose-header>
    <loading v-if="isLoading"></loading>
    <error v-else-if="isError"></error>
    <custom-swiper v-else :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide v-for="(items, index) in itemCollections" :key="index">
        <item-card-list :items="items" :excludedHeight="150" isHome></item-card-list>
      </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor :navigatorButtonNames="bottomNavigatorButtonNames"></bottom-naviagtor>
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';
import { mapGetters, mapActions, mapState } from 'vuex';

import Loading from '../components/Loading.vue';
import Error from '../components/Error.vue';
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
  },
  computed: {
    ...mapGetters('market', {
      itemCollections: 'itemCollections',
    }),

    ...mapState({
      isLoading: (state) => state.market.isLoading,
      isError: (state) => state.market.isError,
      userInfo: (state) => state.user,
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
    ...mapActions('market', ['getStocks', 'getIndices', 'getCryptos', 'setIsLoading']),
    ...mapActions('user', ['getUser']),
  },

  async mounted() {
    const { userEmail, userGoogleId } = this.userInfo;

    this.setIsLoading(true);

    !userEmail || !userGoogleId ? await this.getUser() : null;

    await this.getStocks();
    await this.getIndices();
    await this.getCryptos();

    this.setIsLoading(false);
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
