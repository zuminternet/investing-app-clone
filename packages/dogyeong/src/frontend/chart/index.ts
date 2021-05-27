import CandleChart from '@/chart/CandleChart';
import { createCanvas } from '@/chart/utils';

export const createChart = ($container: HTMLElement) => {
  return new CandleChart($container);
};
