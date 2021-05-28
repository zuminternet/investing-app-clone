<template>
  <div class="multipurpose-header">
    <template v-if="isItemDetail">
      <div class="header-button-box">
        <button class="header-button"></button>
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
        <button class="header-button"></button>
        <button class="header-button"></button>
        <button class="header-button"></button>
      </div>
    </template>

    <template v-if="isSearch"> </template>

    <template v-if="isHome">
      <div class="header-title-box">
        <p>{{ title }}</p>
      </div>
      <empty-space></empty-space>
      <div class="header-button-box">
        <button class="header-button"></button>
      </div>
    </template>
  </div>
</template>

<script>
import CustomText from '../components/CustomText.vue';
import EmptySpace from '../components/karl/EmptySpace.vue';

export default {
  name: 'MultipurposeHeader',
  components: {
    CustomText,
    EmptySpace,
  },

  props: {
    isSearch: {
      type: Boolean,
      required: false,
    },

    isItemDetail: {
      type: Boolean,
      requied: false,
    },

    isHome: {
      type: Boolean,
      required: false,
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
};
</script>

<style scoped lang="scss">
.multipurpose-header {
  display: flex;
  height: 50px;
}

.header-title-box {
  display: flex;
  flex-direction: column;
}

.header-button-box {
  display: flex;
  align-items: center;
}

.header-button {
  width: 30px;
  height: 30px;
  background-color: green;
  margin-right: 10px;
}
</style>
