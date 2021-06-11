<template>
  <button v-if="isBackButton" class="header-button" @click="goBack">
    <span class="left-arrow">&#8592;</span>
  </button>
  <button v-else-if="isGoSearchButton" class="header-button" @click="goSearch">
    <span class="search">&#9906;</span>
  </button>
  <button v-else-if="isAddBookmarkButton" class="header-button" @click="handleBookmark(email, symbol, name, category)">
    <span v-if="isBookmarkedForLocal" class="full-star">&#9733;</span>
    <span v-else class="empty-star">&#9734;</span>
  </button>
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
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
}

.search {
  font-size: 25px;
  color: var(--icon-color);
  font-weight: bold;
  transform: rotate(320deg);
}

.left-arrow {
  font-size: 25px;
  color: var(--icon-color);
  font-weight: bold;
  margin-top: -5px;
}

.full-star {
  font-size: 25px;
  color: var(--icon-color);
  margin-top: -5px;
  font-weight: bold;
}

.empty-star {
  font-size: 25px;
  color: var(--icon-color);
  margin-top: -5px;
  font-weight: bold;
}
</style>
