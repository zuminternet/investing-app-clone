<template>
  <div>
    <ArticleTemplate
      :headline="headline"
      :articles="normalNews"
      url-prefix="/news/new"
      moreButtonText="더 많은 뉴스 >"
      :isLoading="news.isLoading"
      :isError="news.isError"
      @clickMoreButton="getNewNews"
    />
    <ArticleTemplate
      :articles="opinions.data"
      url-prefix="/news/new"
      moreButtonText="더 많은 의견 >"
      sectionTitle="분석 및 의견"
      :isLoading="opinions.isLoading"
      :isError="opinions.isError"
      @clickMoreButton="getNewOpinions"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ArticleTemplate from '@/components/ArticleTemplate/ArticleTemplate.vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'ArticleNew',

  components: {
    ArticleTemplate,
  },

  computed: {
    ...mapState({ news: ({ article }) => article.new.news }),
    ...mapState({ opinions: ({ article }) => article.new.opinions }),

    headline() {
      return this.news.data[0];
    },
    normalNews() {
      return this.news.data.slice(1);
    },
  },

  methods: {
    ...mapActions(['getNewNews', 'getNewOpinions']),
  },
});
</script>

<style lang="scss" module></style>
