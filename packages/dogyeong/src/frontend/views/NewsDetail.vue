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
    <main>
      <section class="article-header">
        <h3 class="article-title">{{ article.title }}</h3>
        <p class="article-info">{{ article.source }} | {{ article.date }}</p>
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

export default Vue.extend({
  name: 'NewsDetail',

  components: {
    BottomNav,
    Header,
    HeaderTitle,
    Layout,
    HeaderButton,
  },

  data() {
    return {
      params: this.$route.params,
      path: this.$route.path.split('/')[1],
    };
  },

  computed: {
    article() {
      const { id, type } = this.params;
      const { news, opinions } = this.$store.state.article[type];

      return news.data.find(({ _id }) => _id === id) ?? opinions.data.find(({ _id }) => _id === id);
    },
    headerTitle() {
      return this.params.type === 'new' ? '최신' : '가장 인기 있는 뉴스';
    },
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
}
</style>
