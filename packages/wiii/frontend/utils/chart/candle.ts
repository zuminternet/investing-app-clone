import { IAggV2Formatted } from '@polygon.io/client-js/lib/rest/stocks/aggregates';

interface BasicCandleOptionProps {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  o: number;
  c: number;
  l: number;
  h: number;
  w: number;
  height: number;
}

export interface DrawCandleChartOptions {
  ctx: CanvasRenderingContext2D;
  results: IAggV2Formatted[];
  resultsCount: number;
  limit: number;
}

export enum CandleColorEnum {
  up = 'red',
  down = 'blue',
  same = 'black',
}

const setColor = (o: number, c: number) => {
  if (o === c) return CandleColorEnum.same;
  if (o > c) return CandleColorEnum.down;
  if (o < c) return CandleColorEnum.up;
};

const basicCandle = ({ x, y, w, h, l, o, c, height, ctx }: BasicCandleOptionProps) => {
  ctx.fillStyle = setColor(o, c);
  ctx.fillRect(x, y, w, height);
};

/**
 * @todo
 * - width: 캔들 1개 너비 = 전체 canvas width / 캔들 갯수
 * - x: width * index
 * - y: ??
 * - height: ??
 */
export const drawBasicCandleChart = ({ ctx, results, resultsCount, limit }: DrawCandleChartOptions) => {
  const timerLabel = `draw Chart`;
  console.log(timerLabel);
  console.time(timerLabel);

  let highest = 0,
    lowest = Number.MAX_SAFE_INTEGER;

  for (const { h, l } of results) {
    if (highest < h) highest = h;
    if (lowest > l) lowest = l;
  }

  const numToShow = Math.min(resultsCount, limit);
  const w = 300 / numToShow;
  const hRatio = 600 / (highest - lowest);

  // ctx.save();
  for (let i = numToShow; i--; ) {
    const { c, l, o, h } = results[i];
    basicCandle({ ctx, x: i * w + 1, y: o, c, l, o, h, w: w * 0.8, height: h - l });
    // ctx.restore();
  }

  console.timeEnd(timerLabel);
};
