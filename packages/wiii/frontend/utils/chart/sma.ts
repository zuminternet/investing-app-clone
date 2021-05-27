/**
 * @description 보조지표 helpers
 */

import { SetSMAOptions } from '@/type/chart';

/**
 *
 * @description
 * 종가 기준 단순 이동평균선 그리기
 *
 */
export const setSMA = (ctx: CanvasRenderingContext2D, { data, hRatio, duration, color }: SetSMAOptions) => {
  /** 가장 오래된 기간은 제외 */
  const length = data.length - duration;
  if (duration > length) return;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.scale(1, hRatio);

  const getAvg = (start: number) =>
    data.slice(start, start + duration).reduce((acc, { adjClose }) => acc + adjClose, 0) / duration;

  let prevM = getAvg(length);

  /** @description 가장 오래된 캔들부터 계산 */
  for (let i = length; i--; ) {
    const { candleCenter: prevX } = data[i + 1];
    const { candleCenter: curX } = data[i];
    const m = getAvg(i);
    ctx.beginPath();
    ctx.moveTo(prevX, prevM);
    ctx.lineTo(curX, m);
    prevM = m;
    ctx.stroke();
  }
  ctx.restore();
};
