<template>
  <div class="search-page">
    <multipurpose-header :userInfo="userInfo" isSearch @search-input-value-change="requestSearch"></multipurpose-header>
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide>
        <loading v-if="searchedItemsIsLoading" :loadingHeight="540" />
        <error v-else-if="searchedItemIsError" :errorHeight="540" />
        <empty v-else-if="!searchedItemsIsLoading && !searchedItems.length" :emptyHeight="540" />
        <item-card-list v-else :items="searchedItems" :excludedHeight="100" :userInfo="userInfo" isSearch></item-card-list>
      </swiper-slide>
      <!-- <swiper-slide>
        <list-wrapper :excludedHeight="100">
          <loading v-if="searchedNewsIsLoading" />
          <error v-else-if="searchedNewsIsError" :errorHeight="540" />
          <empty v-else-if="!searchedNewsIsLoading && !searchedNews.length" />
          <news-list v-else>
            <news-list-item v-for="element in searchedNews" :key="element.id" :to="''">
              <news-image class="news-image-align" :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="100">
          <loading v-if="searchedAnalysesIsLoading" />
          <error v-else-if="searchedAnalysesIsError" :errorHeight="540" />
          <empty v-else-if="!searchedAnalysesIsLoading && !searchedAnalyses.length" />
          <news-list v-else>
            <news-list-item v-for="element in searchedAnalyses" :key="element.id" :to="''">
              <news-image class="news-image-align" :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide> -->
    </custom-swiper>
  </div>
</template>
<script>
import { SwiperSlide } from 'vue-awesome-swiper';
import { mapState, mapActions } from 'vuex';

import MultipurposeHeader from '../components/MultipurposeHeader.vue';
import ListWrapper from '../components/ListWrapper.vue';
import CustomSwiper from '../components/CustomSwiper.vue';
import ItemCard from '../components/ItemCard.vue';
import ItemCardList from '../components/ItemCardList.vue';
import NewsList from '../components/News/NewsList.vue';
import NewsListItem from '../components/News/NewsListItem.vue';
import NewsImage from '../components/News/NewsImage.vue';
import NewsTextBox from '../components/News/NewsTextBox.vue';
import NewsTextBoxTitle from '../components/News/NewsTextBoxTitle.vue';
import NewsTextBoxDesc from '../components/News/NewsTextBoxDesc.vue';
import Loading from 'karl/frontend/components/Loading.vue';
import Error from 'karl/frontend/components/Error.vue';
import Empty from 'karl/frontend/components/Empty.vue';

import { text } from '../../../common/frontend/constants';

export default {
  name: 'Search',

  components: {
    MultipurposeHeader,
    CustomSwiper,
    ItemCard,
    ItemCardList,
    SwiperSlide,
    NewsList,
    NewsListItem,
    NewsImage,
    NewsTextBox,
    NewsTextBoxTitle,
    NewsTextBoxDesc,
    ListWrapper,
    Loading,
    Empty,
    Error,
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.user,

      searchedItems: (state) => state.search.searchedItems,
      searchedNews: (state) => state.search.searchedNews,
      searchedAnalyses: (state) => state.search.searchedAnalyses,

      searchedItemsIsLoading: (state) => state.search.searchedItemsIsLoading,
      searchedItemIsError: (state) => state.search.searchedItemIsError,
      searchedNewsIsLoading: (state) => state.search.searchedNewsIsLoading,
      searchedNewsIsError: (state) => state.search.searchedNewsIsError,
      searchedAnalysesIsLoading: (state) => state.search.searchedAnalysesIsLoading,
      searchedAnalysesIsError: (state) => state.search.searchedAnalysesIsError,
    }),
  },

  data() {
    return {
      swiperNavigatorButtonNames: [text.ITEM, text.NEWS, text.ANALYSIS],
    };
  },

  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('search', [
      'getSearchedItems',
      'getSearchedNews',
      'getSearchedAnalyses',
      'clearSearchStore',
      'setSearchedItemsIsLoading',
      'setSearchedNewsIsLoading',
      'setSearchedAnalysesIsLoading',
    ]),

    async requestSearch(event) {
      const keyword = event.target.value;
      const email = this.userInfo.userEmail;

      if (keyword) {
        const tickers = [keyword];

        this.setSearchedItemsIsLoading(true);
        this.setSearchedNewsIsLoading(true);
        this.setSearchedAnalysesIsLoading(true);

        this.getSearchedItems({ keyword, email }).then(() => {
          this.setSearchedItemsIsLoading(false);
        });

        this.getSearchedNews({ offset: 0, limit: 20, tickers }).then(() => {
          this.setSearchedNewsIsLoading(false);
        });

        this.getSearchedAnalyses({ offset: 0, limit: 20, tickers }).then(() => {
          this.setSearchedAnalysesIsLoading(false);
        });
      }
    },
  },

  async mounted() {
    const { userEmail, userGoogleId } = this.userInfo;

    if (!userEmail || !userGoogleId) {
      await this.getUser();
    }
  },

  beforeDestroy() {
    this.clearSearchStore();
  },
};
</script>

<style scoped lang="scss">
.search-page {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-image-align {
  display: flex;
  align-self: center;
}
</style>
