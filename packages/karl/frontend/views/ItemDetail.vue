<template>
  <div class="item-detail-page">
    <multipurpose-header
      :itemDetail="itemDetail"
      isItemDetail
      :userInfo="userInfo"
      :isLoading="itemDetailIsLoading"
      :isError="itemDetailIsError"
    />
    <item-detail-price-box :itemDetail="itemDetail" :isLoading="itemDetailIsLoading" :isError="itemDetailIsError" />
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide>
        <list-wrapper :excludedHeight="210">
          <chart v-if="symbol" :isDarkTheme="isDarkTheme" :canvasWidth="300" :canvasHeight="300" :symbol="symbol" />
          <item-detail-overview-box :itemDetail="itemDetail" :isLoading="itemDetailIsLoading" :isError="itemDetailIsError" />
          <sub-content-box :text="opinionText">
            <reply-section v-if="symbol" :email="userInfo.userEmail" :docId="symbol" />
          </sub-content-box>

          <sub-content-box :text="newsText">
            <loading v-if="newsIsLoading" :loadingHeight="220" />
            <error v-else-if="newsIsError" :errorHeight="220" />
            <empty v-else-if="!overviewNews.length" :emptyHeight="220" />
            <news-list v-else>
              <news-list-item
                v-for="element in overviewNews"
                :key="element._id"
                @handle-click="routeToNewsDetail"
                :id="element._id"
              >
                <news-image class="news-image-align" :src="element.image_url" />
                <news-text-box>
                  <news-text-box-title>{{ element.title }}</news-text-box-title>
                  <news-text-box-desc :author="element.source" :publishDate="element.date" :replyCount="element.replyCount" />
                </news-text-box>
              </news-list-item>
            </news-list>
          </sub-content-box>
          <sub-content-box :text="analysisText">
            <loading v-if="analysesIsLoading" :loadingHeight="220" />
            <error v-else-if="analysesIsError" :errorHeight="220" />
            <empty v-else-if="!overviewAnalyses.length" :emptyHeight="220" />
            <news-list v-else>
              <news-list-item
                v-for="element in overviewAnalyses"
                :key="element._id"
                @handle-click="routeToNewsDetail"
                :id="element._id"
              >
                <news-image class="news-image-align" :src="element.image_url" />
                <news-text-box>
                  <news-text-box-title>{{ element.title }}</news-text-box-title>
                  <news-text-box-desc :author="element.source" :publishDate="element.date" :replyCount="element.replyCount" />
                </news-text-box>
              </news-list-item>
            </news-list>
          </sub-content-box>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="210">
          <loading v-if="newsIsLoading" />
          <error v-else-if="newsIsError" />
          <empty v-else-if="!news.length" />
          <news-list v-else>
            <news-list-item v-for="element in news" :key="element._id" @handle-click="routeToNewsDetail" :id="element._id">
              <news-image class="news-image-align" :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date" :replyCount="element.replyCount" />
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="210">
          <loading v-if="analysesIsLoading" />
          <error v-else-if="analysesIsError" />
          <empty v-else-if="!analyses.length" />
          <news-list v-else>
            <news-list-item v-for="element in analyses" :key="element._id" @handle-click="routeToNewsDetail" :id="element._id">
              <news-image class="news-image-align" :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date" :replyCount="element.replyCount" />
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="210">
          <reply-section v-if="symbol" :email="userInfo.userEmail" :docId="symbol" />
        </list-wrapper>
      </swiper-slide>
    </custom-swiper>
    <bottom-naviagtor :navigatorButtonNames="bottomNavigatorButtonNames" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SwiperSlide } from 'vue-awesome-swiper';

import BottomNaviagtor from 'common/frontend/components/BottomNaviagtor.vue';
import MultipurposeHeader from 'common/frontend/components/MultipurposeHeader.vue';
import ItemDetailPriceBox from 'common/frontend/components/ItemDetail/ItemDetailPriceBox.vue';
import ListWrapper from 'common/frontend/components/ListWrapper.vue';
import CustomSwiper from 'common/frontend/components/CustomSwiper.vue';
import ItemDetailOverviewBox from 'common/frontend/components/ItemDetail/ItemDetailOverviewBox.vue';
import ReplySection from 'common/frontend/components/ReplySection';
import SubContentBox from 'common/frontend/components/ItemDetail/SubContentBox.vue';
import NewsList from 'common/frontend/components/News/NewsList.vue';
import NewsListItem from 'common/frontend/components/News/NewsListItem.vue';
import NewsImage from 'common/frontend/components/News/NewsImage.vue';
import NewsTextBox from 'common/frontend/components/News/NewsTextBox.vue';
import NewsTextBoxTitle from 'common/frontend/components/News/NewsTextBoxTitle.vue';
import NewsTextBoxDesc from 'common/frontend/components/News/NewsTextBoxDesc.vue';

