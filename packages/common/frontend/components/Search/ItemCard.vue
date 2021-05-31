<template>
  <div class="item-card" @click="$emit('route-to-page')">
    <div v-if="isSearch">
      hi
    </div>
    <div v-else class="item-information-except-price">
      {{ itemName }}
      <div class="item-sub-information">
        {{ itemTime }} |
        {{ itemCategory }}
      </div>
    </div>
    <empty-space></empty-space>
    <div class="item-information-price">
      {{ itemPrice }}
      <div class="item-sub-information">
        {{ fluctuationPrice }}
        ({{ fluctuationRate }})
      </div>
    </div>
  </div>
</template>

<script>
import EmptySpace from '../karl/EmptySpace.vue';

export default {
  name: 'ItemCard',
  components: {
    EmptySpace,
  },
  // props: ['item'],
  props: {
    item: {
      type: Object,
      default: {},
    },

    isSearch: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    const { itemName, itemTime, itemCategory, itemPrice, fluctuationPrice, fluctuationRate } = this.item ? this.item : {};

    return {
      itemName,
      itemTime,
      itemCategory,
      itemPrice,
      fluctuationPrice,
      fluctuationRate,
    };
  },
};
</script>

<style scoped lang="scss">
.item-card {
  display: flex;
  flex: 0 0 auto;
  height: 40px;
  background-color: grey;
}
</style>
