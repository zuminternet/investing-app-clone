import PubSub from '@/chart/PubSub';

export default abstract class Canvas extends PubSub {
  public width: number;
  public height: number;

  constructor(protected readonly $container: HTMLElement, protected readonly canvas: HTMLCanvasElement) {
    super();
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
  }

  public resize(width: number, height: number) {
    const pixelRatio = window.devicePixelRatio;
    const ctx = this.canvas.getContext('2d');

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.width = width;
    this.height = height;
    this.canvas.width = width * pixelRatio;
    this.canvas.height = height * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);
  }
}
