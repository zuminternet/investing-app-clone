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

type TimeUnit = {
  month: number;
  day: number;
};

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

  // Date 객체를 받아서 year, month, date 객체로 반환
  private getFullDate(date: Date) {
    return {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
    };
  }

  public draw(candles: Candle[], firstCandleIndex, lastCandleIndex) {
    if (firstCandleIndex < 0 || lastCandleIndex < 0) return;

    this.minTime = new Date(candles[firstCandleIndex].date).getTime();
    this.maxTime = new Date(candles[lastCandleIndex].date).getTime();
    this.timeGapUnit = this.getTimeGapUnit();

    const ctx = this.getCtx();

    this.drawBackground(ctx);

    const visibleCandles = candles.slice(firstCandleIndex, lastCandleIndex + 1);

    this.timeLines = visibleCandles.reduce((res, candle, idx) => {
      const prevCandle = visibleCandles[idx - 1] ?? null;
      const timeLine = this.getTimeLine(prevCandle, candle);
      if (timeLine) res.push(timeLine);
      return res;
    }, []);

    this.timeLines.forEach((timeLine) => this.drawTime({ ctx, timeLine }));

    this.publish(this.timeLines);
  }

  private getTimeLine(prevCandle: Candle | null, candle: Candle) {
    if (!prevCandle) return;

    const prev = this.getFullDate(new Date(prevCandle.date));
    const current = this.getFullDate(new Date(candle.date));

    if (prev.y !== current.y) {
      return {
        x: candle.wickCenter,
        text: current.y,
      };
    }

    const isFirstDayOfMonth = prev.m !== current.m;
    const shouldDisplay = current.m % Math.floor(12 / this.timeGapUnit.month) === 0;
    const exceptLastMonth = !(this.timeGapUnit.month <= 4 && current.m === 12);

    if (isFirstDayOfMonth && shouldDisplay && exceptLastMonth) {
      return {
        x: candle.wickCenter,
        text: current.m + '월',
      };
    }

    return;
  }

  private drawTime({ ctx, timeLine: { x, text } }: DrawTimeProps) {
    drawHelper(ctx, () => {
      ctx.strokeStyle = this.colorOptions.textColor;
      ctx.fillStyle = this.colorOptions.textColor;
      ctx.font = this.font;
      ctx.textBaseline = this.textBaseline;
      ctx.textAlign = this.textAlign;
      ctx.fillText(text, x, 15);
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
    const { year } = timeUnit;
    // 화면 너비 200px 동안의 기간
    const diffe = this.maxTime - this.minTime;
    const period = (200 * diffe) / this.width;
    const periodYear = period / year;

    if (periodYear > 1) return { month: -1, day: 0 };
    if (periodYear > 0.8) return { month: 2, day: 0 };
    if (periodYear > 0.6) return { month: 3, day: 0 };
    if (periodYear > 0.4) return { month: 4, day: 0 };
    if (periodYear > 0.2) return { month: 6, day: 0 };
    if (periodYear > 0.1) return { month: 12, day: 0 };
    return { month: 12, day: 2 };
  }
}
