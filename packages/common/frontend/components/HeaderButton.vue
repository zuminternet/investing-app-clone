<template>
  <input v-if="isBackButton" class="header-button" type="button" @click="goBack" />
  <input v-else-if="isGoSearchButton" class="header-button" type="button" @click="goSearch" />
  <input
    v-else-if="isAddBookmarkButton && isBookmarkedForLocal"
    class="header-active-button"
    type="button"
    @click="handleBookmark(email, symbol, name, category)"
  />
  <input
    v-else-if="isAddBookmarkButton"
    class="header-button"
    type="button"
    @click="handleBookmark(email, symbol, name, category)"
  />
  <input v-else class="header-button" type="button" @click="$emit('handle-header-button-click')" />
</template>

<script>
import { createBookmark, deleteBookmark } from '../apis';

export default {
  name: 'HeaderButton',
  props: {
    isBackButton: {
      type: Boolean,
      default: false,
    },

    isGoSearchButton: {
      type: Boolean,
      default: false,
    },

    isAddBookmarkButton: {
      type: Boolean,
      default: true,
    },

    email: {
      type: String,
      default: '',
    },

    symbol: {
      type: String,
      default: '',
    },

    name: {
      type: String,
      default: '',
    },

    category: {
      type: String,
      default: '',
    },

    isBookmarked: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isBookmarkedForLocal: false,
    };
  },

  methods: {
    goBack() {
      this.$router.back();
    },

    goSearch() {
      this.$router.push('search');
    },

    async handleBookmark(email, symbol, name, category) {
      if (!this.isBookmarkedForLocal && (await createBookmark({ email, symbol, name, category }))) {
        this.isBookmarkedForLocal = true;
      } else if (this.isBookmarkedForLocal && (await deleteBookmark({ email, symbol, name, category }))) {
        this.isBookmarkedForLocal = false;
      }
    },
  },

  mounted() {
    this.isBookmarkedForLocal = this.isBookmarked;
  },

  watch: {
    isBookmarked() {
      this.isBookmarkedForLocal = this.isBookmarked;
    },
  },
};
</script>

<style scoped lang="scss">
.header-button {
  width: 30px;
  height: 30px;
  background-color: green;
  margin-right: 10px;
}

.header-active-button {
  width: 30px;
  height: 30px;
  background-color: red;
  margin-right: 10px;
}
</style>
