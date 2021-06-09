<template>
  <section class="article-section">
    <h2 v-if="sectionTitle">{{ sectionTitle }}</h2>
    <NewsHeadline v-if="headline" :to="`${prefix}${headline._id}`">
      <NewsImage :src="headline.image_url" />
      <NewsTextBox>
        <NewsTextBoxTitle>{{ headline.title }}</NewsTextBoxTitle>
        <NewsTextBoxDesc :author="headline.source" :publish-date="headline.date" />
      </NewsTextBox>
    </NewsHeadline>
    <NewsList v-if="articles">
      <NewsListItem v-for="{ _id, image_url, date, source, title } in articles" :key="_id" :to="`${prefix}${_id}`">
        <NewsImage :src="image_url" />
        <NewsTextBox>
          <NewsTextBoxTitle>{{ title }}</NewsTextBoxTitle>
          <NewsTextBoxDesc :author="source" :publish-date="date" />
        </NewsTextBox>
      </NewsListItem>
    </NewsList>
    <button v-if="moreButtonText" class="more-button" @click="$emit('clickMoreButton')">
      {{ moreButtonText }}
    </button>
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
  },

  props: {
    headline: {
      type: Object,
      default: null,
    },
    articles: {
      type: Array,
      default: [],
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
    .news-date {
      color: var(--sub-text-color);
      font-size: 13px;
    }
  }

  .section-title {
    font-size: 24px;
    padding: 0px 12px 36px;
  }

  .more-button {
    padding: 4px;
    margin-top: 4px;
    margin-left: 12px;
    font-size: 16px;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
}
</style>
