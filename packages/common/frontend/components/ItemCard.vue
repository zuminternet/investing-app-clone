<template>
  <div class="item-card" @click="routeToItemDetail">
    <template v-if="isSearch">
      <div class="item-information">
        <custom-text>
          {{ name }}
        </custom-text>

        <div class="item-sub-infortmation">
          <custom-text> {{ symbol }}</custom-text>

          <custom-text v-if="category"> | {{ category }} </custom-text>
        </div>
      </div>
      <empty-space></empty-space>
      <item-card-button></item-card-button>
    </template>

    <template v-if="isHome">
      <div class="item-information-except-price">
        <custom-text>
          {{ name }}
        </custom-text>

        <div class="item-sub-information">
          <custom-text>{{ time }}</custom-text>
          |
          <custom-text>
            {{ category }}
          </custom-text>
        </div>
      </div>
      <empty-space></empty-space>
      <div class="item-information-price">
        <custom-text>{{ price }}</custom-text>

        <div class="item-sub-information">
          <custom-text>{{ fluctuationPrice }}</custom-text>
          <custom-text>({{ fluctuationRate }})</custom-text>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import EmptySpace from './karl/EmptySpace.vue';
import CustomText from './CustomText.vue';
import ItemCardButton from './ItemCardButton.vue';

export default {
  name: 'ItemCard',
  components: {
    EmptySpace,
    CustomText,
    ItemCardButton,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },

    isHome: {
      type: Boolean,
      default: false,
    },

    isSearch: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    name() {
      return this.item.name;
    },

    category() {
      if ((this.isSearch || this.isHome) && this.item.stock_exchange) {
        return this.item.stock_exchange.acronym;
      }

      return 'DUMMY';
    },

    symbol() {
      if (this.isSearch || this.isHome) {
        return this.item.symbol;
      }
    },

    price() {
      return 10;
    },

    time() {
      return 10;
    },

    fluctuationPrice() {
      // if (!this.isSearch) {
      //   return this.item.fluctuationPrice;
      // }

      return 10;
    },

    fluctuationRate() {
      // if (!this.isSearch) {
      //   return this.item.fluctuationRate;
      // }

      return 10;
    },
  },

  methods: {
    routeToItemDetail() {
      this.$router.push({ path: 'item-detail', query: { symbols: this.symbol } });
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
