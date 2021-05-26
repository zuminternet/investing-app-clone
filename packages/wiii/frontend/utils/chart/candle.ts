import { BasicCandleOptionProps, CandleColorEnum, DrawCandleChartOptions } from '@/type/chart';

const setColor = (o: number, c: number) => {
  if (o === c) return CandleColorEnum.same;
  if (o > c) return CandleColorEnum.down;
  if (o < c) return CandleColorEnum.up;
};

const BASE_RADIAN = Math.PI / 180;

const basicCandle = ({
  ctx,
  x,
  y,
  high,
  low,
  open,
  close,
  width,
  height,
  timestamp,
  highest,
  lowest,
  canvasWidth,
  canvasHeight,
  hRatio,
}: BasicCandleOptionProps) => {
  const color = setColor(open, close);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.save();
  ctx.translate(0, canvasHeight);

  ctx.strokeText('기준', 0, 0);
  /**
   * @todo
   * 비율 맞추기
   * - canvasHeight에 따라 ratio 변화되어야 함
   */
  ctx.fillRect(x, (-y - height + lowest * 0.8) * hRatio, width, height * hRatio);

  const lineCenter = x + width / 2;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(lineCenter, (+lowest * 0.8 - low) * hRatio);
  ctx.lineTo(lineCenter, (lowest * 0.8 - high) * hRatio);
  ctx.closePath();
  ctx.stroke();

  /**
   * @todo
   * 일자
   */
  // ctx.textAlign = 'center';
  // ctx.fillText(String(timestamp), x, -30);
  ctx.restore();
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
  console.warn(timerLabel);
  console.time(timerLabel);

  /**
   * @todo
   * 캔버스 dpi 강제로 높이기
   * 변수화 필요..
   */
  const canvasWidth = (ctx.canvas.width = 1200);
  const canvasHeight = (ctx.canvas.height = 600);
  ctx.canvas.style.width = `${canvasWidth / 2}px`;
  ctx.canvas.style.height = `${canvasHeight / 2}px`;

  let highest = 0,
    lowest = Number.MAX_SAFE_INTEGER;

  for (const { h, l } of results) {
    if (highest < h) highest = h;
    if (lowest > l) lowest = l;
  }

  const numToShow = Math.min(resultsCount, limit);
  // const numToShow = 50;
  const w = canvasWidth / numToShow;
  const hRatio = canvasHeight / (highest - lowest);

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
      height: Math.abs(close - open),
      timestamp: new Date(timestamp).getDate(),
      canvasWidth,
      canvasHeight,
      highest,
      lowest,
      hRatio,
    });
  }

  /**
   * @todo
   * - base64로 store 저장, caching
   */
  // ctx.canvas.toDataURL('image/png', 1);
  console.timeEnd(timerLabel);
};
