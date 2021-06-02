/**
 * @description 보조지표 helpers
 */
import { SMAOptions, RefinedCandle } from '@/type/chart';
import { drawLine } from '@/utils/chart/drawers';

import { range } from '../../../domain/utilFunc';

/**
 * getAvg
 * @description
 * duration에 따른 이동평균 산출
 * @param data 조정된 가격 배열
 * @param start 구간 시작
 * @param duration 구간 길이
 * @returns 구간 이동평균
 */
const getAvg = (data: RefinedCandle[], start: number, duration: number) =>
  data.slice(start, start + duration).reduce((acc, { closeY }) => acc + closeY, 0) / duration;

/**
 * setSMA(ctx, data, {duration, color})
 */
export const setSMA = (ctx: CanvasRenderingContext2D, data: RefinedCandle[], { duration, color, width }: SMAOptions) => {
  /** 가장 오래된 기간은 제외 */
  const length = data.length - duration;
  if (duration > length) return;

  ctx.strokeStyle = color;

  let curAvg = getAvg(data, 0, duration);
  for (const i of range(0, length)) {
    const { centerX: curX } = data[i];
    const { centerX: prevX } = data[i + 1];
    const prevAvg = getAvg(data, i, duration);

    drawLine(ctx, { beginX: curX, beginY: curAvg, lastX: prevX, lastY: prevAvg }, { color, lineWidth: width });

    curAvg = prevAvg;
  }
};