import Chart from 'karl/frontend/components/Chart.vue';
import Loading from 'karl/frontend/components/Loading.vue';
import Error from 'karl/frontend/components/Error.vue';
import Empty from 'karl/frontend/components/Empty.vue';

import { text } from 'common/frontend/constants';

export default {
  name: 'ItemDetail',
  components: {
    BottomNaviagtor,
    MultipurposeHeader,
    ItemDetailPriceBox,
    CustomSwiper,
    SwiperSlide,
    ItemDetailOverviewBox,
    ReplySection,
    SubContentBox,
    NewsList,
    NewsListItem,
    NewsImage,
    NewsTextBox,
    NewsTextBoxTitle,
    NewsTextBoxDesc,
    ListWrapper,
    Chart,
    Loading,
    Error,
    Empty,
  },

  data() {
    const { OVERLALL, NEWS, ANALYSIS, OPINION, MARKET, BOOKMARK } = text;

    return {
      swiperNavigatorButtonNames: [OVERLALL, NEWS, ANALYSIS, OPINION],
      bottomNavigatorButtonNames: [MARKET, NEWS, BOOKMARK],
      newsText: NEWS,
      analysisText: ANALYSIS,
      opinionText: OPINION,
      symbol: '',
    };
  },

  computed: {
    ...mapState({
      isDarkTheme: (state) => state.isDarkTheme,
      itemDetail: (state) => state.itemDetail.itemDetail,
      news: (state) => state.itemDetail.news,
      analyses: (state) => state.itemDetail.analyses,
      userInfo: (state) => state.user,
      itemDetailIsLoading: (state) => state.itemDetail.itemDetailIsLoading,
      itemDetailIsError: (state) => state.itemDetail.itemDetailIsError,
      newsIsLoading: (state) => state.itemDetail.newsIsLoading,
      newsIsError: (state) => state.itemDetail.newsIsError,
      analysesIsLoading: (state) => state.itemDetail.analysesIsLoading,
      analysesIsError: (state) => state.itemDetail.analysesIsError,
    }),

    overviewNews() {
      return this.news.slice(0, 3);
    },

    overviewAnalyses() {
      return this.analyses.slice(0, 3);
    },
  },

  methods: {
    ...mapActions('itemDetail', [
      'getItemDetail',
      'getNews',
      'getAnalyses',
      'setItemDetailIsLoading',
      'setNewsIsLoading',
      'setAnalysesIsLoading',
    ]),
    ...mapActions('user', ['getUser']),

    routeToNewsDetail(id) {
      this.$router.push({ path: 'news-detail', query: { id } });
    },
  },

  async mounted() {
    const { userEmail, userGoogleId } = this.userInfo;

    this.setItemDetailIsLoading(true);
    this.setNewsIsLoading(true);
    this.setAnalysesIsLoading(true);

    if (!userEmail || !userGoogleId) {
      await this.getUser();
    }

    const { symbols, name } = this.$route.query;
    this.symbol = symbols;
    const email = this.userInfo.userEmail;
    const tickers = [symbols];

    const fetcher = this.getItemDetail.bind(this, { symbols, email, name });

    this.getItemDetail({ symbols, email, name }).then(() => {
      this.setItemDetailIsLoading(false);
      this.intervalForItemDetail = setInterval(fetcher, 3000);
    });

    this.getNews({ offset: 0, limit: 20, tickers }).then(() => {
      this.setNewsIsLoading(false);
    });

    this.getAnalyses({ offset: 0, limit: 20, tickers }).then(() => {
      this.setAnalysesIsLoading(false);
    });
  },

  beforeDestroy() {
    if (this.intervalForItemDetail) {
      clearInterval(this.intervalForItemDetail);
    }
  },
};
</script>

<style scoped lang="scss">
.item-detail-page {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-image-align {
  display: flex;
  align-self: center;
}
</style>
