<template>
  <div class="item-card" @click="$emit('route-to-page')">
    <template v-if="isSearch">
      <div class="item-information">
        <custom-text>
          {{ itemName }}
        </custom-text>

        <div class="item-sub-infortmation">
          <custom-text> {{ itemSymbol }}</custom-text>

          <custom-text v-if="itemCategory"> | {{ itemCategory }} </custom-text>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="item-information-except-price">
        <custom-text>
          {{ itemName }}
        </custom-text>

        <div class="item-sub-information">
          <custom-text>{{ itemTime }}</custom-text>
          |
          <custom-text>
            {{ itemCategory }}
          </custom-text>
        </div>
      </div>
      <empty-space></empty-space>
      <div class="item-information-price">
        <custom-text>{{ itemPrice }}</custom-text>

        <div class="item-sub-information">
          <custom-text>{{ fluctuationPrice }}</custom-text>
          <custom-text>({{ fluctuationRate }})</custom-text>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import EmptySpace from '../karl/EmptySpace.vue';
import CustomText from '../CustomText.vue';

export default {
  name: 'ItemCard',
  components: {
    EmptySpace,
    CustomText,
  },
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

  computed: {
    itemName() {
      if (this.isSearch) {
        return this.item.name;
      }

      return this.item.itemName;
    },

    itemCategory() {
      if (this.isSearch) {
        return this.item.country;
      }

      return this.item.itemCategory;
    },

    itemSymbol() {
      if (this.isSearch) {
        return this.item.symbol;
      }
    },

    itemPrice() {
      if (!this.isSearch) {
        return this.item.itemPrice;
      }
    },

    fluctuationPrice() {
      if (!this.isSearch) {
        return this.item.fluctuationPrice;
      }
    },

    fluctuationRate() {
      if (!this.isSearch) {
        return this.item.fluctuationRate;
      }
    },
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
