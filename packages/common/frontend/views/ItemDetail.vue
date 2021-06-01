<template>
  <div class="item-detail-page">
    <multipurpose-header :itemDetail="itemDetail" isItemDetail></multipurpose-header>
    <item-detail-price-box :itemDetail="itemDetail"></item-detail-price-box>
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide>
        <item-detail-overall-content :itemDetail="itemDetail" :excludingHeight="210"></item-detail-overall-content>
      </swiper-slide>
      <swiper-slide>
        <item-detail-overall-content :itemDetail="itemDetail" :excludingHeight="210"></item-detail-overall-content>
      </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor :navigatorButtonNames="bottomNavigatorButtonNames"></bottom-naviagtor>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
    const { OVERLALL, NEWS, ANALYSIS, OPINION, CHART, MARKET, CALENDAR, FAVORITES, MORE } = text;
    return {
      swiperNavigatorButtonNames: [OVERLALL, NEWS, ANALYSIS, OPINION, CHART],
      bottomNavigatorButtonNames: [MARKET, NEWS, CALENDAR, FAVORITES, MORE],
    };
  },

  computed: {
    ...mapState({
      itemDetail: (state) => state.itemDetail.itemDetail,
    }),
  },

  methods: {
    ...mapActions('itemDetail', ['getItemDetail']),
  },

  async mounted() {
    const { symbols } = this.$route.query;
    await this.getItemDetail({ symbols });
  },
};
</script>

<style scoped lang="scss">
.item-detail-page {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
