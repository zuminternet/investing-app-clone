import timer from '@/utils/timer';
import { BasicCandleOptionProps, CandleColorEnum, CanvasOptionEnum, DrawCandleChartOptions, MAColorEnum } from '@/type/chart';
import { setSMA } from '@/utils/chart/sma';

import { CandleData, ClientWH, RefinedCandle, RefinedCandleData, refinerOptions } from '../../../domain/marketData';
import { devPrint, _range } from '../../../domain/utilFunc';

const { PI, floor, min } = Math;
const { MAX_SAFE_INTEGER } = Number;

/** @description ctx.rotate() 사용시 필요 */
const BASE_RADIAN = PI / 180;

/**
 * @description
 * - resizing, 캔버스 DPI 높이기 위함, retina display 지원
 * - 가로 16: 세로 9
 * - default options; overflow
 * @see https://developer.mozilla.org/ko/docs/Web/API/Window/devicePixelRatio#correcting_resolution_in_a_%3Ccanvas%3E
 * @return resizing에 필요한 width, height === clientWidth, clientHeight
 */
const initCanvas = (ctx: CanvasRenderingContext2D): ClientWH => {
  const ratio = window.devicePixelRatio;
  const cvs = ctx.canvas;
  const size = cvs.clientWidth;

  cvs.style.width = `${size}px`;
  cvs.style.height = `${(size * 9) / 16}px`;

  const canvasWidth = (cvs.width = size * ratio);
  const canvasHeight = (cvs.height = (canvasWidth * 9) / 16);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.scale(ratio, ratio);

  return {
    ratio,
    canvasWidth,
    canvasHeight,
  };
};

/**
 * adjustedY 세로y 위치 조정 함수, 구간 최저가 기준
 * @param base 구간 최저가 또는 최하단 라인
 * @param hRatio 높이 비율
 * @param origins ex. `[open, close, low, high]`
 * @returns rest 순서대로 조정된 높이값 배열
 */
// const adjustY = (base: number, hRatio: number, origins: number[]): number[] => origins.map((n) => (-n + base) * hRatio);

/**
 * setColor
 * @todo 나중에 사용자가 customizing할 수 잇도록?
 * @param o open
 * @param c close
 * @returns colorString
 */
const setColor = (o: number, c: number) => {
  if (o === c) return CandleColorEnum.same;
  if (o > c) return CandleColorEnum.down;
  if (o < c) return CandleColorEnum.up;
};

/**
 *
 * 높이 조정 비율 구하기
 * - 전체 높이에서 상하 패딩 빼고 가격구간 비율 구함
 */
const getHeightRatio = (data: CandleData, canvasHeight: number): { ratioH: number; highest: number; lowest: number } => {
  let [highest, lowest] = [0, MAX_SAFE_INTEGER];

  for (const { high, low } of data) {
    if (high > highest) highest = high;
    if (low < lowest) lowest = low;
  }

  return { ratioH: canvasHeight / (highest - lowest), highest, lowest };
};

/**
 * refiner
 * @description
 * API 원본 데이터 전처리 함수
 * - 차트 그리기 편하게 가로, 세로 위치 조정
 * - 캔들 그리는데 필요한 정보만 생성하고,
 * - 거래량, 날짜, hover 이벤트시 넘겨줄 데이터는 원본 데이터에서 index로 찾는다
 * @param _data ES에서 넘어온 원본 데이터 배열, Array<{open, close, adj_close, high, low, volume, date}>
 * @param opions
 * @returns 전처리된 데이터 배열, Array<{startX, centerX, openY, closeY, highY, lowY}>
 */
