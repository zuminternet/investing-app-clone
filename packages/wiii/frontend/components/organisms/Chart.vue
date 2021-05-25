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
import Vue from 'vue';
import polygon from '@/services/chart/polygon';
import { TimespanEnum, GetMultiDaysStockProps } from '@/type/apis';
import { getDateString } from '@/utils/date';

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
   * make chart
   */
  mounted() {
    // const { ticker, multiplier, timespan, from, to, query } = this;
    // const config = {
    //   ticker,
    //   multiplier,
    //   timespan,
    //   from,
    //   to,
    //   query,
    // } as GetMultiDaysStockProps;

    // this.stocksPromise = polygon.getMultiDaysStockData(config);
    // const { results, resultsCount } = this.stocksPromise;
    // this.candles = results;
    // this.candlesCount = resultsCount;
    // this.onReady = true;
    const chart = this.$refs.canvas;
    const ctx = chart.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 100, 100);
  },
});
</script>
