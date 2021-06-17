<template>
  <div class="bookmark-page">
    <multipurpose-header isBookmark></multipurpose-header>
    <loading v-if="isLoading" :loadingHeight="590" />
    <empty v-else-if="!isLoading && !bookmarks.length" :emptyHeight="590" />
    <item-card-list v-else :items="bookmarks" :excludedHeight="50" isBookmark></item-card-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import MultipurposeHeader from '../components/MultipurposeHeader.vue';
import ItemCardList from '../components/ItemCardList.vue';
import ItemCardButton from '../components/ItemCardButton.vue';
import Empty from 'karl/frontend/components/Empty.vue';
import Loading from 'karl/frontend/components/Loading.vue';

export default {
  name: 'Bookmark',
  components: {
    MultipurposeHeader,
    ItemCardList,
    ItemCardButton,
    Empty,
    Loading,
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.user,
      bookmarks: (state) => state.user.userBookmarks,
      isLoading: (state) => state.user.isLoading,
      isError: (state) => state.user.isError,
    }),
  },

  methods: {
    ...mapActions('user', ['getBookmarks', 'getUser', 'setIsLoading', 'setIsError', 'clearBookmarks']),
  },

  async mounted() {
    this.setIsLoading(true);

    await this.getUser();

    this.setIsLoading(false);
  },

  beforeDestroy() {
    this.clearBookmarks();
  },
};
</script>

<style scoped lang="scss"></style>
