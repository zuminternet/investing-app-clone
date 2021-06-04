<template>
  <div class="multipurpose-header">
    <template v-if="isItemDetail">
      <div class="header-button-box">
        <header-button isBackButton></header-button>
      </div>
      <div>
        <div>
          <custom-text>{{ name }}</custom-text>
        </div>
        <div>
          <custom-text>{{ category }} ({{ symbol }})</custom-text>
        </div>
      </div>
      <empty-space></empty-space>
      <div class="header-button-box">
        <header-button isGoSearchButton></header-button>
        <header-button isAddBookmarkButton :email="email" :symbol="symbol" :name="name" :category="category"></header-button>
      </div>
    </template>

    <template v-if="isSearch">
      <header-button isBackButton></header-button>
      <search-input @search-input-value-change="requestSearchedItems" />
    </template>

    <template v-if="isHome">
      <div class="header-title-box">
        <p>{{ marketTitle }}</p>
      </div>
      <empty-space></empty-space>
      <div class="header-button-box">
        <header-button isGoSearchButton></header-button>
      </div>
    </template>

    <template v-if="isBookmark">
      <header-button isBackButton></header-button>
      <div class="header-title-box">
        <p>{{ bookmarkTitle }}</p>
      </div>
      <empty-space></empty-space>
      <div class="header-button-box">
        <header-button></header-button>
        <header-button isGoSearchButton></header-button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import CustomText from '../components/CustomText.vue';
import EmptySpace from '../components/karl/EmptySpace.vue';
import SearchInput from '../components/Search/SearchInput.vue';
import HeaderButton from '../components/HeaderButton.vue';

import { text } from '../constants';

export default {
  name: 'MultipurposeHeader',
  components: {
    CustomText,
    EmptySpace,
    SearchInput,
    HeaderButton,
  },

  props: {
    isSearch: {
      type: Boolean,
      default: false,
    },

    isItemDetail: {
      type: Boolean,
      default: false,
    },

    isHome: {
      type: Boolean,
      default: false,
    },

    isBookmark: {
      type: Boolean,
      default: false,
    },

    itemDetail: {
      type: Object,
      default() {
        return {};
      },
    },

    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    name() {
      return this.itemDetail.name;
    },

    category() {
      return this.itemDetail.category;
    },

    symbol() {
      return this.itemDetail.symbol;
    },

    email() {
      return this.userInfo.userEmail;
    },
  },

  data() {
    return {
      marketTitle: text.INVESTING_COM,
      bookmarkTitle: text.BOOKMARK,
    };
  },

  methods: {
    ...mapActions('search', ['getSearchedItems']),

    requestSearchedItems(event) {
      const keyword = event.target.value;

      if (keyword) {
        this.getSearchedItems(keyword);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.multipurpose-header {
  display: flex;
  height: 50px;
  align-items: center;
}

.header-title-box {
  display: flex;
  flex-direction: column;
}

.header-button-box {
  display: flex;
  align-items: center;
}
</style>
