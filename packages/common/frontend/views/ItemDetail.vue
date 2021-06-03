<template>
  <div class="item-detail-page">
    <multipurpose-header :itemDetail="itemDetail" isItemDetail :userInfo="userInfo"></multipurpose-header>
    <item-detail-price-box :itemDetail="itemDetail"></item-detail-price-box>
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide>
        <item-detail-wrapper :excludedHeight="210">
          <!-- 차트 컴포넌트 자리  -->
          <item-detail-overview-box :itemDetail="itemDetail"></item-detail-overview-box>
          <!-- 댓글 컴포넌트 자리 -->
          <sub-content-box :text="newsText">
            <news-list>
              <news-list-item v-for="element in news" :key="element.id" :to="''">
                <news-image :src="element.image_url" />
                <news-text-box>
                  <news-text-box-title>{{ element.title }}</news-text-box-title>
                  <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
                </news-text-box>
              </news-list-item>
            </news-list>
          </sub-content-box>
          <sub-content-box :text="analysisText">
            <news-list>
              <news-list-item v-for="element in analyses" :key="element.id" :to="''">
                <news-image :src="element.image_url" />
                <news-text-box>
                  <news-text-box-title>{{ element.title }}</news-text-box-title>
                  <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
                </news-text-box>
              </news-list-item>
            </news-list>
          </sub-content-box>
        </item-detail-wrapper>
      </swiper-slide>
      <swiper-slide>
        <item-detail-wrapper :excludedHeight="210">
          <news-list>
            <news-list-item v-for="element in news" :key="element.id" :to="''">
              <news-image :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
              </news-text-box>
            </news-list-item>
          </news-list>
        </item-detail-wrapper>
      </swiper-slide>
      <swiper-slide>
        <item-detail-wrapper :excludedHeight="210">
          <news-list>
            <news-list-item v-for="element in analyses" :key="element.id" :to="''">
              <news-image :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
              </news-text-box>
            </news-list-item>
          </news-list>
        </item-detail-wrapper>
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
import ItemDetailPriceBox from '../components/ItemDetail/ItemDetailPriceBox.vue';
import ItemDetailWrapper from '../components/ItemDetail/ItemDetailWrapper';
import CustomSwiper from '../components/CustomSwiper.vue';
import ItemDetailOverviewBox from '../components/ItemDetail/ItemDetailOverviewBox.vue';
import SubContentBox from '../components/ItemDetail/SubContentBox.vue';
import NewsList from '../components/News/NewsList.vue';
import NewsListItem from '../components/News/NewsListItem.vue';
import NewsImage from '../components/News/NewsImage.vue';
import NewsTextBox from '../components/News/NewsTextBox.vue';
import NewsTextBoxTitle from '../components/News/NewsTextBoxTitle.vue';
import NewsTextBoxDesc from '../components/News/NewsTextBoxDesc.vue';

export default {
  name: 'ItemDetail',
  components: {
    BottomNaviagtor,
    MultipurposeHeader,
    ItemDetailPriceBox,
    CustomSwiper,
    SwiperSlide,
    ItemDetailOverviewBox,
    SubContentBox,
    NewsList,
    NewsListItem,
    NewsImage,
    NewsTextBox,
    NewsTextBoxTitle,
    NewsTextBoxDesc,
    ItemDetailWrapper,
  },

  data() {
    const { OVERLALL, NEWS, ANALYSIS, OPINION, CHART, MARKET, BOOKMARK, MORE } = text;
    return {
      swiperNavigatorButtonNames: [OVERLALL, NEWS, ANALYSIS, OPINION, CHART],
      bottomNavigatorButtonNames: [MARKET, NEWS, BOOKMARK, MORE],
      newsText: NEWS,
      analysisText: ANALYSIS,
      opnionText: OPINION,
    };
  },

  computed: {
    ...mapState({
      itemDetail: (state) => state.itemDetail.itemDetail,
      news: (state) => state.itemDetail.news,
      analyses: (state) => state.itemDetail.analyses,
      userInfo: (state) => state.user,
    }),
  },

  methods: {
    ...mapActions('itemDetail', ['getItemDetail', 'getNews', 'getAnalyses']),
  },

  created() {
    const { symbols } = this.$route.query;
    this.getItemDetail({ symbols });
    this.getNews({ offset: 0, limit: 3 });
    this.getAnalyses({ offset: 0, limit: 3 });
  },

  mounted() {
    console.log(this.userInfo);
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
