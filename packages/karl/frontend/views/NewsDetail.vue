<template>
  <div class="news-detail-page">
    <multipurpose-header isNewsDetail></multipurpose-header>

    <article-detail-section>
      <article-detail-title>{{ articleDetail.title }}</article-detail-title>
      <article-detail-sub-info>{{ articleDetail.source }} | {{ articleDetail.date | formatDate }}</article-detail-sub-info>
    </article-detail-section>
    <article-detail-section>
      <article-detail-body-image :src="imageURL"></article-detail-body-image>
      <article-detail-body-text>{{ articleDetail.text }}</article-detail-body-text>
    </article-detail-section>
  </div>
</template>

<script>
import MultipurposeHeader from '../../../common/frontend/components/MultipurposeHeader.vue';
import ArticleDetailSection from '../../../common/frontend/components/ArticleDetail/ArticleDetailSection.vue';
import ArticleDetailTitle from '../../../common/frontend/components/ArticleDetail/ArticleDetailTitle.vue';
import ArticleDetailSubInfo from '../../../common/frontend/components/ArticleDetail/ArticleDetailSubInfo.vue';
import ArticleDetailBodyImage from '../../../common/frontend/components/ArticleDetail/ArticleDetailBodyImage.vue';
import ArticleDetailBodyText from '../../../common/frontend/components/ArticleDetail/ArticleDetailBodyText.vue';

import { mapActions, mapState } from 'vuex';
import { fromNow } from 'common/frontend/utils';

export default {
  name: 'NewsDetail',
  components: {
    MultipurposeHeader,
    ArticleDetailSection,
    ArticleDetailSubInfo,
    ArticleDetailTitle,
    ArticleDetailBodyImage,
    ArticleDetailBodyText,
  },

  filters: {
    formatDate(date) {
      return fromNow(date);
    },
  },

  computed: {
    ...mapState({
      articleDetail: (state) => state.article.articleDetail,
    }),

    imageURL() {
      return this.articleDetail.image_url ? this.articleDetail.image_url : '';
    },
  },

  methods: {
    ...mapActions('article', ['getArticleById']),
  },

  beforeMount() {
    const { id } = this.$route.query;

    this.getArticleById(id);
  },
};
</script>

<style scopred lang="scss"></style>
