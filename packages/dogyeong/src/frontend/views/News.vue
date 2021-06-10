<template>
  <Layout>
    <Header>
      <HeaderTitle>
        <template #right>
          <RouterLink to="/search">&#128269;</RouterLink>
        </template>
        뉴스
      </HeaderTitle>
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
          <ArticleTemplate
            :headline="headline"
            :articles="normalNews"
            url-prefix="/news/new"
            more-button-text="더 많은 뉴스 >"
            @clickMoreButton="getNewNews"
          />
          <ArticleTemplate
            :articles="newOpinions"
            url-prefix="/news/new"
            more-button-text="더 많은 의견 >"
            section-title="분석 및 의견"
            @clickMoreButton="getNewOpinions"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ArticleTemplate
            :headline="headline"
            :articles="normalNews"
            url-prefix="/news/popular"
            more-button-text="더 많은 뉴스 >"
            @clickMoreButton="getPopularNews"
          />
          <ArticleTemplate
            :articles="newOpinions"
            url-prefix="/news/popular"
            more-button-text="더 많은 의견 >"
            section-title="분석 및 의견"
            @clickMoreButton="getPopularOpinions"
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
import ArticleTemplate from '@/components/ArticleTemplate/ArticleTemplate.vue';
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
    ArticleTemplate,
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
