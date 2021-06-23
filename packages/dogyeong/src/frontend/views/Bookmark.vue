<template>
  <Layout>
    <Header>
      <HeaderTitle>
        관심목록
        <template #right>
          <SearchButton />
        </template>
      </HeaderTitle>
    </Header>
    <main :class="$style.main">
      <!-- 로딩 상태 -->
      <LoadingSpinner v-if="isLoading" />
      <!-- 에러 발생 시 -->
      <ErrorMessage v-else-if="isError">
        에러가 발생했습니다! :(
        <ErrorRetryButton @click="fetchBookmarks" />
      </ErrorMessage>
      <!-- 목록이 비어있는 상태 -->
      <ErrorMessage v-else-if="isEmpty">관심목록이 비어있습니다 :(</ErrorMessage>
      <!-- 정상적으로 북마크 목록을 렌더링하는 경우 -->
      <BookmarkList v-else>
        <BookmarkListItem v-for="{ name, symbol, category, isBookmarked } in bookmarks" :key="symbol">
          <BookmarkListItemTitle>{{ name }}</BookmarkListItemTitle>
          <BookmarkListItemText>{{ symbol }} | {{ category }}</BookmarkListItemText>
          <template #button>
            <BookmarkListItemButton v-if="isBookmarked" @click="onRemoveBookmark({ items: bookmarks, symbol, name })">
              &#9733;
            </BookmarkListItemButton>
            <BookmarkListItemButton v-else @click="onAddBookmark({ items: bookmarks, symbol, name, category })">
              &#9734;
            </BookmarkListItemButton>
          </template>
        </BookmarkListItem>
      </BookmarkList>
    </main>
    <BottomNav />
  </Layout>
</template>

<script lang="ts">
/**
 * Bookmark
 *
 * [관심목록]탭에 해당하는 페이지
 */
import Vue from 'vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { Header, HeaderTitle } from '@/components/Header';
import Layout from '@/components/Layout/Layout.vue';
import SearchButton from '@/components/SearchButton/SearchButton.vue';
import { getBookmarks } from '@/services/bookmarkService';
import bookmarkMixin from '@/mixin/bookmarkMixin';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';
import {
  BookmarkList,
  BookmarkListItem,
  BookmarkListItemButton,
  BookmarkListItemTitle,
  BookmarkListItemText,
} from '@/components/Bookmark';
import ErrorMessage from '@/components/Error/ErrorMessage.vue';
import ErrorRetryButton from '@/components/Error/ErrorRetryButton.vue';

export default Vue.extend({
  name: 'Bookmark',

  components: {
    SearchButton,
    BottomNav,
    Layout,
    Header,
    HeaderTitle,
    BookmarkList,
    BookmarkListItem,
    BookmarkListItemButton,
    BookmarkListItemTitle,
    BookmarkListItemText,
    LoadingSpinner,
    ErrorMessage,
    ErrorRetryButton,
  },

  mixins: [bookmarkMixin],

  data() {
    return {
      bookmarks: [],
      isLoading: false,
      isError: false,
    };
  },

  computed: {
    isEmpty() {
      return this.bookmarks.length === 0;
    },
  },

  created() {
    this.fetchBookmarks();
  },

  methods: {
    fetchBookmarks() {
      this.isLoading = true;
      this.isError = false;

      getBookmarks()
        .then((bookmarks) => bookmarks.map((bookmark) => ({ ...bookmark, isBookmarked: true })))
        .then((bookmarks) => (this.bookmarks = bookmarks))
        .catch(() => (this.isError = true))
        .finally(() => (this.isLoading = false));
    },
  },
});
</script>

<style lang="scss" module>
.main {
  position: relative;
}
</style>
