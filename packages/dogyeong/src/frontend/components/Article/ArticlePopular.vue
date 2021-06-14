<template>
  <div>
    <ArticleTemplate
      :headline="headline"
      :articles="normalNews"
      url-prefix="/news/popular"
      moreButtonText="더 많은 뉴스 >"
      :isLoading="news.isLoading"
      :isError="news.isError"
      @clickMoreButton="getPopularNews"
    />
    <ArticleTemplate
      :articles="opinions.data"
      url-prefix="/news/popular"
      moreButtonText="더 많은 의견 >"
      sectionTitle="분석 및 의견"
      :isLoading="opinions.isLoading"
      :isError="opinions.isError"
      @clickMoreButton="getPopularOpinions"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ArticleTemplate from '@/components/ArticleTemplate/ArticleTemplate.vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'ArticlePopular',

  components: {
    ArticleTemplate,
  },

  computed: {
    ...mapState({ news: ({ article }) => article.popular.news }),
    ...mapState({ opinions: ({ article }) => article.popular.opinions }),

    headline() {
      return this.news.data[0];
    },
    normalNews() {
      return this.news.data.slice(1);
    },
  },

  methods: {
    ...mapActions(['getPopularNews', 'getPopularOpinions']),
  },
});
</script>

<style lang="scss" module></style>
