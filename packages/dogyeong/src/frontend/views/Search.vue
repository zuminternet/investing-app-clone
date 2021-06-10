<template>
  <Layout>
    <header :class="$style.header">
      <HeaderButton @clickHeaderButton="back">&#8592;</HeaderButton>
      <input v-model="keyword" type="text" autofocus placeholder="종목 검색" @keypress.enter="requestSearch" />
      <button :class="$style['search-button']" @click="requestSearch">Search</button>
    </header>
    <main>
      <custom-swiper :navigator-button-names="swiperNavigatorButtonNames" :class="$style.swiper">
        <swiper-slide>
          <BookmarkList>
            <BookmarkListItem v-for="{ name, symbol, category, isBookmarked } in items" :key="symbol">
              <BookmarkListItemTitle>{{ name }}</BookmarkListItemTitle>
              <BookmarkListItemText>{{ symbol }} | {{ category }}</BookmarkListItemText>
              <template #button>
                <BookmarkListItemButton v-if="isBookmarked" @click="onRemoveBookmark({ symbol, name })">
                  &#9733;
                </BookmarkListItemButton>
                <BookmarkListItemButton v-else @click="onAddBookmark({ symbol, name, category })">
                  &#9734;
                </BookmarkListItemButton>
              </template>
            </BookmarkListItem>
          </BookmarkList>
        </swiper-slide>
        <swiper-slide>
          <ArticleTemplate :articles="searchedNews" url-prefix="news/new" />
        </swiper-slide>
        <swiper-slide>
          <ArticleTemplate :articles="searchedAnalyses" url-prefix="news/new" />
        </swiper-slide>
      </custom-swiper>
    </main>
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { SwiperSlide } from 'vue-awesome-swiper';
import { mapState, mapActions } from 'vuex';
import CustomSwiper from 'common/frontend/components/CustomSwiper.vue';
import Layout from '@/components/Layout/Layout.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { HeaderButton } from '@/components/Header';
import ArticleTemplate from '@/components/ArticleTemplate/ArticleTemplate.vue';
import { searchItems, searchNews, searchOpinions } from '@/services/searchService';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';
import bookmarkMixin from '@/mixin/bookmarkMixin';
import {
  BookmarkList,
  BookmarkListItem,
  BookmarkListItemButton,
  BookmarkListItemTitle,
  BookmarkListItemText,
} from '@/components/Bookmark';

export default Vue.extend({
  name: 'Search',

  components: {
    CustomSwiper,
    SwiperSlide,
    Layout,
    BottomNav,
    HeaderButton,
    ArticleTemplate,
    LoadingSpinner,
    BookmarkList,
    BookmarkListItem,
    BookmarkListItemButton,
    BookmarkListItemTitle,
    BookmarkListItemText,
  },

  mixins: [bookmarkMixin],

  data() {
    return {
      swiperNavigatorButtonNames: ['종목', '뉴스', '분석'],
      keyword: '',
    };
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.user,
      searchedItems: ({ search }) => search.searchedItems,
      searchedNews: ({ search }) => search.searchedNews,
      searchedAnalyses: ({ search }) => search.searchedAnalyses,
    }),
  },

  beforeDestroy() {
    this.clearSearchStore();
  },
  methods: {
    ...mapActions('search', ['getSearchedItems', 'getSearchedNews', 'getSearchedAnalyses', 'clearSearchStore']),

    back() {
      this.$router.back();
    },
  },
});
</script>

<style lang="scss" module>
.header {
  padding: 6px 12px;
  height: 60px;
  border-bottom: 1px solid var(--border-color);
  display: flex;

  input {
    flex: 1;
    padding: 4px 8px;
    appearance: none;
    border: 0;
    border-bottom: 1px solid var(--text-color);
    background-color: transparent;
    color: var(--text-color);
    font-size: 16px;
  }
}

.search-button {
  padding: 4px 8px;
  margin-left: 12px;
  border-radius: 8px;

  &:hover {
    background-color: var(--border-color);
  }
}

.main {
  position: relative;
}
</style>
