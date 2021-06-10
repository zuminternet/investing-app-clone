import { addBookmark, removeBookmark } from '@/services/bookmarkService';

export default {
  methods: {
    onAddBookmark({ symbol, name, category }) {
      addBookmark({ symbol, name, category })
        .then(({ symbol }) => {
          const item = this.findItemBySymbol(symbol);
          if (!item) return;
          item.isBookmarked = true;
        })
        .catch(console.error);
    },

    onRemoveBookmark({ symbol, name }) {
      removeBookmark({ symbol, name })
        .then((symbol) => {
          const item = this.findItemBySymbol(symbol);
          if (!item) return;
          item.isBookmarked = false;
        })
        .catch(console.error);
    },

    findItemBySymbol(symbol: string) {
      return this.items.find((item) => item.symbol === symbol);
    },
  },
};
