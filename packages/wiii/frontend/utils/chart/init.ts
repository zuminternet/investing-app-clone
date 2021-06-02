import { CanvasOptionEnum, ClientWH } from '@/type/chart';

/**
 * @module
 * 캔버스 초기화 관련 함수 모음
 */

/**
 * @description
 * - resizing, 캔버스 DPI 높이기 위함, retina display 지원
 * - 가로 16: 세로 9
 * - default options; overflow
 * @see https://developer.mozilla.org/ko/docs/Web/API/Window/devicePixelRatio#correcting_resolution_in_a_%3Ccanvas%3E
 * @return resizing에 필요한 width, height === clientWidth, clientHeight
 */
export const initCanvas = (ctx: CanvasRenderingContext2D): ClientWH => {
  const ratio = window.devicePixelRatio;

  const cvs = ctx.canvas;

  const size = cvs.clientWidth;
  cvs.style.width = `${size}px`;
  cvs.style.height = `${(size * 9) / 16}px`;

  const canvasWidth = (cvs.width = size * ratio * 2);
  const canvasHeight = (cvs.height = (canvasWidth * 9 * 2) / 16);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.globalCompositeOperation = CanvasOptionEnum.globalCompositeOperation;

  ctx.save();

  /** @todo 좀 이해안가는 부분.. */
  const zeroX = canvasWidth * 0.927;
  const zeroY = zeroX * 1.1;

  return {
    /** 영점 */
    zeroX,
    zeroY,
    ratio,
    canvasWidth,
    canvasHeight,
  };
};
