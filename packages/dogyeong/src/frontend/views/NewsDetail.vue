<template>
  <Layout>
    <Header>
      <HeaderTitle>
        <template #left>
          <HeaderButton @clickHeaderButton="back">🠔</HeaderButton>
        </template>
        <template #right>
          <SearchButton />
        </template>
        {{ headerTitle }}
      </HeaderTitle>
    </Header>
    <main class="news-detail-main">
      <LoadingSpinner v-if="isLoading" />
      <ErrorMessage v-else-if="isError || !article">
        에러가 발생했습니다 :(
        <ErrorRetryButton @click="getArticle">&#8635;</ErrorRetryButton>
      </ErrorMessage>
      <template v-else>
        <ArticleDetailSection>
          <ArticleDetailTitle>{{ article.title }}</ArticleDetailTitle>
          <ArticleDetailSubInfo class="news-detail-sub">{{ article.source }} | {{ article.date | fromNow }}</ArticleDetailSubInfo>
        </ArticleDetailSection>
        <ArticleDetailSection>
          <ArticleDetailBodyImage :src="article.image_url" />
          <ArticleDetailBodyText>{{ article.text }}</ArticleDetailBodyText>
        </ArticleDetailSection>
      </template>
      <ReplySection id="reply-section" :hasAuth="$store.getters.isLoggedIn" :docId="articleId" />
    </main>
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
/**
 * NewsDetail
 *
 * 뉴스/분석 상세페이지
 */
import Vue from 'vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { Header, HeaderTitle, HeaderButton } from '@/components/Header';
import Layout from '@/components/Layout/Layout.vue';
import * as articleService from '@/services/articleService';
import { fromNow } from 'common/frontend/utils';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';
import SearchButton from '@/components/SearchButton/SearchButton.vue';
import {
  ArticleDetailSection,
  ArticleDetailBodyImage,
  ArticleDetailBodyText,
  ArticleDetailTitle,
  ArticleDetailSubInfo,
} from 'common/frontend/components/ArticleDetail';
import ErrorMessage from '@/components/Error/ErrorMessage.vue';
import ErrorRetryButton from '@/components/Error/ErrorRetryButton.vue';
import ReplySection from 'common/frontend/components/ReplySection/index.vue';

export default Vue.extend({
  name: 'NewsDetail',

  components: {
    BottomNav,
    Header,
    HeaderTitle,
    Layout,
    HeaderButton,
    LoadingSpinner,
    SearchButton,
    ArticleDetailSection,
    ArticleDetailBodyText,
    ArticleDetailBodyImage,
    ArticleDetailTitle,
    ArticleDetailSubInfo,
    ErrorMessage,
    ErrorRetryButton,
    ReplySection,
  },

  filters: {
    fromNow,
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
    articleId() {
      return this.$route.path.split('/').pop();
    },
  },

  created() {
    this.getArticle();
  },

  methods: {
    back() {
      this.$router.back();
    },
    getArticle() {
      articleService
        .getArticle(this.params.id)
        .then((article) => {
          this.article = article;
          this.isLoading = false;
          this.isError = false;
        })
        .catch(() => {
          this.isError = true;
          this.isLoading = false;
        });
    },
  },
});
</script>

<style lang="scss">
.news-detail-main {
  position: relative;
}

.news-detail-sub {
  border-color: var(--border-color);
}

#reply-section {
  padding: 20px 12px;
  border-top: 1px solid var(--border-color);
  border-radius: 0;

  .reply {
    display: block;
  }

  .reply-info {
    margin-bottom: 12px;
  }

  .reply-content {
    padding: 0;
    margin-bottom: 12px;
  }

  .reply-reaction {
    padding: 0;

    .reply-rerepl {
      padding: 4px 8px;
      font-size: 14px;
      border: 1px solid var(--border-color);
      color: var(--text-color);

      &:hover {
        padding: 4px 8px;
        border: 1px solid var(--border-color);
        background-color: var(--border-color);
      }
    }

    .reply-likes {
      font-size: 14px;
      border: 0;
      padding: 4px 8px;

      &:hover {
        border: 0;
        background-color: var(--border-color);
      }
    }
  }

  .reply-valid-text {
    font-style: normal;
    font-size: 15px;
  }

  .card {
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-color);
  }

  #reply-open {
    background-color: var(--header-nav-bg-color);
    color: var(--text-color);

    &:hover {
      border: 1px solid var(--border-color);
      background-color: var(--border-color);
    }
  }

  .thumbnail {
    max-width: 40px;
    max-height: 40px;
  }

  .pure-text {
    color: var(--text-color);
    font-style: normal;
  }

  .reply-info-user-detail .mini {
    font-size: 14px;
    margin: 0;
  }

  // 댓글 입력창
  #reply-input {
    padding: 12px;

    textarea {
      background-color: var(--header-nav-bg-color);
      margin: 0;
      padding: 4px;
      color: var(--text-color);
      font-size: 15px;
      border-radius: 4px;
      border: 1px solid var(--border-color);
      margin-bottom: 8px;
    }

    #buttons {
      justify-content: flex-end;

      #reply-input-cancel {
        background-color: var(--red-color);
        padding: 4px 8px;
        color: #efefef;
        border-radius: 4px;
        border: 0;
        font-size: 14px;
        margin-left: 8px;
      }

      #reply-input-submit {
        @extend #reply-input-cancel;
        background-color: var(--blue-color);
      }
    }
  }

  // 정렬 영역
  .reply-sort {
    font-size: 15px;
    color: var(--text-color);
    line-height: 32px;

    .reply-sort-button {
      font-size: 12px;
      margin-left: 8px;
      padding: 6px 8px;
      width: auto;
      height: auto;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      color: var(--text-color);
      background-color: var(--header-nav-bg-color);

      &:hover {
        background-color: var(--border-color);
      }
    }
  }
}
</style>
