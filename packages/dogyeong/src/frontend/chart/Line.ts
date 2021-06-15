import { drawHelper } from '@/chart/utils';

export interface HorizontalLine {
  y: number;
}

export interface VerticalLine {
  x: number;
}

export interface LineColorOptions {
  graphLineColor: string;
}

export default class Line {
  private readonly canvas: HTMLCanvasElement;
  public width: number;
  public height: number;
  private readonly lineColor: string;

  constructor(canvas: HTMLCanvasElement, colorOptions: LineColorOptions) {
    this.canvas = canvas;
    this.lineColor = colorOptions.graphLineColor;
  }

  private getCtx() {
    return this.canvas.getContext('2d');
  }

  public drawLines(lines: VerticalLine[] | HorizontalLine[] = []) {
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    lines.forEach(this.drawLine.bind(this));
  }

  private drawLine(line: VerticalLine | HorizontalLine) {
    if ({}.hasOwnProperty.call(line, 'x')) {
      this.drawVerticalLine(line as VerticalLine);
    } else {
      this.drawHorizontalLine(line as HorizontalLine);
    }
  }

  private drawVerticalLine(line: VerticalLine) {
    const ctx = this.getCtx();

    drawHelper(ctx, () => {
      ctx.strokeStyle = this.lineColor;
      ctx.beginPath();
      ctx.moveTo(line.x, 0);
      ctx.lineTo(line.x, this.height);
      ctx.closePath();
      ctx.stroke();
    });
  }

  private drawHorizontalLine(line: HorizontalLine) {
    const ctx = this.getCtx();

    drawHelper(ctx, () => {
      ctx.strokeStyle = this.lineColor;
      ctx.closePath();
      ctx.moveTo(0, line.y);
      ctx.lineTo(this.width, line.y);
      ctx.closePath();
      ctx.stroke();
    });
  }
}
