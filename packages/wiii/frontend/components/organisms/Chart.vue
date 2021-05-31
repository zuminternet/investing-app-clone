<template>
  <canvas ref="canvas" class="area"></canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import { GetHistoricalOptions } from '../../../domain/apiOptions';
import { getDateString, times } from '../../../domain/date';
import EsService from '@/services/chart/eventSource';
import { TimespanEnum } from '@/type/apis';

/**
 * @description
 * Chart wrapper
 */
export default Vue.extend({
  props: {
    typeName: {
      type: String,
      default: 'stock',
    },
    ticker: {
      type: String,
      default: '005930' /** MarketStack 국내주식 모드, 삼성전자 */,
    },
    multiplier: {
      type: Number,
      default: 1 /** MarketStack => default 1hour => 24hour로  */,
    },
    timespan: {
      type: String,
      default: TimespanEnum.day,
    },
    from: {
      type: [String, Date],
      default: getDateString(Date.now() - times.year2),
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
          limit: 200,
        }),
    },
  },

  /**
   * 차트 데이터 저장
   */
  data() {
    return {
      onReady: false,
      ctx: null,
      options: {
        ticker: this.ticker,
        multiplier: this.multiplier,
        timespan: this.timespan,
        from: this.from,
        to: this.to,
      },
    };
  },

  computed: {
    queryString(): GetHistoricalOptions {
      const { sort, limit } = this.options;

      /** @todo type에 따라 property 다른 부분 처리, 일단 국내주식(MarketStack)에 맞춰서 */
      return {
        type: this.typeName,
        ticker: this.ticker,
        exchange: this.exchange,
        dateFrom: this.from,
        dateTo: this.to,
        interval: `${this.multiplier}${this.timespan}`,
        sort,
        limit,
        offset: this.offset,
      };
    },
  },

  /**
   * @todo
   * @description
   * API fetching
   * make chart
   */
  mounted() {
    const chart = this.$refs.canvas;

    /**@todo console 삭제 */
    const timerLabel = `api-chart timer`;
    console.warn(timerLabel);
    console.time(timerLabel);

    try {
      const es = new EsService(chart, this.queryString);
      es.createChart();
    } catch (e) {
      console.error(e);
    }

    console.timeEnd(timerLabel);
  },
});
</script>

<style lang="scss" scoped>
canvas {
  width: 600px;
  height: 300px;
  padding: 15px;
  margin: 20px;
  box-shadow: 0 0 20px 5px $red-neon;
  background-color: white;
}
</style>
