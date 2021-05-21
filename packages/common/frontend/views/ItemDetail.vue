<template>
  <div id="item-detail-page">
    <multipurpose-header :itemDetailInformations="itemDetailInformations"></multipurpose-header>
    <item-detail-price-box :itemDetailInformations="itemDetailInformations"></item-detail-price-box>
    <custom-swiper :navigatorButtonNames="navigatorButtonNames">
      <swiper-slide>
        <item-detail-overall-content
          :itemDetailInformations="itemDetailInformations"
          :excludingHeight="210"
        ></item-detail-overall-content>
      </swiper-slide>
      <swiper-slide>
        <item-detail-overall-content
          :itemDetailInformations="itemDetailInformations"
          :excludingHeight="210"
        ></item-detail-overall-content>
      </swiper-slide>
      <swiper-slide>
        <item-detail-overall-content
          :itemDetailInformations="itemDetailInformations"
          :excludingHeight="210"
        ></item-detail-overall-content>
      </swiper-slide>
      <swiper-slide>
        <item-detail-overall-content
          :itemDetailInformations="itemDetailInformations"
          :excludingHeight="210"
        ></item-detail-overall-content>
      </swiper-slide>
      <swiper-slide>
        <item-detail-overall-content
          :itemDetailInformations="itemDetailInformations"
          :excludingHeight="210"
        ></item-detail-overall-content>
      </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor :navigatorButtonNames="navigatorButtonNames"></bottom-naviagtor>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { SwiperSlide } from 'vue-awesome-swiper';
import { text } from '../constants';

import BottomNaviagtor from '../components/BottomNaviagtor.vue';
import MultipurposeHeader from '../components/MultipurposeHeader.vue';
import ItemDetailPriceBox from '../components/ItemDetailPriceBox.vue';
import CustomSwiper from '../components/CustomSwiper.vue';
import ItemDetailOverallContent from '../components/ItemDetailOverallContent.vue';

export default {
  name: 'ItemDetail',
  components: {
    BottomNaviagtor,
    MultipurposeHeader,
    ItemDetailPriceBox,
    CustomSwiper,
    SwiperSlide,
    ItemDetailOverallContent,
  },

  data() {
    return {
      navigatorButtonNames: [text.OVERLALL, text.NEWS, text.ANALYSIS, text.OPINION, text.CHART],
    };
  },

  computed: {
    ...mapState({
      itemDetailInformations: (state) => state.market.itemDetailInformations,
    }),
  },
};
</script>

<style scoped lang="scss">
#item-detail-page {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
