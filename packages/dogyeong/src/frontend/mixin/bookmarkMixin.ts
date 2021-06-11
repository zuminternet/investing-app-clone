import { addBookmark, removeBookmark } from '@/services/bookmarkService';

export default {
  methods: {
    onAddBookmark({ items, symbol, name, category }) {
      addBookmark({ symbol, name, category })
        .then(({ symbol }) => {
          const item = this.findItemBySymbol(items, symbol);
          if (!item) return;
          item.isBookmarked = true;
        })
        .catch(console.error);
    },

    onRemoveBookmark({ items, symbol, name }) {
      removeBookmark({ symbol, name })
        .then((symbol) => {
          const item = this.findItemBySymbol(items, symbol);
          if (!item) return;
          item.isBookmarked = false;
        })
        .catch(console.error);
    },

    findItemBySymbol(items, symbol: string) {
      return items.find((item) => item.symbol === symbol);
    },
  },
};
