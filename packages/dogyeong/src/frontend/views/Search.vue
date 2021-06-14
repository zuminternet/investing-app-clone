<template>
  <Layout>
    <header class="search-header">
      <HeaderButton @clickHeaderButton="back">🠔</HeaderButton>
      <label>
        <input v-model="keyword" type="text" autofocus placeholder="종목 검색" @keypress.enter="search" />
        <span @click="search">&#128269;</span>
      </label>
    </header>
    <main class="search-main">
      <LoadingSpinner v-if="isLoading" />
      <custom-swiper :navigator-button-names="swiperNavigatorButtonNames">
        <swiper-slide>
          <BookmarkList>
            <BookmarkListItem v-for="{ name, symbol, category, isBookmarked } in items" :key="symbol">
              <BookmarkListItemTitle>{{ name }}</BookmarkListItemTitle>
              <BookmarkListItemText>{{ symbol }} | {{ category }}</BookmarkListItemText>
              <template #button>
                <BookmarkListItemButton v-if="isBookmarked" @click="onRemoveBookmark({ items, symbol, name })">
                  &#9733;
                </BookmarkListItemButton>
                <BookmarkListItemButton v-else @click="onAddBookmark({ items, symbol, name, category })">
                  &#9734;
                </BookmarkListItemButton>
              </template>
            </BookmarkListItem>
          </BookmarkList>
        </swiper-slide>
        <swiper-slide>
          <ArticleTemplate :articles="news" url-prefix="news/new" />
        </swiper-slide>
        <swiper-slide>
          <ArticleTemplate :articles="opinions" url-prefix="news/new" />
        </swiper-slide>
      </custom-swiper>
    </main>
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
/**
 * Search
 *
 * 검색 페이지
 */
import Vue from 'vue';
import { SwiperSlide } from 'vue-awesome-swiper';
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
      items: [],
      news: [],
      opinions: [],
      isLoading: false,
    };
  },

  methods: {
    async search() {
      try {
        const keyword = this.keyword;

        if (!keyword) return;

        this.isLoading = true;

        const itemPromise = searchItems({ keyword });
        const newsPromise = searchNews({ keyword });
        const opinionPromise = searchOpinions({ keyword });

        this.items = await itemPromise;
        this.news = await newsPromise;
        this.opinions = await opinionPromise;

        this.isLoading = false;
      } catch (e) {
        window.alert(e);
      }
    },
    back() {
      this.$router.back();
    },
  },
});
</script>

<style lang="scss">
.search-header {
  padding: 8px 12px;
  height: 60px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  background-color: var(--header-bg-color);

  label {
    flex: 1;
    display: flex;
    position: relative;

    input {
      flex: 1;
      padding: 4px 8px;
      padding-left: 40px;
      appearance: none;
      border: 0;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-color);
      font-size: 16px;
      margin-left: 12px;
      background-color: var(--header-nav-bg-color);
    }

    span {
      position: absolute;
      left: 22px;
      top: calc(50% - 12px);
      cursor: pointer;
    }
  }
}

.search-main {
  position: relative;
}

.swiper-navigator {
  border-bottom: 1px solid var(--border-color);

  .navigator-button {
    color: var(--text-color);
    font-size: 16px;
    background-color: var(--header-nav-bg-color);
  }
}
</style>
