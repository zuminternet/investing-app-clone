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
  private innerTimeStamps: number[];
  private colorOptions: ColorOptions;
  private readonly font = '12px sans-serif';
  private readonly textBaseline = 'middle';

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

  public draw(minTime, maxTime) {
    this.setTimes(minTime, maxTime);

    const ctx = this.getCtx();

    this.drawBackground(ctx);
    this.innerTimeStamps.forEach((time) => this.drawTime({ ctx, time }));
  }

  private drawTime({ ctx, time }) {
    const left = ((time - this.minTime) / (this.maxTime - this.minTime)) * this.width;

    drawHelper(ctx, () => {
      ctx.strokeStyle = this.colorOptions.textColor;
      ctx.fillStyle = this.colorOptions.textColor;
      ctx.font = this.font;
      ctx.textBaseline = this.textBaseline;
      ctx.beginPath();
      ctx.moveTo(left, 0);
      ctx.lineTo(left, 20);
      ctx.stroke();
      ctx.fillText(`${new Date(time).toLocaleDateString()}`, left, 40);
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

  private setTimes(minTime, maxTime) {
    const timeGapUnit = this.getTimeGapUnit();
    const timeFnMap = {
      [day]: this.getNextDay.bind(this),
      [month]: this.getNextMonth.bind(this),
      [year]: this.getNextYear.bind(this),
    };
    const nextTimeFn = timeFnMap[timeGapUnit];

    this.minTime = new Date(minTime).getTime();
    this.maxTime = new Date(maxTime).getTime();
    this.innerTimeStamps = this.getTimeStampsInRange({
      startDate: new Date(minTime),
      endDate: new Date(maxTime),
      nextTimeFn,
    });
  }

  private getTimeGapUnit() {
    const diff = this.maxTime - this.minTime;
    if (diff < month) return day;
    if (diff < year) return month;
    return year;
  }

  private getTimeStampsInRange({ startDate, endDate, nextTimeFn }) {
    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = nextTimeFn(currentDate);
    }

    return dates.map((date) => date.getTime());
  }

  private getNextDay(date) {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return next;
  }

  private getNextMonth(date) {
    const next = new Date(date);
    next.setMonth(next.getMonth() + 1);
    return next;
  }

  private getNextYear(date) {
    const next = new Date(date);
    next.setFullYear(next.getFullYear() + 1);
    return next;
  }
}
