<template>
  <section class="article-section">
    <h2 v-if="sectionTitle">{{ sectionTitle }}</h2>
    <NewsHeadline v-if="headline" :to="`${prefix}${headline._id}`">
      <NewsImage :src="headline.image_url" />
      <NewsTextBox>
        <NewsTextBoxTitle>{{ headline.title }}</NewsTextBoxTitle>
        <NewsTextBoxDesc :author="headline.source" :publish-date="headline.date" :replyCount="headline.replyCount" />
      </NewsTextBox>
    </NewsHeadline>
    <NewsList v-if="articles">
      <NewsListItem v-for="{ _id, image_url, date, source, title, replyCount } in articles" :key="_id" :to="`${prefix}${_id}`">
        <NewsImage :src="image_url" />
        <NewsTextBox>
          <NewsTextBoxTitle>{{ title }}</NewsTextBoxTitle>
          <NewsTextBoxDesc :author="source" :publish-date="date" :replyCount="replyCount" />
        </NewsTextBox>
      </NewsListItem>
    </NewsList>
    <div v-if="isLoading" class="spinner-container"><LoadingSpinner /></div>
    <ErrorMessage v-else-if="isError" style="padding: 40px 0;">
      불러오는 도중 실패했습니다 :(
      <ErrorRetryButton @click="$emit('clickMoreButton')" />
    </ErrorMessage>
    <template v-else>
      <ErrorMessage v-if="!articles.length" style="padding: 40px 0;">아직 등록된 기사가 없습니다 :(</ErrorMessage>
      <button v-if="moreButtonText" class="more-button" @click="$emit('clickMoreButton')">
        {{ moreButtonText }}
      </button>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  NewsHeadline,
  NewsTextBoxTitle,
  NewsTextBoxDesc,
  NewsTextBox,
  NewsImage,
  NewsList,
  NewsListItem,
} from 'common/frontend/components/News';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';
import ErrorMessage from '@/components/Error/ErrorMessage.vue';
import ErrorRetryButton from '@/components/Error/ErrorRetryButton.vue';

export default Vue.extend({
  name: 'ArticleTemplate',

  components: {
    NewsHeadline,
    NewsTextBoxTitle,
    NewsTextBoxDesc,
    NewsTextBox,
    NewsImage,
    NewsList,
    NewsListItem,
    LoadingSpinner,
    ErrorMessage,
    ErrorRetryButton,
  },

  props: {
    headline: {
      type: Object,
      default: null,
    },
    articles: {
      type: Array,
      default: () => [],
    },
    urlPrefix: {
      type: String,
      required: true,
    },
    moreButtonText: {
      type: String,
      default: null,
    },
    sectionTitle: {
      type: String,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    prefix() {
      const prefix = this.urlPrefix.startsWith('/') ? '' : '/';
      const suffix = this.urlPrefix.endsWith('/') ? '' : '/';
      return `${prefix}${this.urlPrefix}${suffix}`;
    },
  },
});
</script>

<style lang="scss">
.article-section {
  padding-bottom: 40px;

  h2 {
    padding: 12px;
  }

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
    .news-date,
    .news-reply-count {
      color: var(--sub-text-color);
      font-size: 14px;
    }
  }

  .section-title {
    font-size: 24px;
    padding: 0px 12px 36px;
  }

  .spinner-container {
    height: 140px;
    position: relative;
  }

  .more-button {
    padding: 4px;
    margin-top: 4px;
    margin-left: 12px;
    font-size: 16px;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    color: var(--text-color);
  }
}
</style>
