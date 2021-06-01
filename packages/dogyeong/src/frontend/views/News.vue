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
          <section class="news-section">
            <NewsHeadline v-if="headline" :to="`/news/${headline._id}`">
              <NewsImage :src="headline.image_url" />
              <NewsTextBox>
                <NewsTextBoxTitle>{{ headline.title }}</NewsTextBoxTitle>
                <NewsTextBoxDesc :author="headline.source" :publish-date="headline.date" />
              </NewsTextBox>
            </NewsHeadline>
            <NewsList v-if="normalNews">
              <NewsListItem v-for="newsItem in normalNews" :key="newsItem._id" :to="`/news/${newsItem._id}`">
                <NewsImage :src="newsItem.image_url" />
                <NewsTextBox>
                  <NewsTextBoxTitle>{{ newsItem.title }}</NewsTextBoxTitle>
                  <NewsTextBoxDesc :author="newsItem.source" :publish-date="newsItem.date" />
                </NewsTextBox>
              </NewsListItem>
            </NewsList>
          </section>
          <section class="opinions-section">
            <h2 class="section-title">분석 및 의견</h2>
            <NewsList v-if="opinions">
              <NewsListItem v-for="opinion in opinions" :key="opinion._id" :to="`/news/${opinion._id}`">
                <NewsImage :src="opinion.image_url" rounded />
                <NewsTextBox>
                  <NewsTextBoxTitle>{{ opinion.title }}</NewsTextBoxTitle>
                  <NewsTextBoxDesc :author="opinion.source" :publish-date="opinion.date" />
                </NewsTextBox>
              </NewsListItem>
            </NewsList>
          </section>
        </SwiperSlide>
        <SwiperSlide> </SwiperSlide>
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
import {
  NewsHeadline,
  NewsTextBoxTitle,
  NewsTextBoxDesc,
  NewsTextBox,
  NewsImage,
  NewsList,
  NewsListItem,
} from 'common/frontend/components/News';
import { Swiper, SwiperSlide } from '@/components/Swiper';
import swiperMixin from '@/mixin/swiperMixin';
import * as articleService from '@/services/articleService';

export default Vue.extend({
  name: 'News',

  components: {
    BottomNav,
    Header,
    HeaderTitle,
    HeaderNavItem,
    Layout,
    NewsHeadline,
    NewsTextBoxTitle,
    NewsTextBoxDesc,
    NewsTextBox,
    NewsImage,
    NewsList,
    NewsListItem,
    HeaderNav,
    Swiper,
    SwiperSlide,
  },

  mixins: [
    swiperMixin({
      fetchData() {
        /** @TODO 수정 */
        if (this.currentNavId === 'new') this.getNews();
        if (this.currentNavId === 'popular') this.getOpinions();
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
      return this.news[0];
    },
    normalNews() {
      return this.news.slice(1);
    },
  },

  methods: {
    onClickHeaderNav(id) {
      this.handleHeaderNavClick(id);
    },

    onEndSlide(swiper) {
      this.handleEndSlide(swiper);
    },

    getNews() {
      articleService.getNews().then((news) => (this.news = news));
    },

    getOpinions() {
      articleService.getOpinions().then((opinions) => (this.opinions = opinions));
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
