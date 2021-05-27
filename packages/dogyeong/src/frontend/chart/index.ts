import CandleChart from '@/chart/CandleChart';

export const createChart = ($container: HTMLElement) => {
  const canvas = document.createElement('canvas');
  const width = $container.offsetWidth;
  const height = $container.offsetHeight;
  const pixelRatio = window.devicePixelRatio;
  const ctx = canvas.getContext('2d');

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  ctx.scale(pixelRatio, pixelRatio);

  $container.appendChild(canvas);

  return new CandleChart(canvas, pixelRatio);
};
