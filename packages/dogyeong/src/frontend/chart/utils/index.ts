export const createCanvas = ($container: HTMLElement) => {
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

  return canvas;
};

export const crispPixel = (pixel) => {
  const halfThickness = 0.5;
  return (Number.isInteger(pixel) ? pixel : Math.round(pixel - halfThickness)) + halfThickness;
};

export const drawHelper = (ctx, fn) => {
  ctx.save();
  fn();
  ctx.restore();
};
