<template>
  <Layout>
    <Header>
      <HeaderTitle>뉴스</HeaderTitle>
      <HeaderNav>
        <HeaderNavItem
          v-for="route in navRoutes"
          :key="route.id"
          :active="route.id === currentNavId"
          @clickItem="onClickHeaderNav(route.id)"
        >
          {{ route.title }}
        </HeaderNavItem>
      </HeaderNav>
    </Header>
    <main>
      <Swiper ref="swiper" @endSlide="onEndSlide">
        <SwiperSlide>
          <NewsTemplate v-if="headline" :headline="headline" :news="normalNews" :opinions="newOpinions" url-prefix="/news/new" />
        </SwiperSlide>
        <SwiperSlide>
          <NewsTemplate
            v-if="headline"
            :headline="headline"
            :news="normalNews"
            :opinions="newOpinions"
            url-prefix="/news/popular"
          />
        </SwiperSlide>
      </Swiper>
    </main>
    <BottomNav></BottomNav>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { Header, HeaderTitle, HeaderNav, HeaderNavItem } from '@/components/Header';
import Layout from '@/components/Layout/Layout.vue';
import { Swiper, SwiperSlide } from '@/components/Swiper';
import NewsTemplate from '@/components/NewsTemplate/NewsTemplate.vue';
import swiperMixin from '@/mixin/swiperMixin';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'News',

  components: {
    BottomNav,
    Header,
    HeaderTitle,
    HeaderNavItem,
    Layout,
    HeaderNav,
    Swiper,
    SwiperSlide,
    NewsTemplate,
  },

  mixins: [
    swiperMixin({
      fetchData() {
        if (this.currentNavId === 'new') this.getInitialNewArticles();
        if (this.currentNavId === 'popular') this.getInitialPopularArticles();
      },
    }),
  ],

  data() {
    return {
      news: [],
      opinions: [],
      navRoutes: [
        { id: 'new', title: '최신', index: 0 },
        { id: 'popular', title: '가장 인기 있는 뉴스', index: 1 },
      ],
      currentNavId: 'new',
    };
  },

  computed: {
    headline() {
      return this.newNews[0];
    },
    normalNews() {
      return this.newNews.slice(1);
    },
    ...mapState({ newNews: ({ article }) => article.new.news.data }),
    ...mapState({ newOpinions: ({ article }) => article.new.opinions.data }),
  },

  methods: {
    ...mapActions([
      'getNewNews',
      'getNewOpinions',
      'getPopularNews',
      'getPopularOpinions',
      'getInitialNewArticles',
      'getInitialPopularArticles',
    ]),

    onClickHeaderNav(id) {
      this.handleHeaderNavClick(id);
    },

    onEndSlide(swiper) {
      this.handleEndSlide(swiper);
    },
  },
});
</script>

<style lang="scss">
.news-section,
.opinions-section {
  .news-headline {
    a .news-text-container {
      padding: 16px 12px;
    }
  }

  .news-headline,
  .news-list-item {
    a,
    a.news-link {
      background-color: var(--bg-color);
      border-bottom: 1px solid var(--border-color);
    }

    h4 {
      color: var(--text-color);
      word-break: keep-all;
      overflow: hidden;
      font-size: 18px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .news-author,
    .news-date {
      color: var(--sub-text-color);
      font-size: 13px;
    }
  }

  .section-title {
    font-size: 24px;
    padding: 36px 12px;
  }
}
</style>
