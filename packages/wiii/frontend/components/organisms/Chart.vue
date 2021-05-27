<template>
  <canvas ref="canvas" class="area"></canvas>
</template>

<script lang="ts">
/**
 * @description
 * Chart wrapper
 */
import { ChartModuleMapperEnums } from '@/store/types';
import { TimespanEnum } from '@/type/apis';
import { MultidaysStockData } from '@/type/chart';
import { drawBasicCandleChart } from '@/utils/chart/candle';
import { getDateString } from '@/utils/date';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  props: {
    typeName: {
      type: String,
      default: 'stock',
    },
    ticker: {
      type: String,
      default: 'SPCE',
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
       * 휴장일 데이터 제외하고 가져오므로
       * 기본 limit 보다 넉넉하게 요청
       */
      default: getDateString(Date.now() - 500 * 3600 * 24 * 1000),
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
        query: this.query,
      },
    };
  },

  computed: {
    ...mapGetters([ChartModuleMapperEnums.getterCheckStockLoaded]),
  },

  /**
   * @todo
   * @description
   * API fetching
   * make chart
   */
  async mounted() {
    const chart = this.$refs.canvas;
    this.ctx = chart.getContext('2d') as CanvasRenderingContext2D;

    /**@todo console 삭제 */
    const timerLabel = `api-chart timer`;
    console.warn(timerLabel);
    console.time(timerLabel);
    try {
      await this.getStockData(this.options);
      this.getChart(this.options);
    } catch (e) {
      console.error(e);
    }
    console.timeEnd(timerLabel);
  },

  /**
   * @todo
   * SSR creat chart
   */
  // serverPrefetch() {
  //   const { getStockData } = getModule(Chart);
  //   const options = this.$props.options;
  //   return getStockData(options).then(/** @todo */);
  // },

  /**
   * @todo
   *
   * Component에서 비동기 작업은 SSR build 과정에서 계속 에러
   * 일반적인 example 따라서 Vuex store로 이동..
   * 했는데 그래도 에러...
   * 일단은 CSR 위주로 작업하고
   * 추후 Backend에서 데이터 넘겨주는 방식으로 변경 예정
   */
  methods: {
    ...mapActions([ChartModuleMapperEnums.actionGetStockData]),
    getChart(options) {
      const { results, resultsCount, dataKey } = this[ChartModuleMapperEnums.getterCheckStockLoaded] as MultidaysStockData;
      drawBasicCandleChart({ ctx: this.ctx, limit: options.query.limit, results, resultsCount });
      this.onReady = true;
    },
  },
});
</script>

<style lang="scss" scoped>
canvas {
  width: 600px;
  height: 300px;
  padding: 15px;
  box-shadow: 0 0 20px 5px $red-neon;
}
</style>
