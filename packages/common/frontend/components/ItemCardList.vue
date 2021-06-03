<template>
  <div v-if="isSearch" class="item-card-list" :style="style">
    <item-card v-for="(item, index) in items" :userInfo="userInfo" :key="index" :item="item" isSearch></item-card>
  </div>
  <div v-else-if="isHome || isBookmark" class="item-card-list" :style="style">
    <item-card v-for="(item, index) in items" :key="index" :item="item" isHome isBookmark></item-card>
  </div>
  <div v-else></div>
</template>

<script>
import ItemCard from './ItemCard.vue';

export default {
  name: 'ItemCardList',
  components: {
    ItemCard,
  },

  props: {
    excludedHeight: {
      type: Number,
      default: 150,
    },

    items: {
      type: Array,
      default() {
        return [];
      },
    },

    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },

    isSearch: {
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
  },

  computed: {
    style() {
      return {
        height: `calc(100vh - ${this.excludedHeight}px)`,
      };
    },
  },
};
</script>
<style scoped lang="scss">
.item-card-list {
  display: flex;
  /* position: absolute;
    left: 0;
    right: 0;
    top: 100px;
    bottom: 50px; */
  /* height: calc(100vh - 150px); */
  flex-wrap: nowrap;
  overflow-y: auto;
  flex-direction: column;
}
</style>
