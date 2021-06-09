<template>
  <Layout>
    <Header>
      <HeaderTitle>
        <template #left>
          <HeaderButton @clickHeaderButton="back">🠔</HeaderButton>
        </template>
        <template #right>
          <RouterLink to="/search">&#128269;</RouterLink>
        </template>
        {{ headerTitle }}
      </HeaderTitle>
    </Header>
    <main v-if="isLoading">
      <div :class="$style.message">loading...</div>
    </main>
    <main v-else-if="isError">
      <div :class="$style.message">Error!</div>
    </main>
    <main v-else>
      <ArticleDetailSection>
        <ArticleDetailTitle>{{ article.title }}</ArticleDetailTitle>
        <ArticleDetailSubInfo :class="$style.sub">{{ article.source }} | {{ article.date | formatDate }}</ArticleDetailSubInfo>
      </ArticleDetailSection>
      <ArticleDetailSection>
        <ArticleDetailBodyImage :src="article.image_url" />
        <ArticleDetailBodyText>{{ article.text }}</ArticleDetailBodyText>
      </ArticleDetailSection>
    </main>
    <BottomNav></BottomNav>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { Header, HeaderTitle, HeaderButton } from '@/components/Header';
import Layout from '@/components/Layout/Layout.vue';
import { getArticle } from '@/services/articleService';
import { fromNow } from 'common/frontend/utils';
import {
  ArticleDetailSection,
  ArticleDetailTitle,
  ArticleDetailSubInfo,
  ArticleDetailBodyText,
  ArticleDetailBodyImage,
} from 'common/frontend/components/ArticleDetail';

export default Vue.extend({
  name: 'NewsDetail',

  components: {
    BottomNav,
    Header,
    HeaderTitle,
    Layout,
    HeaderButton,
    ArticleDetailSection,
    ArticleDetailTitle,
    ArticleDetailSubInfo,
    ArticleDetailBodyText,
    ArticleDetailBodyImage,
  },

  filters: {
    formatDate(date) {
      return fromNow(date);
    },
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
  },

  created() {
    getArticle(this.params.id)
      .then((article) => {
        this.article = article;
        this.isLoading = false;
      })
      .catch((e) => {
        console.error(e);
        this.isError = true;
        this.isLoading = false;
      });
  },

  methods: {
    back() {
      this.$router.back();
    },
  },
});
</script>

<style lang="scss" module>
.sub {
  border-color: var(--border-color);
}

.message {
  padding: 12px;
  font-size: 18px;
}
</style>
