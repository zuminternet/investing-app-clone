<template>
  <div class="multipurpose-header">
    <template v-if="isItemDetail">
      <div class="header-button-box">
        <header-button></header-button>
      </div>
      <div>
        <div>
          <custom-text>{{ itemName }}</custom-text>
        </div>
        <div>
          <custom-text>{{ itemCategory }}</custom-text>
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
      <search-input />
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

    itemDetailInformations: {
      type: Object,
      required: false,
    },
  },

  data() {
    const { itemName, itemCategory } = this.itemDetailInformations ? this.itemDetailInformations : {};

    return {
      itemName,
      itemCategory,
      title: 'investing.com',
      marketName: '홍콩',
    };
  },

  methods: {
    goSearch() {
      this.$router.push('search');
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
