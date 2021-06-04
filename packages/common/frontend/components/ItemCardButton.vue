<template>
  <input
    v-if="isAddBookmarkButton && isBookmarkedForLocal"
    class="item-card-active-button"
    type="button"
    @click="handleBookmark(email, symbol, name, category)"
  />
  <input
    v-else-if="isAddBookmarkButton"
    class="item-card-button"
    type="button"
    @click="handleBookmark(email, symbol, name, category)"
  />

  <input v-else class="item-card-button" type="button" @click="$emit('handle-item-card-button-click')" />
</template>

<script>
import { createBookmark, deleteBookmark } from '../apis';

export default {
  name: 'ItemCardButton',
  props: {
    isAddBookmarkButton: {
      type: Boolean,
      default: false,
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
.item-card-button {
  width: 30px;
  height: 30px;
  background-color: green;
  margin-right: 10px;
}

.item-card-active-button {
  width: 30px;
  height: 30px;
  background-color: red;
  margin-right: 10px;
}
</style>
