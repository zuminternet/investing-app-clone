export default class CandleChart {
  public canvas: HTMLCanvasElement;
  public width: number;
  public height: number;
  public pixelRatio: number;
  public candles: any[];
  public minPrice: number;
  public maxPrice: number;

  constructor(canvas: HTMLCanvasElement, pixelRatio: number) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.pixelRatio = pixelRatio;
    this.minPrice = 0;
    this.maxPrice = 1000;
  }

  public getCtx() {
    return this.canvas.getContext('2d');
  }

  public draw() {
    const ctx = this.getCtx();
    const width = this.canvas.width;
    const height = this.canvas.height;

    const maxValue = this.maxPrice;
    const minValue = this.minPrice;

    const barWidth = 4;
    const borderWidth = 1;

    ctx.clearRect(0, 0, width, height);

    this.candles.forEach((candle, i) => {
      let top = Math.max(candle.open, candle.close);
      let bottom = Math.min(candle.open, candle.close);

      const topY = Math.round(((top - minValue) / (maxValue - minValue)) * height);
      const bottomY = Math.round(((bottom - minValue) / (maxValue - minValue)) * height);

      let left = barWidth * (this.candles.length - i) - Math.floor(barWidth * 0.5);
      let right = left + barWidth - 1;

      ctx.fillStyle = 'red';

      left += borderWidth;
      top += borderWidth;
      right -= borderWidth;
      bottom -= borderWidth;

      ctx.fillRect(left, height - topY, right - left + 1, topY - bottomY + 1);
    });
  }

  public setCandles(candles) {
    this.candles = candles;
    this.draw();
  }

  public increaseMaxPrice(amount = 100) {
    this.maxPrice += amount;
    this.draw();
  }

  public decreaseMaxPrice(amount = 100) {
    this.maxPrice -= amount;
    this.draw();
  }
}
