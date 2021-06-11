<template>
  <div class="item-detail-price-box">
    <div class="up-and-down-icon"></div>
    <div>
      <div>
        <custom-text>{{ close }}</custom-text>
        <custom-text> {{ upDownPrice }}</custom-text>
        <custom-text> ({{ upDownRate }})</custom-text>
      </div>
      <!-- <div>
        <custom-text>{{ time }}</custom-text>
        <custom-text>{{ currency }}</custom-text>
      </div> -->
    </div>
    <empty-space></empty-space>
    <div>
      <button class="share-button"></button>
    </div>
  </div>
</template>

<script>
import CustomText from '../CustomText.vue';
import EmptySpace from '../karl/EmptySpace.vue';

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
    close() {
      return this.itemDetail.close;
    },

    upDownPrice() {
      return this.itemDetail.upDownPrice;
    },

    upDownRate() {
      return this.itemDetail.upDownRate;
    },

    // time() {
    //   return this.itemDetail.time;
    // },

    // currency() {
    //   return this.itemDetail.currency;
    // },
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
