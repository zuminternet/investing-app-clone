/**
 * @description 보조지표 helpers
 */
import { adjustedData, SetSMAOptions } from '@/type/chart';

/**
 * getAvg
 * @description
 * duration에 따른 이동평균 산출
 * @param data 조정된 가격 배열
 * @param start 구간 시작
 * @param duration 구간 길이
 * @returns 구간 이동평균
 */
const getAvg = (data: adjustedData, start: number, duration: number) =>
  data.slice(start, start + duration).reduce((acc, { adjClose }) => acc + adjClose, 0) / duration;

/**
 * setSMA
 * @description
 * 종가 기준 단순 이동평균선 그리기
 * @param ctx CanvasContext
 * @param SMAOptions data 및 이동평균선 옵션
 */
export const setSMA = (ctx: CanvasRenderingContext2D, { data, hRatio, duration, color }: SetSMAOptions) => {
  /** 가장 오래된 기간은 제외 */
  const length = data.length - duration;
  if (duration > length) return;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.scale(1, hRatio);

  let prevAvg = getAvg(data, length, duration);
  /** @description 가장 오래된 캔들부터 계산 */
  for (let i = length; i--; ) {
    const { candleCenter: prevX } = data[i + 1];
    const { candleCenter: curX } = data[i];
    const curAvg = getAvg(data, i, duration);
    ctx.beginPath();
    ctx.moveTo(prevX, prevAvg);
    ctx.lineTo(curX, curAvg);
    prevAvg = curAvg;
    ctx.stroke();
  }
  ctx.restore();
};
