import CandleChart from '@/chart/CandleChart';

export const createChart = ($container: HTMLElement) => {
  return new CandleChart($container);
};
