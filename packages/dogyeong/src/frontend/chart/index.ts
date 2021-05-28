import CandleChart from '@/chart/CandleChart';
import { CandleChartColorOptions } from '@/chart/CandleChart';

export const createChart = ($container: HTMLElement, colorOptions?: CandleChartColorOptions) => {
  return new CandleChart({ $container, colorOptions });
};
