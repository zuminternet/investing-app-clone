import { addBookmark, removeBookmark } from '@/services/bookmarkService';

/**
 * bookmarkMixin
 *
 * Search, Bookmark 페이지에서 공통적으로 사용하는 기능을 추출한 믹스인
 * 북마크 추가,제거 메소드
 */
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
