<template>
  <div class="item-detail-price-box">
    <div class="up-and-down-icon"></div>
    <div>
      <div>
        <custom-text>{{ this.itemDetailInformations.itemPrice }}</custom-text>
        <custom-text>{{ this.itemDetailInformations.fluctuationPrice }}</custom-text>
      </div>
      <div>
        <custom-text>{{ this.itemDetailInformations.itemTime }}</custom-text>
        <custom-text>{{ this.itemDetailInformations.itemCurrency }}</custom-text>
      </div>
    </div>
    <div class="empty-space"></div>
    <div>
      <button class="share-button"></button>
    </div>
  </div>
</template>

<script>
import CustomText from '../components/CustomText.vue';

export default {
  name: 'ItemDetailPriceBox',
  components: {
    CustomText,
  },
  props: ['itemDetailInformations'],
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

.empty-space {
  flex: 1;
}

.share-button {
  width: 30px;
  height: 30px;
  background-color: green;
  margin-right: 10px;
}
</style>
