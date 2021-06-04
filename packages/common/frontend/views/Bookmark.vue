<template>
  <div class="bookmark-page">
    <multipurpose-header isBookmark></multipurpose-header>
    <item-card-list :items="bookmarks" :excludedHeight="50" isBookmark></item-card-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import MultipurposeHeader from '../components/MultipurposeHeader.vue';
import ItemCardList from '../components/ItemCardList.vue';
import ItemCardButton from '../components/ItemCardButton.vue';

export default {
  name: 'Bookmark',
  components: {
    MultipurposeHeader,
    ItemCardList,
    ItemCardButton,
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.user,
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
