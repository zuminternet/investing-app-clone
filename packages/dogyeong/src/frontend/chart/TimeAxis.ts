import { drawHelper } from '@/chart/utils';
import { Candle } from '@/chart/CandleChart';

export interface AxisColorOptions {
  bgColor: string;
  textColor: string;
}

interface TimeAxisProps {
  canvas: HTMLCanvasElement;
  colorOptions: AxisColorOptions;
}

interface DrawTimeProps {
  ctx: CanvasRenderingContext2D;
  candle: Candle;
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
  private timeGapUnit: number;
  private colorOptions: AxisColorOptions;
  private readonly font = '12px sans-serif';
  private readonly textBaseline = 'middle';
  private readonly textAlign = 'center';

  constructor({ canvas, colorOptions }: TimeAxisProps) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.colorOptions = colorOptions;
  }

  private getCtx() {
    return this.canvas.getContext('2d');
  }

  public draw(candles, firstCandleIndex, lastCandleIndex) {
    this.minTime = new Date(candles[firstCandleIndex].date).getTime();
    this.maxTime = new Date(candles[lastCandleIndex].date).getTime();
    this.timeGapUnit = this.getTimeGapUnit();

    const ctx = this.getCtx();

    this.drawBackground(ctx);

    const visibleCandles = candles.slice(firstCandleIndex, lastCandleIndex + 1);

    visibleCandles.forEach((candle) => this.drawTime({ ctx, candle }));
  }

  private drawTime({ ctx, candle }: DrawTimeProps) {
    const date = new Date(candle.date);
    const m = date.getMonth() + 1;
    const d = date.getDate();

    /** @TODO 날짜 체크 어떻게 함? */
    if (this.timeGapUnit === year && (m !== 1 || d !== 1)) return;
    if (this.timeGapUnit === month && d !== 1) return;
    if (![1, 10, 20].includes(d)) return;

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

  private drawBackground(ctx: CanvasRenderingContext2D) {
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
    if (diff < year / 4) return day;
    if (diff < year) return month;
    return year;
  }
}
