import { drawHelper } from '@/chart/utils';
import { Candle } from '@/chart/CandleChart';

export interface GraphColorOptions {
  bgColor: string;
  redColor: string;
  blueColor: string;
}

export default class Graph {
  private readonly canvas: HTMLCanvasElement;
  public width: number;
  public height: number;
  public candles: Candle[];
  public rightOffset: number;
  public barWidth: number;
  private colorOptions: GraphColorOptions;
  private listeners: any[];

  constructor({ canvas, colorOptions }) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.rightOffset = 0;
    this.barWidth = 7;
    this.colorOptions = colorOptions;
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

  public setCandles(candles: Candle[]) {
    this.candles = candles;
  }

  public getCandle(index: number) {
    return this.candles[index];
  }

  public subscribe(listener) {
    this.listeners.push(listener);
  }

  private publish() {
    this.listeners.forEach((listener) => listener());
  }

  private zoom(amount: number) {
    this.barWidth += amount;
    this.publish();
  }

  private verticalScroll(offset: number) {
    this.rightOffset -= offset;
    this.publish();
  }

  private getCandleColor(open: number, close: number) {
    return open > close ? this.colorOptions.blueColor : this.colorOptions.redColor;
  }

  public getCandleBodyLeft(index: number) {
    return this.width - this.barWidth * (index + 1) - this.rightOffset;
  }

  public getCandleBodyRight(index: number) {
    return this.getCandleBodyLeft(index) + this.barWidth - 1;
  }

  public draw(candles: Candle[]) {
    const ctx = this.getCtx();

    drawHelper(ctx, () => {
      ctx.fillStyle = this.colorOptions.bgColor;
      ctx.fillRect(0, 0, this.width, this.height);
    });

    candles.forEach((candle) => {
      this.drawWick(ctx, candle);
      this.drawBody(ctx, candle);
    });
  }

  private drawBody(ctx: CanvasRenderingContext2D, candle: Candle) {
    const { open, close, bodyX, bodyY, bodyW, bodyH } = candle;

    drawHelper(ctx, () => {
      ctx.fillStyle = this.getCandleColor(open, close);
      ctx.fillRect(bodyX, bodyY, bodyW, bodyH);
    });
  }

  private drawWick(ctx: CanvasRenderingContext2D, candle: Candle) {
    const { open, close, wickCenter, wickTop, wickBottom } = candle;

    drawHelper(ctx, () => {
      ctx.strokeStyle = this.getCandleColor(open, close);
      ctx.beginPath();
      ctx.moveTo(wickCenter, wickTop);
      ctx.lineTo(wickCenter, wickBottom);
      ctx.stroke();
    });
  }
}
