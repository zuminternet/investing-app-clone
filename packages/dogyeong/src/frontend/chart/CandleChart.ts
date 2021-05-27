import { CandleChartData } from '../../backend/service/MarketService';

interface ColorOptions {
  bgColor: string;
  redColor: string;
  blueColor: string;
}

export default class CandleChart {
  private readonly canvas: HTMLCanvasElement;
  private readonly pixelRatio: number;
  private width: number;
  private height: number;
  private candles: any[];
  private minPrice: number;
  private maxPrice: number;
  private leftOffset: number;
  private barWidth: number;
  private colorOptions: ColorOptions;

  constructor(canvas: HTMLCanvasElement, pixelRatio: number) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.pixelRatio = pixelRatio;
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.leftOffset = 0;
    this.barWidth = 7;
    this.colorOptions = {
      bgColor: 'white',
      redColor: 'red',
      blueColor: 'blue',
    };

    this.initializeEvents();
  }

  private initializeEvents() {
    let isMouseDown = false;
    let clickX = 0;

    this.canvas.onmousedown = (e: MouseEvent) => {
      isMouseDown = true;
      clickX = e.clientX;
    };

    this.canvas.onmousemove = (e: MouseEvent) => {
      if (!isMouseDown) return;

      const movement = e.clientX - clickX;
      clickX = e.clientX;

      this.verticalScroll(movement);
    };

    this.canvas.onmouseup = () => {
      isMouseDown = false;
    };

    this.canvas.onmouseout = () => {
      isMouseDown = false;
    };

    this.canvas.onwheel = (e) => {
      e.preventDefault();

      if (e.deltaY === 0) return;

      const scale = e.deltaY * -0.005;

      this.zoom(scale);
    };
  }

  public getCtx() {
    return this.canvas.getContext('2d');
  }

  public draw() {
    const ctx = this.getCtx();
    ctx.clearRect(0, 0, this.width, this.height);

    this.candles.forEach((candle, i) => {
      this.drawWick(ctx, candle, i);
      this.drawBody(ctx, candle, i);
    });
  }

  public drawBody(ctx, candle, i) {
    const { open, close } = candle;
    const height = this.canvas.height;
    const top = Math.max(open, close);
    const bottom = Math.min(open, close);
    const topY = Math.round(((top - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
    const bottomY = Math.round(((bottom - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
    const left = this.barWidth * (this.candles.length - i) + this.leftOffset;
    const right = left + this.barWidth - 1;

    ctx.fillStyle = candle.open > candle.close ? this.colorOptions.blueColor : this.colorOptions.redColor;
    ctx.fillRect(left, height - topY, right - left, topY - bottomY);
  }

  public drawWick(ctx: CanvasRenderingContext2D, candle, i) {
    const { high, low } = candle;
    const height = this.canvas.height;
    const top = Math.max(high, low);
    const bottom = Math.min(high, low);
    const topY = Math.round(((top - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
    const bottomY = Math.round(((bottom - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
    let left = this.barWidth * (this.candles.length - i) + Math.floor(this.barWidth * 0.5) + this.leftOffset;

    // 보정
    left = (Number.isInteger(left) ? left : Math.round(left - 0.5)) + 0.5;

    ctx.strokeStyle = candle.open > candle.close ? this.colorOptions.blueColor : this.colorOptions.redColor;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(left, height - topY);
    ctx.lineTo(left, height - bottomY);
    ctx.stroke();
    ctx.restore();
  }

  public setCandles(candles: CandleChartData[]) {
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

  public zoom(amount) {
    this.barWidth += amount;
    this.draw();
  }

  public verticalScroll(offset) {
    this.leftOffset += offset;
    this.draw();
  }
}
