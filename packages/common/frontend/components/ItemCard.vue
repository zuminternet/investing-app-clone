<template>
  <div class="item-card">
    <template v-if="isSearch">
      <div class="wrapper" @click="routeToItemDetail">
        <div class="item-info-box">
          <custom-text itemCardNameAndPrice>
            {{ name }}
          </custom-text>

          <div class="item-sub-info-box">
            <custom-text v-if="isStock"> {{ symbol }} | </custom-text>
            <custom-text v-if="category" itemCardTimeAndCategory>{{ category }} </custom-text>
          </div>
        </div>
        <empty-space></empty-space>
      </div>
      <div class="bookmark-button-box">
        <item-card-button
          :name="name"
          :category="category"
          :email="email"
          :symbol="symbol"
          :isBookmarked="isBookmarked"
          isAddBookmarkButton
        ></item-card-button>
      </div>
    </template>

    <template v-if="isHome || isBookmark">
      <div class="wrapper" @click="routeToItemDetail">
        <div class="item-info-box">
          <custom-text itemCardNameAndPrice>
            {{ name }}
          </custom-text>
          <div class="item-sub-information">
            <custom-text itemCardTimeAndCategory>{{ date }}</custom-text>

            <custom-text itemCardTimeAndCategory> | {{ category }} </custom-text>
          </div>
        </div>
        <empty-space></empty-space>
        <div>
          <div class="item-card-price-box">
            <custom-text itemCardNameAndPrice>{{ price }}</custom-text>
          </div>
          <div>
            <template v-if="diff > 0">
              <custom-text itemCardPlus>{{ diff }}</custom-text>
              <custom-text itemCardPlus> ({{ growthRate }})</custom-text>
            </template>
            <template v-else-if="diff < 0">
              <custom-text itemCardMinus>{{ diff }}</custom-text>
              <custom-text itemCardMinus> ({{ growthRate }})</custom-text>
            </template>
            <template v-else>
              <custom-text>{{ diff }}</custom-text>
              <custom-text> ({{ growthRate }})</custom-text>
            </template>
          </div>
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

    isBookmark: {
      type: Boolean,
      default: false,
    },

    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    name() {
      return this.item.name;
    },

    category() {
      return this.item.category;
    },

    symbol() {
      return this.item.symbol;
    },

    email() {
      return this.userInfo.userEmail;
    },

    isStock() {
      return this.item.isStock;
    },

    isBookmarked() {
      return this.item.isBookmarked;
    },

    price() {
      return this.item.value;
    },

    date() {
      return this.item.date;
    },

    diff() {
      return this.item.diff.toFixed(2);
    },

    growthRate() {
      return this.item.growthRate.toFixed(2);
    },
  },

  methods: {
    routeToItemDetail() {
      this.$router.push({ path: 'item-detail', query: { symbols: this.symbol, name: this.name } });
    },
  },
};
</script>

<style scoped lang="scss">
.item-card {
  display: flex;
  flex: 0 0 auto;
  height: 40px;
  padding: 7px;
}

.wrapper {
  display: flex;
  flex: 1;
}

.item-card-price-box {
  display: flex;
  flex-direction: row-reverse;
}

.item-info-box {
  display: flex;
  flex-direction: column;
}

.bookmark-button-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
