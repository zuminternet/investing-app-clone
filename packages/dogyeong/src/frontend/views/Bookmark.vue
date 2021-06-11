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
      <LoadingSpinner v-if="isLoading" />
      <div v-else-if="isError" :class="$style.message">
        에러가 발생했습니다! :(
        <button :class="$style.retry" @click="fetchBookmarks">&#8635;</button>
      </div>
      <div v-else-if="isEmpty" :class="$style.message">관심목록이 비어있습니다 :(</div>
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

.message {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: var(--text-color);
}

.retry {
  border-radius: 100%;
  background-color: var(--app-bg-color);
  width: 60px;
  height: 60px;
  margin: 20px;
}
</style>
