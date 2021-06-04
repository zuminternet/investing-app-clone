<template>
  <input v-if="isBackButton" class="header-button" type="button" @click="goBack" />
  <input v-else-if="isGoSearchButton" class="header-button" type="button" @click="goSearch" />
  <input
    v-else-if="isAddBookmarkButton"
    class="header-button"
    type="button"
    @click="addBookmark(email, symbol, name, category)"
  />
  <input v-else class="header-button" type="button" @click="$emit('handle-header-button-click')" />
</template>

<script>
import { createBookmark } from '../apis';

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
  },

  methods: {
    goBack() {
      this.$router.back();
    },

    goSearch() {
      this.$router.push('search');
    },

    async addBookmark(email, symbol, name, category) {
      await createBookmark({ email, symbol, name, category });
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
</style>
