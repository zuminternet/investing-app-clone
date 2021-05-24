<template>
  <button class="item-card" @click="$emit('route-to-item-detail')">
    <div class="item-information-except-price">
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
  </button>
</template>

<script>
import EmptySpace from '../../../common/frontend/components/karl/EmptySpace.vue';

export default {
  name: 'ItemCard',
  components: {
    EmptySpace,
  },
  props: ['item'],

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
