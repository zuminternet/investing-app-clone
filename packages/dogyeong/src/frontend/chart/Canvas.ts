import PubSub from '@/chart/PubSub';

export default abstract class Canvas extends PubSub {
  public width: number;
  public height: number;

  constructor(protected readonly $container: HTMLElement, protected readonly canvas: HTMLCanvasElement) {
    super();
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  public resize(width: number, height: number) {
    const pixelRatio = window.devicePixelRatio;
    const ctx = this.canvas.getContext('2d');

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.width = this.canvas.width = width * pixelRatio;
    this.height = this.canvas.height = height * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);
  }
}
