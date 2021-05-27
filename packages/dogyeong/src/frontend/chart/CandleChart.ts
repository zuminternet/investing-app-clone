import { CandleChartData } from '../../backend/service/MarketService';

interface ColorOptions {
  bgColor: string;
  redColor: string;
  blueColor: string;
}

export default class CandleChart {
  private readonly canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  private candles: any[];
  private minPrice: number;
  private maxPrice: number;
  private leftOffset: number;
  private barWidth: number;
  private colorOptions: ColorOptions;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.leftOffset = 0;
    this.barWidth = 7;
    this.colorOptions = {
      bgColor: '#131722',
      redColor: '#26a69a',
      blueColor: '#ef5350',
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

  private getCtx() {
    return this.canvas.getContext('2d');
  }

  private draw() {
    const ctx = this.getCtx();

    ctx.save();
    ctx.fillStyle = this.colorOptions.bgColor;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();

    this.candles.forEach((candle, i) => {
      this.drawWick(ctx, candle, i);
      this.drawBody(ctx, candle, i);
    });
  }

  private drawBody(ctx, candle, i) {
    const { open, close } = candle;
    const height = this.canvas.height;
    const top = Math.max(open, close);
    const bottom = Math.min(open, close);
    const topY = Math.round(((top - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
    const bottomY = Math.round(((bottom - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
    const left = this.barWidth * i + this.leftOffset;
    const right = left + this.barWidth - 1;

    ctx.fillStyle = candle.open > candle.close ? this.colorOptions.blueColor : this.colorOptions.redColor;
    ctx.fillRect(left, height - topY, right - left, topY - bottomY);
  }

  private drawWick(ctx: CanvasRenderingContext2D, candle, i) {
    const { high, low } = candle;
    const height = this.canvas.height;
    const top = Math.max(high, low);
    const bottom = Math.min(high, low);
    const topY = Math.round(((top - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
    const bottomY = Math.round(((bottom - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
    let left = this.barWidth * i + Math.floor(this.barWidth * 0.5) + this.leftOffset;

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

  private caculatePriceScale() {
    // 보이는 첫 캔들 구함 (right > 0)
    // -1이면 차트가 화면 위에 없음
    const firstCandleIndex = this.candles.findIndex((_, i) => this.barWidth * i + this.leftOffset + this.barWidth > 0);

    // 보이는 마지막 캔들 구함 (left > width)
    // 인덱스가 음수면 차트 끝이 화면 안에 있음
    let lastCandleIndex = this.candles.findIndex((_, i) => this.barWidth * i + this.leftOffset > this.width) - 1;

    // 차트가 화면 바깥에 있는 경우
    if (firstCandleIndex < 0) return;

    // 차트의 마지막 캔들이 화면 안에 있는 경우
    if (lastCandleIndex < 0) lastCandleIndex = this.candles.length - 1;

    const [min, max] = this.candles
      .slice(firstCandleIndex, lastCandleIndex + 1)
      .reduce(([min, max], { low, high }) => [Math.min(min, low), Math.max(max, high)], [Infinity, 0]);

    this.minPrice = Math.max(min - 100, 0);
    this.maxPrice = max + 100;
  }

  public setCandles(candles: CandleChartData[]) {
    this.candles = candles.reverse();
    this.caculatePriceScale();
    this.draw();
  }

  private zoom(amount) {
    this.barWidth += amount;
    this.caculatePriceScale();
    this.draw();
  }

  private verticalScroll(offset) {
    this.leftOffset += offset;
    this.caculatePriceScale();
    this.draw();
  }
}
