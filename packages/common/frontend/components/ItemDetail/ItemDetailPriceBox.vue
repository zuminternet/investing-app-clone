<template>
  <div class="item-detail-price-box">
    <loading v-if="isLoading" :spinnerSize="15" isDotSpinner />
    <error v-else-if="isError" />
    <template v-else>
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
    </template>
  </div>
</template>

<script>
import CustomText from '../CustomText.vue';
import EmptySpace from '../karl/EmptySpace.vue';
import Loading from 'karl/frontend/components/Loading.vue';
import Error from 'karl/frontend/components/Error.vue';

export default {
  name: 'ItemDetailPriceBox',
  components: {
    CustomText,
    EmptySpace,
    Loading,
    Error,
  },

  props: {
    itemDetail: {
      type: Object,
      required: true,
    },

    isLoading: {
      type: Boolean,
      required: true,
    },

    isError: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    close() {
      if (this.itemDetail.close) {
        return this.itemDetail.close.toFixed(2);
      }

      return 0;
    },

    upDownPrice() {
      if (this.itemDetail.upDownPrice) {
        return this.itemDetail.upDownPrice.toFixed(2);
      }

      return 0;
    },

    upDownRate() {
      if (this.itemDetail.upDownRate) {
        return this.itemDetail.upDownRate.toFixed(2);
      }

      return 0;
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
