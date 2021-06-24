import { drawHelper } from '@/chart/utils';
import { Candle } from '@/chart/CandleChart';
import Canvas from '@/chart/Canvas';

export interface GraphColorOptions {
  bgColor: string;
  redColor: string;
  blueColor: string;
  lineStrokeColor: string;
  lineFillColor: string;
}

export enum GraphType {
  line,
  candle,
}

export default class Graph extends Canvas {
  public candles: Candle[];
  public rightOffset: number;
  public barWidth: number;
  private colorOptions: GraphColorOptions;
  private graphType: GraphType = GraphType.candle;

  constructor({ $container, canvas, colorOptions }) {
    super($container, canvas);
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

      this.zoom(scale, e.offsetX);
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

  public toggleGraphType() {
    this.graphType = this.graphType === GraphType.candle ? GraphType.line : GraphType.candle;
  }

  private zoom(amount: number, mouseOffsetX: number) {
    const scrollOffset = -(this.rightOffset - this.width + mouseOffsetX); // 마우스와 rightOffset간의 거리
    this.verticalScroll(scrollOffset * 0.01 * (amount > 0 ? 1 : -1));
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

  public clearBg() {
    const ctx = this.getCtx();

    drawHelper(ctx, () => {
      ctx.fillStyle = this.colorOptions.bgColor;
      ctx.fillRect(0, 0, this.width, this.height);
    });
  }

  public draw(candles: Candle[]) {
    const ctx = this.getCtx();

    if (this.graphType === GraphType.candle) {
      candles.forEach((candle) => {
        this.drawWick(ctx, candle);
        this.drawBody(ctx, candle);
      });
    } else {
      this.drawLine(ctx, candles);
    }
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

  private drawLine(ctx: CanvasRenderingContext2D, candles: Candle[]) {
    drawHelper(ctx, () => {
      ctx.fillStyle = this.colorOptions.lineFillColor;
      ctx.beginPath();
      ctx.moveTo(candles[0].wickCenter, this.height);
      candles.forEach(({ wickCenter, bodyY, bodyH }) => ctx.lineTo(wickCenter, bodyY + bodyH));
      ctx.lineTo(candles.slice(-1)[0].wickCenter, this.height);
      ctx.fill();
    });

    drawHelper(ctx, () => {
      ctx.strokeStyle = this.colorOptions.lineStrokeColor;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(candles[0].wickCenter, candles[0].bodyY + candles[0].bodyH);
      candles.slice(1).forEach(({ wickCenter, bodyY, bodyH }) => ctx.lineTo(wickCenter, bodyY + bodyH));
      ctx.stroke();
    });
  }
}
