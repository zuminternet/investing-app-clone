<template>
  <Layout>
    <header :class="$style.header">
      <HeaderButton @clickHeaderButton="back">&#8592;</HeaderButton>
      <input v-model="keyword" type="text" autofocus placeholder="종목 검색" @keypress.enter="requestSearch" />
      <button :class="$style['search-button']" @click="requestSearch">Search</button>
    </header>
    <main :class="$style.main">
      <LoadingSpinner v-if="isLoading" />
      <custom-swiper :navigator-button-names="swiperNavigatorButtonNames" :class="$style.swiper">
        <swiper-slide>
          <ul>
            <li v-for="{ name, symbol, category, isBookmarked } in items" :key="symbol" :class="$style['search-item']">
              <div>
                <span :class="$style['item-title']">{{ name }}</span>
                <span>{{ symbol }} | {{ category }}</span>
              </div>
              <div>
                <button
                  v-if="isBookmarked"
                  :class="$style['bookmark-button']"
                  type="button"
                  @click="onRemoveBookmark({ symbol, name })"
                >
                  &#9733;
                </button>
                <button
                  v-else
                  :class="$style['bookmark-button']"
                  type="button"
                  @click="onAddBookmark({ symbol, name, category })"
                >
                  &#9734;
                </button>
              </div>
            </li>
          </ul>
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
import Vue from 'vue';
import { SwiperSlide } from 'vue-awesome-swiper';
import CustomSwiper from 'common/frontend/components/CustomSwiper.vue';
import Layout from '@/components/Layout/Layout.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { HeaderButton } from '@/components/Header';
import ArticleTemplate from '@/components/ArticleTemplate/ArticleTemplate.vue';
import { searchItems, searchNews, searchOpinions } from '@/services/searchService';
import { addBookmark, removeBookmark } from '@/services/bookmarkService';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';

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
  },

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

  computed: {},

  methods: {
    async requestSearch() {
      try {
        if (!this.keyword) return;

        this.isLoading = true;

        const keyword = this.keyword;
        const itemPromise = searchItems({ keyword });
        const newsPromise = searchNews({ keyword });
        const opinionPromise = searchOpinions({ keyword });

        this.items = await itemPromise;
        this.news = await newsPromise;
        this.opinions = await opinionPromise;

        this.isLoading = false;
      } catch (e) {
        console.error(e);
      }
    },

    onAddBookmark({ symbol, name, category }) {
      addBookmark({ symbol, name, category })
        .then(({ symbol }) => {
          const item = this.findItemBySymbol(symbol);
          if (!item) return;
          item.isBookmarked = true;
        })
        .catch(console.error);
    },

    onRemoveBookmark({ symbol, name }) {
      removeBookmark({ symbol, name })
        .then((symbol) => {
          const item = this.findItemBySymbol(symbol);
          if (!item) return;
          item.isBookmarked = false;
        })
        .catch(console.error);
    },

    findItemBySymbol(symbol: string) {
      return this.items.find((item) => item.symbol === symbol);
    },

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

.search-item {
  padding: 24px 12px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
}

.item-title {
  font-size: 18px;
  display: block;
  margin-bottom: 4px;
}

.bookmark-button {
  font-size: 24px;
  height: 100%;
  padding: 4px;
}
</style>
