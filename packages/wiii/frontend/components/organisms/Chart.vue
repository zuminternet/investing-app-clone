<template>
  <section class="area">
    <p>
      <b>{{ typeName.toUpperCase() }}</b
      >: {{ ticker }}
    </p>
    <canvas ref="canvas" class="area"></canvas>
  </section>
</template>

<script lang="ts">
/**
 * @description
 * Chart wrapper
 */
import polygon from '@/services/chart/polygon';
import { GetMultiDaysStockProps, TimespanEnum } from '@/type/apis';
import { drawBasicCandleChart } from '@/utils/chart/candle';
import { getDateString } from '@/utils/date';
import Vue from 'vue';

export default Vue.extend({
  /**
   * @todo
   * 다듬으면서 default는 삭제 예정
   */
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
       * 기본 limit 120일 데이터 요청하지만, 휴장일 데이터 제외하고 가져오므로 넉넉하게 200일 요청
       * @todo
       * 좀더 빠르게 일자 계산할 수 있는 방법?
       */
      default: getDateString(Date.now() - 400 * 3600 * 24 * 1000),
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
          sort: 'asc',
          limit: 300,
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
   * make chart
   */
  mounted() {
    /**
     * @todo
     * - Canvas 자체를 상하반전 시킬 수 있는 방법,,
     */
    const chart = this.$refs.canvas;
    const ctx = chart.getContext('2d') as CanvasRenderingContext2D;

    const { ticker, multiplier, timespan, from, to, query } = this;
    const config = {
      ticker,
      multiplier,
      timespan,
      from,
      to,
      query,
    } as GetMultiDaysStockProps;

    /**
     * 동일 요청에 대한 caching
     * - 1분 단위
     */
    const limit = query.limit;
    const storageKey = `${ticker}-${multiplier}${timespan}-${limit}-${new Date(Date.now()).getMinutes()}`;
    const cached = sessionStorage.getItem(storageKey);

    if (cached) {
      this.onReady = true;
      console.info(`using cached data`);
      const { results, limit, resultsCount } = JSON.parse(cached);
      drawBasicCandleChart({ ctx, results, limit, resultsCount });
      return;
    }

    polygon
      .getMultiDaysStockData(config)
      .then(({ results, resultsCount }) => {
        console.info(`data fetched`);

        this.onReady = true;

        drawBasicCandleChart({ ctx, results, limit, resultsCount });

        return { results, resultsCount, limit };
      })
      .then((data) => {
        sessionStorage.setItem(storageKey, JSON.stringify(data));
      });
  },
});
</script>

<style lang="scss" scoped>
canvas {
  padding: 15px;
  box-shadow: 0 0 20px 5px $red-neon;
}
</style>
