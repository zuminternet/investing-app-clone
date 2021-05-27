import CandleChart from '@/chart/CandleChart';
import { createCanvas } from '@/chart/utils';

export const createChart = ($container: HTMLElement) => {
  const canvas = createCanvas($container);

  return new CandleChart(canvas);
};
