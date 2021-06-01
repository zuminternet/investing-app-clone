<template>
  <div class="item-detail-price-box">
    <div class="up-and-down-icon"></div>
    <div>
      <div>
        <custom-text>{{ price }}</custom-text>
        <custom-text>{{ upDownPrice }}</custom-text>
      </div>
      <div>
        <custom-text>{{ time }}</custom-text>
        <custom-text>{{ currency }}</custom-text>
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

  props: {
    itemDetail: {
      type: Object,
      required: true,
    },
  },

  computed: {
    price() {
      return this.itemDetail.price;
    },

    upDownPrice() {
      return this.itemDetail.upDownPrice;
    },

    time() {
      return this.itemDetail.time;
    },

    currency() {
      return this.itemDetail.currency;
    },
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
