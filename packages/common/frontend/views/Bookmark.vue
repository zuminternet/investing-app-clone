<template>
  <div class="bookmark-page">
    <multipurpose-header isSearch></multipurpose-header>
  </div>
</template>

<script>
import MultipurposeHeader from '../components/MultipurposeHeader.vue';

import { createBookmark } from '../apis';
export default {
  name: 'Bookmark',
  components: {
    MultipurposeHeader,
  },

  created() {
    console.log(createBookmark({ email: 'test', symbol: 'test' }));
  },
};
</script>

<style scoped lang="scss"></style>
