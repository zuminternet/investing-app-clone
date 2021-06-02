import { IAggV2Formatted } from '@polygon.io/client-js/lib/rest/stocks/aggregates';

import { CandleData } from '../../domain/marketData';

export const enum ChartTypeEnums {
  line = `line`,
  candle = `candle`,
}

export interface DrawCandleChartOptions {
  ctx: CanvasRenderingContext2D;
  results: CandleData;
  count: number;
  payload: {
    [key: string]: any;
  };
  type?: ChartTypeEnums;
}

export enum CanvasOptionEnum {
  context2d = `2d`,
  textAlignRight = `right`,
  textAlignLeft = `left`,
  textBaseAlphabetic = `alphabetic`,
  textBaseTop = `top`,
  globalCompositeOperation = `destination-over`,
}

export enum CandleColorEnum {
  up = 'rgba(255, 23, 68, 1)',
  down = 'rgba(33, 150, 243, 1)',
  same = 'rgba(97, 97, 97, 1)',
  partition = `rgba(224, 224, 224, 1)`,
  grey900 = `rgba(33, 33, 33, 1)`,
}

export enum MAColorEnum {
  red500 = `rgba(244, 67, 54, 0.5)`,
  green500 = `rgba(0, 150, 136, 0.5)`,
  blue500 = `rgba(33, 150, 243, 0.5)`,
  grey500 = `rgba(158, 158, 158, 0.5)`,
}

export type adjustedData = {
  adjClose: number;
  candleCenter: number;
}[];

/**
 * setSMA 단순이동평균선 Option
 * @property `color` 이동평균선 색
 * @property `duration`? 평균낼 기간, default 20
 */
export interface SMAOptions {
  color: string;
  duration: number;
  width?: number;
}

export interface DrawLinePaths {
  beginX: number;
  beginY: number;
  lastX: number;
  lastY: number;
}

export interface DrawLineOptions {
  color?: string;
  lineWidth?: number;
}

export interface DrawTextRequired {
  text: string;
  centerX: number;
  centerY: number;
  canvasHeight: number;
}

export interface DrawTextOptions {
  fontFamily?: string;
  fontSize?: number;
  textBaseline?: CanvasTextBaseline;
  textAlign?: CanvasTextAlign;
  textWidth?: number;
}

export interface ClientWH {
  zeroX: number;
  zeroY: number;
  ratio: number;
  canvasWidth?: number;
  canvasHeight?: number;
}

export interface refinerOptions extends Omit<ClientWH, 'ratio'> {
  count: number;
  range: Generator<number, void, any>;
  total?: number;
  customNumToShow?: number;
}

/** Chart 만들기 편하게 전처리된 캔들 데이터 */
export interface RefinedCandle {
  startX: number;
  centerX: number;
  openY: number;
  closeY: number;
  rectH: number;
  highY: number;
  lowY: number;
  color: string;
}

export interface RefinedCandleData {
  data: RefinedCandle[];
  candleWidth: number;
  numToShow: number;
}
export interface DayPartitionOptions {
  /** API에서 넘어온 원본 데이터 */
  results: CandleData;
  /** 차트 그리기 위해 가공한 데이터 */
  data: RefinedCandle[];
  numToShow: number;
  count: number;
  canvasWidth: number;
  canvasHeight: number;
  /** 원점 Y 좌표 */
  zeroY: number;
}
