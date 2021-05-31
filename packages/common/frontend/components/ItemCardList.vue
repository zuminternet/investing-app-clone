<template>
  <div v-if="isSearch" class="item-card-list" :style="style">
    <item-card v-for="(item, index) in items" :key="index" :item="item" @route-to-page="routeToItemDetail" isSearch></item-card>
  </div>
  <div v-else-if="isHome" class="item-card-list" :style="style">
    <item-card v-for="(item, index) in items" :key="index" :item="item" @route-to-page="routeToItemDetail" isHome></item-card>
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
    excludingHeight: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },

    isSearch: {
      type: Boolean,
      default: false,
    },

    isHome: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    style() {
      return {
        height: `calc(100vh - ${this.excludingHeight}px)`,
      };
    },
  },

  methods: {
    routeToItemDetail() {
      this.$router.push('/item-detail');
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
