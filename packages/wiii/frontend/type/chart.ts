import { IAggV2Formatted } from '@polygon.io/client-js/lib/rest/stocks/aggregates';

export interface MultidaysStockData {
  dataKey?: string;
  results?: IAggV2Formatted[];
  resultsCount?: number;
}

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
  canvasWidth?: number;
  canvasHeight?: number;
  hRatio?: number;
  padding?: number;
}

export interface DrawCandleChartOptions {
  ctx: CanvasRenderingContext2D;
  results: IAggV2Formatted[];
  resultsCount: number;
  limit: number;
}

export enum CandleColorEnum {
  up = 'rgba(255, 23, 68, 1)',
  down = 'rgba(33, 150, 243, 1)',
  same = 'rgba(97, 97, 97, 1)',
  partition = `rgba(224, 224, 224, 1)`,
  grey900 = `rgba(33, 33, 33, 1)`,
}
