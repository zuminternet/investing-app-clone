<template>
  <div>
    <section class="news-section">
      <NewsHeadline v-if="headline" :to="`${prefix}${headline._id}`">
        <NewsImage :src="headline.image_url" />
        <NewsTextBox>
          <NewsTextBoxTitle>{{ headline.title }}</NewsTextBoxTitle>
          <NewsTextBoxDesc :author="headline.source" :publish-date="headline.date" />
        </NewsTextBox>
      </NewsHeadline>
      <NewsList v-if="news">
        <NewsListItem v-for="newsItem in news" :key="newsItem._id" :to="`${prefix}${newsItem._id}`">
          <NewsImage :src="newsItem.image_url" />
          <NewsTextBox>
            <NewsTextBoxTitle>{{ newsItem.title }}</NewsTextBoxTitle>
            <NewsTextBoxDesc :author="newsItem.source" :publish-date="newsItem.date" />
          </NewsTextBox>
        </NewsListItem>
      </NewsList>
    </section>
    <section class="opinions-section">
      <h2 class="section-title">분석 및 의견</h2>
      <NewsList v-if="opinions">
        <NewsListItem v-for="opinion in opinions" :key="opinion._id" :to="`${prefix}${opinion._id}`">
          <NewsImage :src="opinion.image_url" rounded />
          <NewsTextBox>
            <NewsTextBoxTitle>{{ opinion.title }}</NewsTextBoxTitle>
            <NewsTextBoxDesc :author="opinion.source" :publish-date="opinion.date" />
          </NewsTextBox>
        </NewsListItem>
      </NewsList>
    </section>
  </div>
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
  name: 'NewsTemplate',

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
      required: true,
    },
    news: {
      type: Array,
      required: true,
    },
    opinions: {
      type: Array,
      required: true,
    },
    urlPrefix: {
      type: String,
      required: true,
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
.news-section,
.opinions-section {
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
    padding: 36px 12px;
  }
}
</style>
