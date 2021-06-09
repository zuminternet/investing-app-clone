<template>
  <div class="search-page">
    <multipurpose-header :userInfo="userInfo" isSearch @search-input-value-change="requestSearch"></multipurpose-header>
    <custom-swiper :navigatorButtonNames="swiperNavigatorButtonNames">
      <swiper-slide>
        <item-card-list :items="searchedItems" :excludedHeight="100" :userInfo="userInfo" isSearch></item-card-list>
      </swiper-slide>
      <swiper-slide>
        <list-wrapper :excludedHeight="100">
          <news-list>
            <news-list-item v-for="element in searchedNews" :key="element.id" :to="''">
              <news-image :src="element.image_url" />
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
          <news-list>
            <news-list-item v-for="element in searchedAnalyses" :key="element.id" :to="''">
              <news-image :src="element.image_url" />
              <news-text-box>
                <news-text-box-title>{{ element.title }}</news-text-box-title>
                <news-text-box-desc :author="element.source" :publishDate="element.date"></news-text-box-desc>
              </news-text-box>
            </news-list-item>
          </news-list>
        </list-wrapper>
      </swiper-slide>
    </custom-swiper>
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';
import { mapState, mapActions } from 'vuex';
import MultipurposeHeader from 'common/frontend/components/MultipurposeHeader.vue';
import ListWrapper from 'common/frontend/components/ListWrapper.vue';
import CustomSwiper from 'common/frontend/components/CustomSwiper.vue';
import ItemCard from 'common/frontend/components/ItemCard.vue';
import ItemCardList from 'common/frontend/components/ItemCardList.vue';
import {
  NewsList,
  NewsListItem,
  NewsImage,
  NewsTextBox,
  NewsTextBoxTitle,
  NewsTextBoxDesc,
} from 'common/frontend/components/News';

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
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.user,
      searchedItems: (state) => state.search.searchedItems,
      searchedNews: (state) => state.search.searchedNews,
      searchedAnalyses: (state) => state.search.searchedAnalyses,
    }),
  },

  data() {
    return {
      swiperNavigatorButtonNames: ['종목', '뉴스', '분석'],
    };
  },

  methods: {
    ...mapActions('search', ['getSearchedItems', 'getSearchedNews', 'getSearchedAnalyses', 'clearSearchStore']),

    requestSearch(event) {
      const keyword = event.target.value;
      const email = this.userInfo.userEmail;

      if (keyword) {
        const tickers = [keyword];
        this.getSearchedItems({ keyword, email });
        this.getSearchedNews({ offset: 0, limit: 10, tickers });
        this.getSearchedAnalyses({ offset: 0, limit: 10, tickers });
      }
    },
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
</style>
