<template>
  <div class="news-page">
    <multipurpose-header isNews />
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide> </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor :navigatorButtonNames="bottomNavigatorButtonNames" />
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';

import MultipurposeHeader from '../../../common/frontend/components/MultipurposeHeader.vue';
import CustomSwiper from '../../../common/frontend/components/CustomSwiper.vue';
import BottomNaviagtor from '../../../common/frontend/components/BottomNaviagtor.vue';
import ItemCardList from '../../../common/frontend/components/ItemCardList.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'News',
  components: {
    MultipurposeHeader,
    CustomSwiper,
    BottomNaviagtor,
    SwiperSlide,
    ItemCardList,
  },

  data() {
    const { MARKET, NEWS, BOOKMARK, MORE, LATEST, HOTTEST_NEWS, STOCK_MARKET, CRYPTO_CURRENCY } = text;

    return {
      swiperNavigatorButtonNames: [LATEST, HOTTEST_NEWS, STOCK_MARKET, CRYPTO_CURRENCY],
      bottomNavigatorButtonNames: [MARKET, NEWS, BOOKMARK, MORE],
    };
  },
};
</script>

<style scoped lang="scss"></style>
