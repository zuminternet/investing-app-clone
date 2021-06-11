<template>
  <div class="item-detail-price-box">
    <div class="up-and-down-icon-box">
      <span
        :class="{
          'up-down-arrow': true,
          'up-arrow': isUp,
          'down-arrow': isDown,
        }"
        >&#10144;</span
      >
    </div>
    <div>
      <div>
        <custom-text itemDetailPrice>{{ close }}</custom-text>
        <template v-if="upDownPrice > 0">
          <custom-text itemDetailPlus> {{ upDownPrice }}</custom-text>
          <custom-text itemDetailPlus> ({{ upDownRate }})</custom-text>
        </template>
        <template v-else-if="upDownPrice < 0">
          <custom-text itemDetailMinus> {{ upDownPrice }}</custom-text>
          <custom-text itemDetailMinus> ({{ upDownRate }})</custom-text>
        </template>
        <template v-else>
          <custom-text itemCardNameAndPrice> {{ upDownPrice }}</custom-text>
          <custom-text itemCardNameAndPrice> ({{ upDownRate }})</custom-text>
        </template>
      </div>
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
      return this.itemDetail.close.toFixed(2);
    },

    upDownPrice() {
      return this.itemDetail.upDownPrice.toFixed(2);
    },

    upDownRate() {
      return this.itemDetail.upDownRate.toFixed(2);
    },

    isUp() {
      return this.itemDetail.upDownPrice > 0;
    },

    isDown() {
      return this.itemDetail.upDownPrice < 0;
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
  align-items: center;
  padding-left: 10px;
}

.up-and-down-icon-box {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.up-down-arrow {
  font-size: 30px;
}

.up-arrow {
  color: var(--red-color);
  transform: rotate(270deg);
}

.down-arrow {
  color: var(--blue-color);
  transform: rotate(90deg);
}

.share-button {
  width: 30px;
  height: 30px;
  background-color: green;
  margin-right: 10px;
}
</style>
