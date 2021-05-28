import { crispPixel, drawHelper } from '@/chart/utils';

interface ColorOptions {
  bgColor: string;
  redColor: string;
  blueColor: string;
}

export default class Graph {
  private readonly canvas: HTMLCanvasElement;
  public width: number;
  public height: number;
  public candles: any[];
  public rightOffset: number;
  public barWidth: number;
  private colorOptions: ColorOptions;
  private listeners: any[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.rightOffset = 0;
    this.barWidth = 7;
    this.colorOptions = {
      bgColor: '#131722',
      redColor: '#26a69a',
      blueColor: '#ef5350',
    };
    this.listeners = [];

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

    this.canvas.onmouseup = () => (isMouseDown = false);

    this.canvas.onmouseout = () => (isMouseDown = false);

    this.canvas.onwheel = (e) => {
      e.preventDefault();

      if (e.deltaY === 0) return;

      const scale = e.deltaY * -0.005;

      this.zoom(scale);
    };
  }

  private getCtx() {
    return this.canvas.getContext('2d');
  }

  public setCandles(candles) {
    this.candles = candles;
  }

  public getCandle(index) {
    return this.candles[index];
  }

  public subscribe(listener) {
    this.listeners.push(listener);
  }

  private publish() {
    this.listeners.forEach((listener) => listener());
  }

  private zoom(amount) {
    this.barWidth += amount;
    this.publish();
  }

  private verticalScroll(offset) {
    this.rightOffset -= offset;
    this.publish();
  }

  private getCandleColor(open, close) {
    return open > close ? this.colorOptions.blueColor : this.colorOptions.redColor;
  }

  public getCandleBodyLeft(index) {
    return this.width - this.barWidth * (index + 1) - this.rightOffset;
  }

  public getCandleBodyRight(index) {
    return this.getCandleBodyLeft(index) + this.barWidth - 1;
  }

  public draw(candles, minPrice, maxPrice) {
    const ctx = this.getCtx();

    drawHelper(ctx, () => {
      ctx.fillStyle = this.colorOptions.bgColor;
      ctx.fillRect(0, 0, this.width, this.height);
    });

    for (let i = candles.length - 1; i >= 0; i--) {
      const candle = candles[i];
      this.drawWick(ctx, candle, candles.length - i, minPrice, maxPrice);
      this.drawBody(ctx, candle, candles.length - i, minPrice, maxPrice);
    }
  }

  private drawBody(ctx, candle, i, minPrice, maxPrice) {
    const { open, close } = candle;
    const height = this.canvas.height;
    const top = Math.max(open, close);
    const bottom = Math.min(open, close);
    const topY = Math.round(((top - minPrice) / (maxPrice - minPrice)) * height);
    const bottomY = Math.round(((bottom - minPrice) / (maxPrice - minPrice)) * height);
    const left = this.getCandleBodyLeft(i);
    const right = this.getCandleBodyRight(i);

    drawHelper(ctx, () => {
      ctx.fillStyle = this.getCandleColor(open, close);
      ctx.fillRect(left, height - topY, right - left, topY - bottomY);
    });
  }

  private drawWick(ctx, candle, i, minPrice, maxPrice) {
    const { high, low, open, close } = candle;
    const height = this.canvas.height;
    const top = Math.max(high, low);
    const bottom = Math.min(high, low);
    const topY = Math.round(((top - minPrice) / (maxPrice - minPrice)) * height);
    const bottomY = Math.round(((bottom - minPrice) / (maxPrice - minPrice)) * height);
    let left = this.width - this.barWidth * (i + 1) - this.rightOffset + this.barWidth * 0.5;

    left = crispPixel(left);

    drawHelper(ctx, () => {
      ctx.strokeStyle = this.getCandleColor(open, close);
      ctx.beginPath();
      ctx.moveTo(left, height - topY);
      ctx.lineTo(left, height - bottomY);
      ctx.stroke();
    });
  }
}
