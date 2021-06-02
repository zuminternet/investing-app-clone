import { DrawCandleChartOptions } from '@/type/chart';
import { drawCandle } from '@/utils/chart/drawers';
import { initCanvas } from '@/utils/chart/init';
import { setSMA } from '@/utils/chart/sma';

import { range } from '../../../domain/utilFunc';
import { getHeightRatio, refiner, setDayPartition, setPricePartition } from './position';

/**
 * drawBasicCandleChart
 * @param DrawCandleChartOptions
 * - `{ results: { open, close, adj_close, high, low, volume, date }, count, payload: { total } }`
 * - @see `../../../backend/chart/KRX.ts`
 * @returns base64 문자열
 */
export const drawBasicCandleChart = ({
  ctx,
  results,
  count,
  payload: { total, customNumToShow, smaConfigs },
}: DrawCandleChartOptions): object => {
  const { zeroX, zeroY, ratio, canvasWidth, canvasHeight } = initCanvas(ctx);

  const { ratioH, lowest, highest } = getHeightRatio(results, zeroY);

  /** 캔버스 그리기 쉽게 데이터 전처리 */
  const { data, candleWidth, numToShow } = refiner(results, {
    zeroX,
    zeroY,
    count,
    ratioH,
    lowest,
    range: range(0, count),
    customNumToShow,
  });

  /** 캔들 하나씩 */
  for (const i of range(0, count)) {
    drawCandle(ctx, data[i], candleWidth, ratio);
  }

  /** 이동평균선 옵션 받아서 하나씩 그림 */
  for (const { duration, color, width } of smaConfigs) {
    setSMA(ctx, data, { duration, color, width });
  }

  /** 가격 구분선 */
  setPricePartition(ctx, { highest, lowest, zeroY, ratioH, canvasWidth, canvasHeight });

  /** 일자구분선 */
  setDayPartition(ctx, { data, results, numToShow, count, canvasWidth, canvasHeight, zeroY });

  /**@description base64 이미지로 저장해, caching */
  return { data, image: ctx.canvas.toDataURL('image/png', 1) };
};
