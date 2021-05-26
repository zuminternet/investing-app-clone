import { BasicCandleOptionProps, CandleColorEnum, DrawCandleChartOptions } from '@/type/chart';

const setColor = (o: number, c: number) => {
  if (o === c) return CandleColorEnum.same;
  if (o > c) return CandleColorEnum.down;
  if (o < c) return CandleColorEnum.up;
};

const basicCandle = ({ ctx, x, y, high, low, open, close, width, height }: BasicCandleOptionProps) => {
  /**
   * @todo
   * 비율 맞추기
   */
  const color = setColor(open, close);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);

  const lineCenter = x + width / 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(lineCenter, low);
  ctx.lineTo(lineCenter, high);
  ctx.closePath();
  ctx.stroke();
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
  console.info(timerLabel);
  console.time(timerLabel);

  /**
   * @todo
   * 캔버스 dpi 강제로 높이기
   * 변수화 필요..
   */
  const width = (ctx.canvas.width = 1000);
  const height = (ctx.canvas.height = 600);
  ctx.canvas.style.width = `${width / 2}px`;
  ctx.canvas.style.height = `${height / 2}px`;

  let highest = 0,
    lowest = Number.MAX_SAFE_INTEGER;

  for (const { h, l } of results) {
    if (highest < h) highest = h;
    if (lowest > l) lowest = l;
  }

  // const numToShow = Math.min(resultsCount, limit);
  const numToShow = 50;
  const w = width / numToShow;
  // const hRatio = 600 / (highest - lowest);

  for (let i = 0, cnt = numToShow; cnt--; ) {
    const { close, low, open, high, timestamp } = results[i++];
    basicCandle({
      ctx,
      x: i * w + 1,
      y: open,
      open,
      close,
      low,
      high,
      width: w * 0.8,
      height: high - low,
      timestamp: timestamp.toLocaleString(),
    });
  }

  /**
   * @todo
   * - base64로 store 저장, caching
   */
  // ctx.canvas.toDataURL('image/png', 1);
  console.timeEnd(timerLabel);
};
