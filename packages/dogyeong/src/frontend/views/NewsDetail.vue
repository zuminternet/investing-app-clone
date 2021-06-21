<template>
  <Layout>
    <Header>
      <HeaderTitle>
        <template #left>
          <HeaderButton @clickHeaderButton="back">🠔</HeaderButton>
        </template>
        <template #right>
          <SearchButton />
        </template>
        {{ headerTitle }}
      </HeaderTitle>
    </Header>
    <main class="news-detail-main">
      <LoadingSpinner v-if="isLoading" />
      <ErrorMessage v-else-if="isError || !article">
        에러가 발생했습니다 :(
        <ErrorRetryButton @click="getArticle">&#8635;</ErrorRetryButton>
      </ErrorMessage>
      <template v-else>
        <ArticleDetailSection>
          <ArticleDetailTitle>{{ article.title }}</ArticleDetailTitle>
          <ArticleDetailSubInfo class="news-detail-sub">{{ article.source }} | {{ article.date | fromNow }}</ArticleDetailSubInfo>
        </ArticleDetailSection>
        <ArticleDetailSection>
          <ArticleDetailBodyImage :src="article.image_url" />
          <ArticleDetailBodyText>{{ article.text }}</ArticleDetailBodyText>
        </ArticleDetailSection>
      </template>
      <ReplySection id="reply-section" :email="$store.getters.isLoggedIn.toString()" :docId="articleId" />
    </main>
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
/**
 * NewsDetail
 *
 * 뉴스/분석 상세페이지
 */
import Vue from 'vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { Header, HeaderTitle, HeaderButton } from '@/components/Header';
import Layout from '@/components/Layout/Layout.vue';
import * as articleService from '@/services/articleService';
import { fromNow } from 'common/frontend/utils';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';
import SearchButton from '@/components/SearchButton/SearchButton.vue';
import {
  ArticleDetailSection,
  ArticleDetailBodyImage,
  ArticleDetailBodyText,
  ArticleDetailTitle,
  ArticleDetailSubInfo,
} from 'common/frontend/components/ArticleDetail';
import ErrorMessage from '@/components/Error/ErrorMessage.vue';
import ErrorRetryButton from '@/components/Error/ErrorRetryButton.vue';
import ReplySection from 'common/frontend/components/ReplySection/index.vue';

export default Vue.extend({
  name: 'NewsDetail',

  components: {
    BottomNav,
    Header,
    HeaderTitle,
    Layout,
    HeaderButton,
    LoadingSpinner,
    SearchButton,
    ArticleDetailSection,
    ArticleDetailBodyText,
    ArticleDetailBodyImage,
    ArticleDetailTitle,
    ArticleDetailSubInfo,
    ErrorMessage,
    ErrorRetryButton,
    ReplySection,
  },

  filters: {
    fromNow,
  },

  data() {
    return {
      params: this.$route.params,
      path: this.$route.path.split('/')[1],
      article: null,
      isLoading: true,
      isError: false,
    };
  },

  computed: {
    headerTitle() {
      return this.params.type === 'new' ? '최신' : '가장 인기 있는 뉴스';
    },
    articleId() {
      return this.$route.path.split('/').pop();
    },
  },

  created() {
    this.getArticle();
  },

  methods: {
    back() {
      this.$router.back();
    },
    getArticle() {
      articleService
        .getArticle(this.params.id)
        .then((article) => {
          this.article = article;
          this.isLoading = false;
          this.isError = false;
        })
        .catch(() => {
          this.isError = true;
          this.isLoading = false;
        });
    },
  },
});
</script>

<style lang="scss">
.news-detail-main {
  position: relative;
}

.news-detail-sub {
  border-color: var(--border-color);
}
</style>
