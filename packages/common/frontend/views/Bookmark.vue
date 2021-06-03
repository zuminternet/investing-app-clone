<template>
  <div class="bookmark-page">
    <multipurpose-header isSearch></multipurpose-header>
  </div>
</template>

<script>
import MultipurposeHeader from '../components/MultipurposeHeader.vue';

import { getBookmarks } from '../apis';
export default {
  name: 'Bookmark',
  components: {
    MultipurposeHeader,
  },

  async created() {
    const bookmarks = await getBookmarks('karl@zuminternet.com');

    if (bookmarks) {
      console.log(bookmarks);
    }
  },
};
</script>

<style scoped lang="scss"></style>
