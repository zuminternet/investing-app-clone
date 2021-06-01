<template>
  <div class="multipurpose-header">
    <template v-if="isItemDetail">
      <div class="header-button-box">
        <header-button></header-button>
      </div>
      <div>
        <div>
          <custom-text>{{ name }}</custom-text>
        </div>
        <div>
          <custom-text>{{ category }}</custom-text>
        </div>
      </div>
      <empty-space></empty-space>
      <div class="header-button-box">
        <header-button></header-button>
        <header-button></header-button>
        <header-button></header-button>
      </div>
    </template>

    <template v-if="isSearch">
      <header-button isBackButton></header-button>
      <search-input @search-input-value-change="requestSearchedItems" />
    </template>

    <template v-if="isHome">
      <div class="header-title-box">
        <p>{{ title }}</p>
      </div>
      <empty-space></empty-space>
      <div class="header-button-box">
        <header-button @handle-header-button-click="goSearch"></header-button>
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

    itemDetail: {
      type: Object,
      required: false,
    },
  },

  data() {
    const { itemName, itemCategory } = this.itemDetail ? this.itemDetail : {};

    return {
      itemName,
      itemCategory,
      title: 'investing.com',
      marketName: '홍콩',
      searchInputValue: '',
    };
  },

  computed: {
    name() {
      return this.itemDetail.name;
    },

    category() {
      return this.itemDetail.category;
    },
  },

  methods: {
    ...mapActions('search', ['getSearchedItems']),
    goSearch() {
      this.$router.push('search');
    },

    requestSearchedItems(event) {
      const keyword = event.target.value;

      if (keyword) {
        console.log('ca;;');
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
