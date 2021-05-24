<template>
  <div class="item-detail-price-box">
    <div class="up-and-down-icon"></div>
    <div>
      <div>
        <custom-text>{{ itemPrice }}</custom-text>
        <custom-text>{{ fluctuationPrice }}</custom-text>
      </div>
      <div>
        <custom-text>{{ itemTime }}</custom-text>
        <custom-text>{{ itemCurrency }}</custom-text>
      </div>
    </div>
    <empty-space></empty-space>
    <div>
      <button class="share-button"></button>
    </div>
  </div>
</template>

<script>
import CustomText from '../components/CustomText.vue';
import EmptySpace from '../components/karl/EmptySpace.vue';

export default {
  name: 'ItemDetailPriceBox',
  components: {
    CustomText,
    EmptySpace,
  },
  props: ['itemDetailInformations'],

  data() {
    const { itemPrice, fluctuationPrice, itemTime, itemCurrency } = this.itemDetailInformations;

    return {
      itemPrice,
      fluctuationPrice,
      itemTime,
      itemCurrency,
    };
  },
};
</script>

<style scoped lang="scss">
.item-detail-price-box {
  display: flex;
  flex-direction: row;
  height: 60px;
  background-color: hotpink;
}

.up-and-down-icon {
  width: 30px;
  height: 30px;
  background-color: green;
  margin-right: 10px;
}

.share-button {
  width: 30px;
  height: 30px;
  background-color: green;
  margin-right: 10px;
}
</style>
