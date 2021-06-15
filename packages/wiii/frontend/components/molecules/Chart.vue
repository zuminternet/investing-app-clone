<template>
  <canvas ref="canvas" class="area"></canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, createNamespacedHelpers } from 'vuex';
import EsService from '@/services/chart/eventSource';
import { TimespanEnum } from '@/type/apis';
import { CanvasOptionEnum, MAColorEnum } from '@/type/chart';
import { drawBasicCandleChart } from '@/utils/chart';
import withTime from '@/utils/timer';

import { GetHistoricalOptions } from '../../../domain/apiOptions';
import { getDateString, times } from '../../../domain/date';
import { StoreNames } from '@/store';

const { mapGetters, mapActions } = createNamespacedHelpers(StoreNames.Market);

/**
 * @description
 * Chart wrapper
 */
export default Vue.extend({
  name: 'Chart',

  props: {
    chartType: {
      type: String,
      default: 'candle',
    },
    apiType: {
      type: String,
      default: `static`,
    },
    width: {
      type: Number,
      default: 880,
    },
    typeName: {
      type: String,
      required: true,
      default: 'stock',
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
          limit: 1000,
          offset: 0,
        }),
    },
    /** 이동평균선 기본 세팅 5-20-60-120 */
    smaConfigs: {
      type: Array,
      default: () => [
        {
          duration: 5,
          color: MAColorEnum.red500,
          width: 10,
        },
        {
          duration: 9,
          color: MAColorEnum.grey500,
          width: 10,
        },
        {
          duration: 20,
          color: MAColorEnum.blue500,
          width: 15,
        },
        {
          duration: 60,
          color: MAColorEnum.green500,
          width: 15,
        },
        {
          duration: 120,
          color: `black`,
          width: 20,
        },
      ],
    },
  },

  /**
   * 차트 데이터 저장
   */
  data() {
    return {
      ctx: null,
      histData: {},
      cachedChart: {},
    };
  },

  computed: {
    ...mapState(['ticker']),
    ...mapGetters(['hasStockData']),

    queryString(): GetHistoricalOptions {
      const {
        typeName,
        ticker,
        exchange,
        from,
        to,
        multiplier,
        timespan,
        query: { sort, limit, offset },
      } = this;

      /** @todo type에 따라 property 다른 부분 처리, 일단 국내주식(MarketStack)에 맞춰서 */
      return {
        type: typeName,
        ticker,
        exchange,
        dateFrom: from,
        dateTo: to,
        interval: `${multiplier}${timespan}`,
        sort,
        limit,
        offset,
      };
    },
  } /** end of computed */,

  async mounted() {
    const chart = this.$refs.canvas as HTMLCanvasElement;
    this.ctx = chart.getContext(CanvasOptionEnum.context2d);
    if (this.apiType === `es`) withTime(this.es ? null : this.getES(), `Vue-Chart: API -> Draw`);
    else {
      await this.getStatic();
      this.getChart();
    }
  },

  methods: {
    ...mapActions(['getTodayMiniStocks']),
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

        this.es = new EsService(this.queryString, dataCarrier);
      } catch (e) {
        console.error(e);
      }
    },

    async getStatic() {
      try {
        const data = await this.getTodayMiniStocks(this.ticker);
        console.log({ data });
        this.histData.data = data;
      } catch (e) {
        console.error(e);
      }
    },

    getChart() {
      /**
       * @todo
       * @see
       * MarketStack-KRX에서 가져오는 데이터
       * {  results: adjusted, count, payload: { total } }
       */
      const {
        ctx,
        histData: {
          data: {
            results,
            count,
            payload: { total },
          },
        },
        query: { limit },
        smaConfigs,
      } = this;

      /** @todo 예외처리 */
      if (!count) return;

      /** Chart Caching */
      withTime(
        drawBasicCandleChart,
        `drawBasicCandleChart`,
      )({
        ctx,
        results,
        count,
        payload: {
          total,
          customNumToShow: limit,
          smaConfigs,
          width: this.width,
          hasAxis: true,
          hasVolumes: true,
          hasPrices: true,
        },
      });

      /** chart base64 로 캐싱하는 내용 삭제 */
    },
  },
});
</script>

<style lang="scss" scoped>
canvas {
  background-color: white;

  &.dark {
    box-shadow: 0 0 20px 5px $neon-crimson;
  }
}
</style>
