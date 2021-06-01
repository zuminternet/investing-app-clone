import { IAggV2Formatted } from '@polygon.io/client-js/lib/rest/stocks/aggregates';

import { CandleData } from '../../domain/marketData';

/** @todo 개발 편의 위해 일단 모두 optional로 지정 */
export interface BasicCandleOptionProps {
  ctx: CanvasRenderingContext2D;
  idx?: number;
  x?: number;
  y?: number;
  open?: number;
  close?: number;
  low?: number;
  high?: number;
  bodyWidth?: number;
  height?: number;
  timestamp?: Date;

  highest?: number;
  lowest?: number;
  clientWidth?: number;
  clientHeight?: number;
  hRatio?: number;
  padding?: number;
}

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
 * @property `data` 조정된 종가, 캔들 중앙값 데이터
 * @property `color` 이동평균선 색
 * @property `hRatio` 비율
 * @property `duration`? 평균낼 기간, default 20
 */
export interface SetSMAOptions {
  data: adjustedData;
  color: string;
  hRatio: number;
  duration: number;
}
