/**
 * @module
 * 위치 조정 관련 함수 모음
 */

import { CandleColorEnum, DayPartitionOptions, RefinedCandle, RefinedCandleData, refinerOptions } from '@/type/chart';
import { range } from '../../../domain/utilFunc';
import { CandleData } from '../../../domain/marketData';
import { drawLine, drawText } from './drawers';

const { floor } = Math;
const { MAX_SAFE_INTEGER } = Number;

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
 * @description
 * 캔들 높이 조정 비율 구하기
 * - 전체 높이에서 상하 패딩 빼고 가격구간 비율 구함
 */
const getHeightRatio = (data: CandleData, zeroY: number): { ratioH: number; highest: number; lowest: number } => {
  let [highest, lowest] = [0, MAX_SAFE_INTEGER];

  for (const { high, low } of data) {
    if (high > highest) highest = high;
    if (low < lowest) lowest = low;
  }

  return { ratioH: zeroY / (highest - lowest), highest, lowest };
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
export const refiner = (
  _data: CandleData,
  { zeroX, zeroY, count, range, customNumToShow }: refinerOptions,
): RefinedCandleData => {
  /** 화면에 보여질 캔들 갯수 */
  const numToShow = customNumToShow > count ? count : customNumToShow;

  /** 캔들 몸통 너비 */
  const candleWidth = zeroX / numToShow;
  const candleHalf = candleWidth / 2;
  /** 캔들 좌우 패딩 */
  const candlePad = candleWidth * 0.1;

  const { ratioH, lowest } = getHeightRatio(_data, zeroY);

  const data = Array.from({ length: count });

  /** @todo 반복문 최적화? */
  for (const i of range) {
    const { open, close, low, high } = _data[i];

    const candleX = candleWidth * (i + 1);
    const startX = zeroX - candleX + candlePad;

    const highY = zeroY + (lowest - high) * ratioH;
    const rectH = (open - close) * ratioH;

    data[i] = {
      color: setColor(open, close),
      startX,
      centerX: startX + candleHalf,
      openY: zeroY + (lowest - open) * ratioH,
      closeY: zeroY + (lowest - close) * ratioH,
      highY,
      rectH,
      lowY: zeroY + (lowest - low) * ratioH,
    } as RefinedCandle;
  }
  return { data, candleWidth: candleWidth - candlePad * 2, numToShow } as RefinedCandleData;
};

/**
 *
 * @param ctx
 * @param param1
 */
export const setDayPartition = (
  ctx: CanvasRenderingContext2D,
  { data, results, numToShow, count, canvasWidth, canvasHeight, zeroY }: DayPartitionOptions,
) => {
  /**@todo 일자 구분선 */
  const partitions = floor(numToShow / 5);
  for (const i of range(0, count, partitions)) {
    const { date } = results[i];
    const curDate = new Date(date);
    const text = `${curDate.getMonth() + 1} / ${curDate.getDate()}`;
    const { centerX } = data[i];

    drawText(ctx, { text, centerX, centerY: canvasHeight * 0.95, canvasHeight }, {});

    drawLine(
      ctx,
      { beginX: centerX, beginY: canvasHeight, lastX: centerX, lastY: 0 },
      { color: CandleColorEnum.partition, lineWidth: 3 },
    );
  }

  /** 원점 가로선; 캔들차트 최하단 */
  drawLine(
    ctx,
    { beginX: 0, beginY: zeroY, lastX: canvasWidth, lastY: zeroY },
    { color: CandleColorEnum.partition, lineWidth: 5 },
  );
};

/**
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
