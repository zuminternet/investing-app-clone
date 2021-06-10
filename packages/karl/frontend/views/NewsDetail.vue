<template>
  <div class="news-detail-page">
    <multipurpose-header isNewsDetail></multipurpose-header>
    <article-detail-section>
      <article-detail-title>title</article-detail-title>
      <article-detail-sub-info></article-detail-sub-info>
    </article-detail-section>
    <article-detail-section>
      <article-detail-body-image></article-detail-body-image>
      <article-detail-body-text>text</article-detail-body-text>
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
};
</script>

<style scopred lang="scss"></style>
