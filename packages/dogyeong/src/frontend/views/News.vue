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
          <ArticleNew />
        </SwiperSlide>
        <SwiperSlide>
          <ArticlePopular />
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
import swiperMixin from '@/mixin/swiperMixin';
import { mapActions } from 'vuex';
import ArticleNew from '@/components/Article/ArticleNew.vue';
import ArticlePopular from '@/components/Article/ArticlePopular.vue';

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
    ArticleNew,
    ArticlePopular,
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
      navRoutes: [
        { id: 'new', title: '최신', index: 0 },
        { id: 'popular', title: '가장 인기 있는 뉴스', index: 1 },
      ],
      currentNavId: 'new',
    };
  },

  methods: {
    ...mapActions(['getInitialNewArticles', 'getInitialPopularArticles']),

    onClickHeaderNav(id) {
      this.handleHeaderNavClick(id);
    },

    onEndSlide(swiper) {
      this.handleEndSlide(swiper);
    },
  },
});
</script>
