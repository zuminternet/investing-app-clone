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
import { drawBasicCandleChart } from '../../utils/chart/candle';

/**
 * @description
 * Chart wrapper
 */
export default Vue.extend({
  props: {
    typeName: {
      type: String,
      required: true,
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
      histData: {},
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

  methods: {
    /**
     * proxy observer 생성
     * @description
     * ES Class 내부 onMessage에서 변경된 값을 밖으로 push 하기 위함
     * - 단순 객체 넘길 경우, 메모리 주소값이 그대로여서인지 vue-watch로는 적용안됨
     */
    getES() {
      try {
        const $ = this;
        const dataCarrier = new Proxy(this.histData, {
          /** data 값만 변경가능하도록 */
          set(target, key, value) {
            if (key !== `data`) return;
            target.data = value;
            $.getChart();
            return true;
          },
        });

        new EsService(this.queryString, dataCarrier);
      } catch (e) {
        console.error(e);
      }
    },
    getChart() {
      console.info(`[Chart] Start to create a Chart`);
      console.assert(this.ctx);
      console.table(this.histData.data);
      /**  @todo */
      // drawBasicCandleChart({
      //   ctx: this.ctx,
      //   results: this.histData.data,
      //   resultsCount: this.histData.data.length,
      //   limit: this.limit,
      // });
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
