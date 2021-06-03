<template>
  <Layout>
    <Header>
      <HeaderTitle>
        <template #left>
          <HeaderButton @clickHeaderButton="back">🠔</HeaderButton>
        </template>
        {{ headerTitle }}
      </HeaderTitle>
    </Header>
    <main v-if="isLoading">
      <div class="message">loading...</div>
    </main>
    <main v-else-if="isError">
      <div class="message">Error!</div>
    </main>
    <main v-else>
      <section class="article-header">
        <h3 class="article-title">{{ article.title }}</h3>
        <p class="article-info">{{ article.source }} | {{ article.date | formatDate }}</p>
      </section>
      <section class="article-main">
        <img class="article-img" :src="article.image_url" />
        <p class="article-text">{{ article.text }}</p>
      </section>
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

export default Vue.extend({
  name: 'NewsDetail',

  components: {
    BottomNav,
    Header,
    HeaderTitle,
    Layout,
    HeaderButton,
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

<style lang="scss" scoped>
main {
  .article-header {
    padding: 12px;

    .article-title {
      margin-bottom: 12px;
    }
    .article-info {
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 8px;
      word-break: keep-all;
    }
  }

  .article-main {
    padding: 12px;

    .article-img {
      width: 100%;
    }
    .article-text {
      padding: 20px 0;
    }
  }

  .message {
    padding: 12px;
    font-size: 18px;
  }
}
</style>
