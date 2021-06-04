<template>
  <input v-if="isAddBookmarkButton" class="item-card-button" type="button" @click="addBookmark(email, symbol, name, category)" />
  <input v-else class="item-card-button" type="button" @click="$emit('handle-item-card-button-click')" />
</template>

<script>
import { createBookmark } from '../apis';

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
  },

  methods: {
    async addBookmark(email, symbol, name, category) {
      console.log(email, symbol, name, category);
      await createBookmark({ email, symbol, name, category });
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
</style>
