<template>
  <section>
    <h3>Stocks</h3>
    <p>StockName: {{ ticker }}</p>
    <div v-show="onReady" v-for="({ o, h, c, l, t }, idx) in candles" :key="idx">
      <p>time: {{ new Date(t).toLocaleDateString() }}</p>
      <div>open: {{ o }} high: {{ h }} low: {{ l }} close: {{ c }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import polygon from '@/services/chart/polygon';
import { GetMultiDaysStockProps, TimespanEnum } from '@/type/apis';
import { getDateString } from '@/utils/date';

export default Vue.extend({
  /**
   * @todo
   * 다듬으면서 default는 삭제 예정
   */
  props: {
    ticker: {
      type: String,
      default: 'AAPL',
    },
    multiplier: {
      type: Number,
      default: 1,
    },
    timespan: {
      type: String,
      default: TimespanEnum.day,
    },
    from: {
      type: [String, Date],
      /**
       * @description
       * 기본 limit 120일 데이터 요청하지만, 휴장일 데이터 제외하고 가져오므로 넉넉하게 200일 요청
       * @todo
       * 좀더 빠르게 일자 계산할 수 있는 방법?
       */
      default: getDateString(Date.now() - 200 * 60 * 60 * 24 * 1000),
    },
    to: {
      type: [String, Number, Date],
      default: getDateString(Date.now()),
    },
    query: {
      type: Object,
      default: () =>
        Object.freeze({
          /**
           * @description
           * 가장 최근 시세부터 호출하기 위해 sort-desc
           */
          sort: 'desc',
          limit: 120,
        }),
    },
  },

  /**
   * 차트 데이터 저장
   */
  data() {
    return {
      onReady: false,
      stocksPromise: null,
      candles: [],
      candlesCount: 0,
    };
  },

  /**
   * @todo
   * @description
   * API fetching
   */
  created() {
    const { ticker, multiplier, timespan, from, to, query } = this;
    const config: GetMultiDaysStockProps = {
      ticker,
      multiplier,
      timespan,
      from,
      to,
      query,
    };

    this.stocksPromise = polygon.getMultiDaysStockData(config);
  },

  /**
   * @todo
   * @description
   * make chart
   */
  async beforeMount() {
    const { results, resultsCount } = await this.stocksPromise;
    this.candles = results;
    this.candlesCount = resultsCount;
    this.onReady = true;
  },
});
</script>

<style lang="scss"></style>
