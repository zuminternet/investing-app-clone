<template>
  <div id="stocks-detail-header" class="card">
    <LazyImages :src="logo" :alt="tickerName" id="stocks-detail-header-logo" />
    <Words id="stocks-detail-header-tickerName">{{ tickerName }}</Words>
    <Words id="stocks-detail-header-price" :class="colorClass">현재가 {{ price.toLocaleString() }}원 </Words>
    <Words id="stocks-detail-header-change" :class="colorClass"> ({{ changeSign }}{{ change }}%) </Words>
    <Words id="stocks-detail-header-price " class="same"> 거래량 {{ volume.toLocaleString() }}주 </Words>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import LazyImages from '@/components/atoms/LazyImages.vue';

export default Vue.extend({
  name: 'StockDetailHeader',

  components: { Words, LazyImages },

  props: {
    logo: {
      type: String,
    },
    tickerName: {
      type: String,
    },
    price: {
      type: Number,
    },
    volume: {
      type: Number,
    },
    change: {
      type: Number,
    },
  },

  computed: {
    changeSign() {
      return this.change > 0 ? '+' : '';
    },

    colorClass() {
      return this.change > 0 ? 'up' : this.change < 0 ? 'down' : 'same';
    },
  },
});
</script>

<style lang="scss" scoped>
#stocks-detail-header {
  padding: 10px;
  display: grid;
  grid-template-columns: 50px 4fr 2fr 1fr 3fr;
  column-gap: 15px;

  .pure-text {
    display: grid;
    place-content: center;
  }

  &-logo {
    width: 40px;
    height: 40px;
    box-shadow: 0 0 2px 0 $grey-500;
    border-radius: 40px;
  }

  &-tickerName {
    color: $grey-700;
    font-weight: 700;
    font-size: 1.45rem;
    text-align: left;

    .dark & {
      color: $grey-100;
    }
  }

  &-change {
    font-size: 0.9rem;
  }
}

.up {
  color: $red-700;
}

.down {
  color: $blue-500;
}

.same {
  color: $grey-500;
}
</style>
