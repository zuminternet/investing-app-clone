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
      <BookmarkList>
        <BookmarkListItem v-for="{ name, symbol, category, isBookmarked } in bookmarks" :key="symbol">
          <BookmarkListItemTitle>{{ name }}</BookmarkListItemTitle>
          <BookmarkListItemText>{{ symbol }} | {{ category }}</BookmarkListItemText>
          <template #button>
            <BookmarkListItemButton v-if="isBookmarked" @click="onRemoveBookmark({ symbol, name })">
              &#9733;
            </BookmarkListItemButton>
            <BookmarkListItemButton v-else @click="onAddBookmark({ symbol, name, category })">
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
    };
  },

  created() {
    this.isLoading = true;
    getBookmarks()
      .then((bookmarks) => bookmarks.map((bookmark) => ({ ...bookmark, isBookmarked: true })))
      .then((bookmarks) => (this.bookmarks = bookmarks))
      .catch(console.error)
      .finally(() => (this.isLoading = false));
  },
});
</script>

<style lang="scss" module>
.main {
  position: relative;
}
</style>
