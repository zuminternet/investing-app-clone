<template>
  <div class="news-detail-page">
    <multipurpose-header isNewsDetail />
    <loading v-if="articleDetailIsLoading" />
    <error v-else-if="articleDetailIsError" />
    <empty v-else-if="isEmptyObject(articleDetail)" />
    <template v-else>
      <article-detail-section>
        <article-detail-title>{{ articleDetail.title }}</article-detail-title>
        <article-detail-sub-info>{{ articleDetail.source }} | {{ articleDetail.date | formatDate }}</article-detail-sub-info>
      </article-detail-section>
      <article-detail-section>
        <article-detail-body-image :src="imageURL" />
        <article-detail-body-text>{{ articleDetail.text }}</article-detail-body-text>
      </article-detail-section>
    </template>
  </div>
</template>

<script>
import MultipurposeHeader from '../../../common/frontend/components/MultipurposeHeader.vue';
import ArticleDetailSection from '../../../common/frontend/components/ArticleDetail/ArticleDetailSection.vue';
import ArticleDetailTitle from '../../../common/frontend/components/ArticleDetail/ArticleDetailTitle.vue';
import ArticleDetailSubInfo from '../../../common/frontend/components/ArticleDetail/ArticleDetailSubInfo.vue';
import ArticleDetailBodyImage from '../../../common/frontend/components/ArticleDetail/ArticleDetailBodyImage.vue';
import ArticleDetailBodyText from '../../../common/frontend/components/ArticleDetail/ArticleDetailBodyText.vue';
import Loading from 'karl/frontend/components/Loading.vue';
import Error from 'karl/frontend/components/Error.vue';
import Empty from 'karl/frontend/components/Empty.vue';

import { mapActions, mapState } from 'vuex';
import { fromNow, isEmptyObject } from 'common/frontend/utils';

export default {
  name: 'NewsDetail',

  components: {
    MultipurposeHeader,
    ArticleDetailSection,
    ArticleDetailSubInfo,
    ArticleDetailTitle,
    ArticleDetailBodyImage,
    ArticleDetailBodyText,
    Loading,
    Error,
    Empty,
  },

  filters: {
    formatDate(date) {
      return fromNow(date);
    },
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.user,
      articleDetail: (state) => state.article.articleDetail,
      articleDetailIsLoading: (state) => state.article.articleDetailIsLoading,
      articleDetailIsError: (state) => state.article.articleDetailIsError,
    }),

    imageURL() {
      return this.articleDetail.image_url ? this.articleDetail.image_url : '';
    },
  },

  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('article', ['getArticleById', 'setArticleDetailIsLoading']),
    isEmptyObject,
  },

  async mounted() {
    const { id } = this.$route.query;
    const { userEmail, userGoogleId } = this.userInfo;

    this.setArticleDetailIsLoading(true);

    if (!userEmail || !userGoogleId) {
      await this.getUser();
    }

    this.getArticleById(id).then(() => {
      this.setArticleDetailIsLoading(false);
    });
  },
};
</script>

<style scopred lang="scss">
.news-detail-page {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
