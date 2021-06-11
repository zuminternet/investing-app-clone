import { DrawCandleChartOptions, CandleColorEnum } from '@/type/chart';
import { drawCandle, drawLine, drawVolume } from '@/utils/chart/drawers';
import { initCanvas } from '@/utils/chart/init';
import { setSMA } from '@/utils/chart/sma';

import { range } from '../../../domain/utilFunc';
import { getHeightRatio, getVolumeHeightRatio, refiner, setDayPartition, setPricePartition } from './position';

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
  payload: { total, customNumToShow, smaConfigs, width },
}: DrawCandleChartOptions): object => {
  const { zeroX, zeroY, ratio, canvasWidth, canvasHeight } = initCanvas(ctx, { width });
  if (!zeroX || !zeroY || !ratio || !canvasWidth || !canvasHeight) return;

  /** 거래량 차트 세로 길이:  가격/일자 구분선 제외한 차트 세로 길이의 5분의 1 */
  const volumeH = zeroY * 0.8;

  const { ratioH, lowest, highest } = getHeightRatio(results, volumeH);

  /** 캔버스 그리기 쉽게 데이터 전처리 */
  const { data, candleWidth, numToShow } = refiner(results, {
    zeroX,
    /** 가격차트 영점 기준을 거래량 차트 상단으로 조정 */
    zeroY: volumeH,
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

  const { volumeRatioH, highest: volumeHigh, lowest: volumeLow } = getVolumeHeightRatio(results, zeroY * 0.2);

  for (const i of range(0, count)) {
    const { startX, color } = data[i];
    const { volume } = results[i];
    drawVolume(ctx, {
      startX,
      volume,
      base: zeroY,
      candleWidth,
      ratio: volumeRatioH,
      color,
    });
  }

  /** 이동평균선 옵션 받아서 하나씩 그림 */
  for (const { duration, color, width } of smaConfigs) {
    setSMA(ctx, data, { ratio, duration, color, width });
  }

  /** 가격 구분선 */
  setPricePartition(ctx, { highest, lowest, zeroY: volumeH, ratioH, canvasWidth, canvasHeight, ratio });

  /** 거래량  구분선 */
  setPricePartition(ctx, {
    highest: volumeHigh,
    lowest: volumeLow,
    zeroY,
    ratioH: volumeRatioH,
    canvasWidth,
    canvasHeight,
    ratio,
    partNum: 2,
    textBaseline: 'top',
    fontSize: 20,
  });

  /** 일자구분선 */
  setDayPartition(ctx, { data, results, numToShow, count, canvasWidth, canvasHeight, zeroY, ratio });

  drawLine(
    ctx,
    { beginX: 0, beginY: volumeH, lastX: canvasWidth, lastY: volumeH },
    { color: CandleColorEnum.partition, lineWidth: 10, ratio },
  );

  drawLine(
    ctx,
    { beginX: 0, beginY: zeroY, lastX: canvasWidth, lastY: zeroY },
    { color: CandleColorEnum.partition, lineWidth: 10, ratio },
  );

  /**@description base64 이미지로 저장해, caching */
  // return { data, image: ctx.canvas.toDataURL('image/png', 1) };
};
