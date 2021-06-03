import { CandleColorEnum, DrawLineOptions, DrawLinePaths, DrawTextOptions, DrawTextRequired, RefinedCandle } from '@/type/chart';
import { sunnyYellow, grey900 } from '@/styles/index.scss';

/** @todo Vuex에서 is다크모드 getter로 가져오기  */
const isDark = true;
const baseFontStyle = isDark ? `${sunnyYellow}` : `${grey900}`;

/** @description ctx.rotate() 사용시 필요 */
const { PI } = Math;
const BASE_RADIAN = PI / 180;

export const drawText = (
  ctx: CanvasRenderingContext2D,
  { text, centerX, centerY, ratio }: DrawTextRequired,
  { fontFamily, fontSize, textBaseline, textAlign, /** @todo 쓰기 애매해서 뺄수도 */ textWidth }: DrawTextOptions,
) => {
  ctx.save();
  ctx.strokeStyle = baseFontStyle;
  ctx.fillStyle = baseFontStyle;
  ctx.textBaseline = textBaseline ?? 'bottom';
  ctx.font = `${fontSize ?? `25px/30`}px ${fontFamily ?? `sans-serif`}`;
  ctx.textAlign = textAlign ?? 'right';
  ctx.fillText(text, centerX, centerY);
  ctx.strokeText(text, centerX, centerY);
  ctx.scale(ratio, ratio);
  ctx.restore();
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  { beginX, beginY, lastX, lastY }: DrawLinePaths,
  { ratio, color, lineWidth }: DrawLineOptions,
) => {
  ctx.save();
  ctx.strokeStyle = color || CandleColorEnum.grey900;
  ctx.lineWidth = lineWidth || 1;
  ctx.beginPath();
  ctx.moveTo(beginX, beginY);
  ctx.lineTo(lastX, lastY);
  ctx.closePath();
  ctx.stroke();
  ctx.scale(ratio, ratio);
  ctx.restore();
};

export const drawCandle = (
  ctx: CanvasRenderingContext2D,
  { startX, centerX, openY, highY, lowY, rectH, color }: RefinedCandle,
  /** @todo Options 객체 interface */
  candleWidth: number,
  ratio: number,
) => {
  ctx.save();

  /** 캔들 꼬리 */
  drawLine(ctx, { beginX: centerX, beginY: highY, lastX: centerX, lastY: lowY }, { ratio, color });

  /** 캔들 몸통 */
  if (rectH === 0) {
    drawLine(ctx, { beginX: startX, beginY: openY, lastX: startX + candleWidth, lastY: openY }, { ratio });
  } else {
    ctx.fillStyle = color;
    ctx.fillRect(startX, openY, candleWidth, rectH);
  }

  ctx.scale(ratio, ratio);
  ctx.restore();
};

export const drawVolume = (ctx: CanvasRenderingContext2D, { startX, volume, base, candleWidth, ratio, color }) => {
  ctx.save();
  ctx.fillStyle = color;
  const height = volume * ratio;
  ctx.fillRect(startX, base - height, candleWidth, height);

  ctx.restore();
};
