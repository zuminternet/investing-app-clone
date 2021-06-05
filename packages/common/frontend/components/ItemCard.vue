<template>
  <div class="item-card">
    <template v-if="isSearch">
      <div class="wrapper" @click="routeToItemDetail">
        <div class="item-info-box">
          <custom-text>
            {{ name }}
          </custom-text>

          <div class="item-sub-info-box">
            <custom-text> {{ symbol }}</custom-text>
            <custom-text v-if="category"> | {{ category }} </custom-text>
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
          <custom-text>
            {{ name }}
          </custom-text>
          <div class="item-sub-information">
            <custom-text>{{ date }}</custom-text>
            |
            <custom-text>
              {{ category }}
            </custom-text>
          </div>
        </div>
        <empty-space></empty-space>
        <div>
          <custom-text>{{ price }}</custom-text>
          <div>
            <custom-text>{{ fluctuationPrice }}</custom-text>
            <custom-text>({{ fluctuationRate }})</custom-text>
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

    isBookmarked() {
      return this.item.isBookmarked;
    },

    price() {
      return this.item.value;
    },

    date() {
      return this.item.date;
    },

    fluctuationPrice() {
      if (!this.isBookmark) {
        return this.item.diff.toFixed(3);
      }

      return 10;
    },

    fluctuationRate() {
      if (!this.isBookmark) {
        return this.item.growthRate.toFixed(3);
      }

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

.wrapper {
  display: flex;
  flex: 1;
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
