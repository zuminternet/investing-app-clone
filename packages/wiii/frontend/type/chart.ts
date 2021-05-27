import { IAggV2Formatted } from '@polygon.io/client-js/lib/rest/stocks/aggregates';

export interface MultidaysStockData {
  dataKey?: string;
  results?: IAggV2Formatted[];
  resultsCount?: number;
}

export interface BasicCandleOptionProps {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  open: number;
  close: number;
  low: number;
  high: number;
  width: number;
  height: number;
  timestamp?: number;

  highest: number;
  lowest: number;
  canvasWidth?: number;
  canvasHeight?: number;
  hRatio: number;
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
