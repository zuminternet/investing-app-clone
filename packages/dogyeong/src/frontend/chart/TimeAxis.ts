import { drawHelper } from '@/chart/utils';
import { Candle } from '@/chart/CandleChart';
import Canvas from '@/chart/Canvas';

export interface AxisColorOptions {
  bgColor: string;
  textColor: string;
}

interface TimeAxisProps {
  $container: HTMLElement;
  canvas: HTMLCanvasElement;
  colorOptions: AxisColorOptions;
}

interface DrawTimeProps {
  ctx: CanvasRenderingContext2D;
  timeLine: TimeLine;
}

interface TimeLine {
  x: number;
  text: string;
}

const timeUnit = {
  day: 86400000,
  month: 2592000000,
  year: 31536000000,
} as const;

type TimeUnit = typeof timeUnit[keyof typeof timeUnit];

export default class TimeAxis extends Canvas {
  private minTime: number;
  private maxTime: number;
  private timeGapUnit: TimeUnit;
  private colorOptions: AxisColorOptions;
  private readonly font = '12px sans-serif';
  private readonly textBaseline = 'middle';
  private readonly textAlign = 'center';
  private timeLines: TimeLine[];

  constructor({ $container, canvas, colorOptions }: TimeAxisProps) {
    super($container, canvas);
    this.colorOptions = colorOptions;
  }

  private getCtx() {
    return this.canvas.getContext('2d');
  }

  public draw(candles, firstCandleIndex, lastCandleIndex) {
    if (firstCandleIndex < 0 || lastCandleIndex < 0) return;

    this.minTime = new Date(candles[firstCandleIndex].date).getTime();
    this.maxTime = new Date(candles[lastCandleIndex].date).getTime();
    this.timeGapUnit = this.getTimeGapUnit();

    const ctx = this.getCtx();

    this.drawBackground(ctx);

    const visibleCandles = candles.slice(firstCandleIndex, lastCandleIndex + 1);

    this.timeLines = visibleCandles.reduce((res, candle) => {
      const timeLine = this.getTimeLine(candle);
      if (timeLine) res.push(timeLine);
      return res;
    }, []);

    this.timeLines.forEach((timeLine) => this.drawTime({ ctx, timeLine }));

    this.publish(this.timeLines);
  }

  private getTimeLine(candle: Candle) {
    const date = new Date(candle.date);
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const { year, month } = timeUnit;

    /** @TODO 날짜 체크 어떻게 함? */
    if (this.timeGapUnit === year && (m !== 1 || d !== 1)) return;
    if (this.timeGapUnit === month && d !== 1) return;
    if (![1, 10, 20].includes(d)) return;

    return {
      x: candle.wickCenter,
      text: date.toLocaleDateString(),
    };
  }

  private drawTime({ ctx, timeLine: { x, text } }: DrawTimeProps) {
    drawHelper(ctx, () => {
      ctx.strokeStyle = this.colorOptions.textColor;
      ctx.fillStyle = this.colorOptions.textColor;
      ctx.font = this.font;
      ctx.textBaseline = this.textBaseline;
      ctx.textAlign = this.textAlign;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 20);
      ctx.stroke();
      ctx.fillText(text, x, 35);
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

  private getTimeGapUnit(): TimeUnit {
    const { year, month, day } = timeUnit;
    const diff = this.maxTime - this.minTime;
    if (diff < year / 4) return day;
    if (diff < year) return month;
    return year;
  }
}