const refiner = (
  _data: CandleData,
  { canvasWidth, canvasHeight, count, range, customNumToShow }: refinerOptions,
): RefinedCandleData => {
  /** 화면에 보여질 캔들 갯수 */
  const numToShow = customNumToShow > count ? count : customNumToShow;

  /** 캔들 몸통 너비 */
  const candleWidth = canvasWidth / numToShow;
  const candleHalf = candleWidth / 2;
  /** 캔들 좌우 패딩 */
  const candlePad = candleWidth * 0.1;

  const { ratioH, lowest } = getHeightRatio(_data, canvasHeight);

  const data = Array.from({ length: count });

  /** @todo 반복문 최적화? */
  for (const i of range) {
    const { open, close, low, high } = _data[i];

    const candleX = candleWidth * (i + 1);
    const startX = canvasWidth - candleX + candlePad;

    const highY = canvasHeight + (lowest - high) * ratioH;
    const rectH = (open - close) * ratioH;

    data[i] = {
      color: setColor(open, close),
      startX,
      centerX: startX + candleHalf,
      openY: canvasHeight + (lowest - open) * ratioH,
      highY,
      rectH,
      lowY: canvasHeight + (lowest - low) * ratioH,
    } as RefinedCandle;
  }
  return { data, candleWidth: candleWidth - candlePad * 2 } as RefinedCandleData;
};

/**
 * @deprecated
 * setPricePartition
 * 좌상단 (0,0)에서 시작
 *
 * @param ctx CanvasContext
 * @param partitionNum 가격 구분 개수
 * @param hRatio 비율 조정
 * @param hRange 가격구간 높이
 * @param canvasWidth 캔버스 너비
 * @param canvasHeight 캔버스 높이
 * @param lowest 구간 최저가
 */
// const setPricePartition = (
//   ctx: CanvasRenderingContext2D,
//   hRatio?: number,
//   partitionNum?: number,
//   hRange?: number,
//   canvasWidth?: number,
//   canvasHeight?: number,
//   lowest?: number,
// ) => {
//   ctx.save();
//   const ratio = hRange / partitionNum;
//   ctx.lineWidth = 1;
//   ctx.strokeStyle = CandleColorEnum.partition;
//   ctx.fillStyle = CandleColorEnum.grey900;
//   ctx.font = `italic 20px sans-serif`;
//   ctx.textAlign = CanvasOptionEnum.textAlignRight;

//   for (let n = partitionNum + 1; n--; ) {
//     /** 구분선 */
//     const curH = -(n * ratio) * hRatio;
//     ctx.beginPath();
//     ctx.moveTo(0, curH);
//     ctx.lineTo(-canvasWidth, curH);
//     ctx.closePath();
//     ctx.stroke();

//     /** 구분선 가격 */
//     ctx.fillText((lowest - curH / hRatio).toFixed(2).toString(), 0, curH);
//   }
//   ctx.restore();
// };

/**
 * @deprecated drawCandles 로 변경 중..
 * 기본 캔들차트 생성
 */
// const basicCandle = ({
//   ctx,
//   idx,
//   high,
//   low,
//   open,
//   close,
//   bodyWidth,
//   timestamp,
//   highest,
//   lowest,
//   clientWidth,
//   clientHeight,
//   hRatio,
// }: BasicCandleOptionProps) => {
/** @description  기본 설정 */
// const color = setColor(open, close);
/** @description text 위치 조정 */
// const dateHeight = 0,
//   textBase = -2,
//   textHRatio = 1;
// const [adjDayH] = adjustY(textBase, textHRatio, [dateHeight]);
/** @description 캔들 위치 조정 */
/** @constant adjX adjusted X, 오른쪽부터 최신순 */
// const adjX = -idx * bodyWidth - 60;
// const [adjOpen, adjClose, adjLow, adjHigh] = adjustY(lowest, /** hRatio */ 1, [open, close, low, high]);
// const bodyHeight = adjClose - adjOpen;
// ctx.save();
// ctx.strokeStyle = color;
// ctx.fillStyle = color;
// ctx.scale(1, hRatio);
/** @description 캔들 몸통 */
// const bodyWidthRatio = 0.8;
// ctx.fillRect(adjX, adjOpen, bodyWidth * bodyWidthRatio, bodyHeight);
/** @description 캔들 꼬리 */
// const candleCenter = adjX + (bodyWidth * bodyWidthRatio) / 2;
// ctx.lineWidth = 2;
// ctx.strokeStyle = color;
// ctx.beginPath();
// ctx.moveTo(candleCenter, adjLow);
// ctx.lineTo(candleCenter, adjHigh);
// ctx.closePath();
// ctx.stroke();
// ctx.restore();
// ctx.save();
/** @description 일자구분선 */
// const dateX = adjX + bodyWidth;
// if (idx % 5 === 0) {
//   ctx.lineWidth = 1;
//   if (idx % 10 === 0 && idx > 0) {
//     ctx.lineWidth = 5;
//     /** @description 일자구분선 월/일 표시 */
//     ctx.textAlign = CanvasOptionEnum.textAlignLeft;
//     ctx.textBaseline = CanvasOptionEnum.textBaseTop;
//     ctx.font = `20px sans-serif`;
//     ctx.fillStyle = CandleColorEnum.grey900;
//     const [curDate, curMonth] = [timestamp.getDate(), timestamp.getMonth()];
//     ctx.fillText(`${(curMonth + 1).toString()} / ${curDate.toString()}`, dateX, adjDayH);
//   }
//   ctx.strokeStyle = CandleColorEnum.partition;
//   ctx.beginPath();
//   ctx.moveTo(dateX, 0);
//   ctx.lineTo(dateX, -canvasHeight);
//   ctx.closePath();
//   ctx.stroke();
// }
// ctx.restore();
// return { adjClose, candleCenter };
// };

