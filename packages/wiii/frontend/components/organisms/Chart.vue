<template>
  <canvas ref="canvas" class="area"></canvas>
</template>

<script lang="ts">
import EsService from '@/services/chart/eventSource';
import { TimespanEnum } from '@/type/apis';
import { CanvasOptionEnum } from '@/type/chart';
import Vue from 'vue';
import { GetHistoricalOptions } from '../../../domain/apiOptions';
import { getDateString, times } from '../../../domain/date';

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
          limit: 500,
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
      histData: null,
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
  } /** end of computed */,

  mounted() {
    const chart = this.$refs.canvas as HTMLCanvasElement;
    this.ctx = chart.getContext(CanvasOptionEnum.context2d);
    this.getES();
  },

  watch: {
    /** ES 호출 -> histData 변경 -> getChart */
    histData: `getChart`,
  },

  methods: {
    getES() {
      try {
        const es = new EsService(this.queryString);
        this.histData = es.data;
        console.info(`[Chart] Success to get data; ${this.histData?.data?.length} `);
      } catch (e) {
        console.error(e);
      }
    },
    /**
     * @todo
     */
    getChart() {
      console.info(`[Chart] Start to create a Chart`);
      console.assert(this.ctx);
    },
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
