<template>
  <div class="bookmark-page">
    <multipurpose-header isSearch></multipurpose-header>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import MultipurposeHeader from '../components/MultipurposeHeader.vue';

export default {
  name: 'Bookmark',
  components: {
    MultipurposeHeader,
  },

  computed: {
    ...mapState({
      bookmarks: (state) => state.user.userBookmarks,
    }),
  },

  methods: {
    ...mapActions('user', ['getBookmarks']),
  },

  created() {
    this.getBookmarks();
  },
};
</script>

<style scoped lang="scss"></style>