const drawCandle = (
  ctx: CanvasRenderingContext2D,
  { startX, centerX, openY, highY, lowY, rectH, color }: RefinedCandle,
  /** @todo Options 객체 interface */
  candleWidth: number,
  ratio: number,
  clientWidth: number,
  clientHeight: number,
) => {
  ctx.save();

  /** 캔들 꼬리 */
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX, highY);
  ctx.lineTo(centerX, lowY);
  ctx.closePath();
  ctx.stroke();

  /** 캔들 몸통 */
  if (rectH === 0) {
    ctx.beginPath();
    ctx.moveTo(startX, openY);
    ctx.lineTo(startX + candleWidth, openY);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.fillRect(startX, openY, candleWidth, rectH);
  }

  ctx.scale(ratio, ratio);
  ctx.restore();
};

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
  payload: { total, customNumToShow },
}: DrawCandleChartOptions): object => {
  const { ratio, canvasWidth, canvasHeight } = initCanvas(ctx);
  const range = () => _range(0, count);

  /** 캔버스 그리기 쉽게 데이터 전처리 */
  const { data, candleWidth } = refiner(results, {
    ratio,
    canvasWidth,
    canvasHeight,
    count,
    range: range(),
    total,
    customNumToShow,
  });

  // /**@todo 가격 구분선 */
  // const partitionNum = 5;
  // setPricePartition(ctx, hRatio, partitionNum, hRange, clientWidth, clientHeight, lowest);

  // ctx.globalCompositeOperation = CanvasOptionEnum.globalCompositeOperation;

  /** 캔들 하나씩 */
  for (const i of range()) {
    drawCandle(ctx, data[i], candleWidth, ratio, canvasWidth, canvasHeight);

    /** @todo only for debugging */
    if (i === count / 2) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(data[i].centerX, 0);
      ctx.lineTo(data[i].centerX, canvasHeight);
      ctx.stroke();
      ctx.restore();
    }
  }

  // /** @todo SMA custom; 컴포넌트에서 옵션 받아서 넘기는 방식으로 */
  // setSMA(ctx, { data: adjCloses, duration: 9, hRatio, color: MAColorEnum.red500 });
  // setSMA(ctx, { data: adjCloses, duration: 20, hRatio, color: MAColorEnum.green500 });
  // setSMA(ctx, { data: adjCloses, duration: 55, hRatio, color: MAColorEnum.blue500 });
  // setSMA(ctx, { data: adjCloses, duration: 112, hRatio, color: MAColorEnum.grey500 });

  /**@description base64 이미지로 저장해, caching */
  return { data, image: ctx.canvas.toDataURL('image/png', 1) };
};

// export default {
//   drawBasicCandleChart: process.env.NODE_ENV === `production` ? timer(drawBasicCandleChart, `Draw Chart`) : drawBasicCandleChart,
// };
