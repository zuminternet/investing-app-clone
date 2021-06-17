<template>
  <Link
    v-show="changeData"
    class="card market-list-card"
    :href="`/markets/${typeName}s/${ticker}`"
    :name="''"
    @click.native="setTicker"
  >
    <div class="market-list-card-info noselect" :class="changeColor">
      <div class="market-list-card-info-ticker">
        <Words class="tickerName"> {{ tickerName }}</Words>
        <Words class="ticker"> ({{ ticker }}) </Words>
      </div>
      <div class="market-list-card-info-change noselect">
        <Words class="market-list-card-info-price"> 현재가 {{ currPrice }}원 {{ changeEmoji }} </Words>
        <Words class="market-list-card-info-text">
          전일대비 {{ changeSign }}&nbsp;{{ changePrice }}원 / {{ changeSign }} {{ changePercent }} {{ changeText }}
        </Words>
      </div>
    </div>
    <Chart v-bind="{ typeName, ticker }" />
  </Link>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import Link from '@/components/atoms/RouterLink.vue';
import Card from '@/components/molecules/Card.vue';
import Chart from '@/components/molecules/ChartMini.vue';
import { createNamespacedHelpers } from 'vuex';
import { RootActions, StoreNames } from '@/store';

const { abs } = Math;
const { mapActions } = createNamespacedHelpers(StoreNames.Market);

export default Vue.extend({
  name: 'MarketListCard',

  components: { Card, Words, Link, Chart },

  props: {
    typeName: String,
    ticker: String,
    tickerName: String,
  },

  data() {
    return {
      changeData: null,
      currPrice: null,
      change: null,
      changePercent: null,
    };
  },

  computed: {
    changePrice() {
      return abs(this.change).toLocaleString();
    },

    changeColor() {
      return this.change === 0 ? 'same' : this.change > 0 ? 'up' : 'down';
    },

    changeText() {
      return this.change === 0 ? `보합` : this.change > 0 ? `상승` : `하락`;
    },

    changeEmoji() {
      return this.change === 0 ? `` : this.change > 0 ? `🚀🚀🚀` : `🔥🔥🔥`;
    },

    changeSign() {
      return this.change >= 0 ? '+' : '-';
    },
  },

  async mounted() {
    const { results } = await this.getTodayMiniStocks(this.ticker);
    if (!results?.length) {
      return (this.changeData = null);
    }
    const [today, dayBefore] = (this.changeData = results.slice(0, 2));
    const { adj_close: todayC } = today;
    const { adj_close: beforeC } = dayBefore;

    this.change = todayC - beforeC;
    this.currPrice = todayC.toLocaleString();
    this.changePercent = `${(abs(this.change / beforeC) * 100).toFixed(2)} %`;
  },

  methods: {
    ...mapActions(['getTodayMiniStocks']),

    setTicker() {
      this.$store.dispatch(RootActions.SET_CURRENT_TICKER, this.ticker);
    },
  },
});
</script>

<style lang="scss" scoped>
.market-list-card {
  &.card {
    width: 100%;
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background-color: $grey-100;

    &.router-link:hover {
      background-color: rgba($red-800, 0.3);
      font-weight: inherit;
      text-decoration: none;
    }
  }

  &-info {
    min-height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    overflow: visible;
    white-space: nowrap;

    &-ticker {
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .tickerName {
        padding-bottom: 15px;
        font-weight: bolder;
        font-size: 1.3rem;
      }

      .ticker {
        font-weight: normal;
        font-size: 0.8rem;
        vertical-align: baseline;
      }
    }

    &-change {
      width: 250px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    &-price {
      text-align: left;
      font-size: 1.1rem;
      font-weight: bolder;
    }

    &-text {
      height: max-content;
      text-align: left;
      cursor: pointer;
    }

    &.same {
      color: $grey-700;

      .dark & {
        color: $grey-300;
      }
    }

    &.up {
      color: $red-800;
    }

    &.down {
      color: $blue-700;
    }
  }
}
</style>
