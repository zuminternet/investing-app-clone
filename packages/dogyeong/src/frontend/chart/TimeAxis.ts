import { drawHelper } from '@/chart/utils';

interface ColorOptions {
  bgColor: string;
  textColor: string;
}

const day = 3600 * 24 * 1000;
const month = day * 30;
const year = month * 12;

export default class TimeAxis {
  private readonly canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  private minTime: number;
  private maxTime: number;
  private firstCandleIndex: number;
  private lastCandleIndex: number;
  private timeGapUnit: number;
  private colorOptions: ColorOptions;
  private readonly font = '12px sans-serif';
  private readonly textBaseline = 'middle';
  private readonly textAlign = 'center';

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.colorOptions = {
      bgColor: '#131722',
      textColor: '#efefef',
    };
  }

  private getCtx() {
    return this.canvas.getContext('2d');
  }

  public draw(candles, firstCandleIndex, lastCandleIndex) {
    this.firstCandleIndex = firstCandleIndex;
    this.lastCandleIndex = lastCandleIndex;
    this.minTime = new Date(candles[firstCandleIndex].date).getTime();
    this.maxTime = new Date(candles[lastCandleIndex].date).getTime();
    this.timeGapUnit = this.getTimeGapUnit();

    const ctx = this.getCtx();

    this.drawBackground(ctx);

    const visibleCandles = candles.slice(firstCandleIndex, lastCandleIndex + 1);

    visibleCandles.forEach((candle) => this.drawTime({ ctx, candle }));
  }

  private drawTime({ ctx, candle }) {
    const date = new Date(candle.date);
    const m = date.getMonth() + 1;
    const d = date.getDate();

    if (this.timeGapUnit === year && (m !== 1 || d !== 1)) return;
    if (this.timeGapUnit === month && d !== 1) return;
    if (![1, 10, 20, 30].includes(d)) return;

    drawHelper(ctx, () => {
      ctx.strokeStyle = this.colorOptions.textColor;
      ctx.fillStyle = this.colorOptions.textColor;
      ctx.font = this.font;
      ctx.textBaseline = this.textBaseline;
      ctx.textAlign = this.textAlign;
      ctx.beginPath();
      ctx.moveTo(candle.wickCenter, 0);
      ctx.lineTo(candle.wickCenter, 20);
      ctx.stroke();
      ctx.fillText(date.toLocaleDateString(), candle.wickCenter, 35);
    });
  }

  private drawBackground(ctx) {
    drawHelper(ctx, () => {
      ctx.strokeStyle = this.colorOptions.textColor;
      ctx.fillStyle = this.colorOptions.bgColor;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.beginPath();
      ctx.moveTo(0, 0.5);
      ctx.lineTo(this.width, 0.5);
      ctx.stroke();
    });
  }

  private getTimeGapUnit() {
    const diff = this.maxTime - this.minTime;
    if (diff < month) return day;
    if (diff < year) return month;
    return year;
  }
}
