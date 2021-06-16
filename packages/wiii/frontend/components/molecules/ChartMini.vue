<template>
  <canvas width="150px" ref="canvas" class="area"></canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

import { StoreNames } from '@/store';
import { TimespanEnum } from '@/type/apis';
import { CanvasOptionEnum } from '@/type/chart';
import { drawBasicCandleChart } from '@/utils/chart';
import withTime from '@/utils/timer';

import { getDateString, WEEK_ONE } from '../../../domain/date';
import { reda400 } from '@/styles/index.scss';

const { mapGetters, mapActions } = createNamespacedHelpers(StoreNames.Market);

/**
 * @description
 * 리스트용 썸네일 차트 데이터
 */
export default Vue.extend({
  name: 'ChartMini',

  props: {
    typeName: {
      type: String,
      required: true,
      default: 'stock',
    },
    ticker: {
      type: String,
      required: true,
    },
  },

  /**
   * - 대부분 고정 값
   * - typeName, ticker 정도만 props로 내려받으면 됨
   */
  data() {
    return {
      ctx: null,
      multiplier: 1,
      timespan: TimespanEnum.day,
      from: getDateString(Date.now() - WEEK_ONE * 2),
      to: getDateString(Date.now()),
      sort: 'desc',
      limit: 15,
      offset: 0,
      smaConfigs: [
        {
          duration: 3,
          color: reda400,
          width: 5,
        },
      ],
    };
  },

  computed: {
    ...mapGetters(['hasStockData']),
  } /** end of computed */,

  async mounted() {
    const chart = this.$refs.canvas as HTMLCanvasElement;
    this.ctx = chart.getContext(CanvasOptionEnum.context2d);
    this.chartData = await this.getTodayMiniStocks(this.ticker);
    this.getChart(this.chartData);
  },

  methods: {
    ...mapActions(['getTodayMiniStocks']),

    getChart({ results, count }) {
      /** @todo 예외처리 */
      if (!count) {
        return;
      }

      const { ctx, limit, smaConfigs } = this;

      withTime(
        drawBasicCandleChart,
        `drawBasicCandleChart`,
      )({
        ctx,
        results: results.slice(0, limit),
        count: limit,
        payload: { customNumToShow: limit, smaConfigs, width: 150 },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
canvas {
  border-radius: 7px;
  background-color: white;
  box-shadow: 0 0 2px 0 $grey-700;

  &.dark {
    box-shadow: 0 0 20px 5px $neon-crimson;
  }
}
</style>
