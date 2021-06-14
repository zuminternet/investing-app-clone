import { crispPixel, drawHelper } from '@/chart/utils';
import { AxisColorOptions } from '@/chart/TimeAxis';
import Canvas from '@/chart/Canvas';

interface PriceLine {
  y: number;
  text: string;
}

interface PriceAxisProps {
  $container: HTMLElement;
  canvas: HTMLCanvasElement;
  colorOptions: AxisColorOptions;
}

export default class PriceAxis extends Canvas {
  private minPrice: number;
  private maxPrice: number;
  private innerPrices: string[];
  private priceLines: PriceLine[] = [];
  private colorOptions: AxisColorOptions;
  private readonly font = '12px sans-serif';
  private readonly textBaseline = 'middle';

  constructor({ $container, canvas, colorOptions }: PriceAxisProps) {
    super($container, canvas);
    this.colorOptions = colorOptions;
  }

  public draw(minPrice: number, maxPrice: number) {
    this.setPrices(minPrice, maxPrice);

    const ctx = this.getCtx();

    this.drawBackground(ctx);
    this.getPriceLines();
    this.drawPrices();
    this.publish(this.priceLines);
  }

  private getCtx() {
    return this.canvas.getContext('2d');
  }

  private setPrices(minPrice, maxPrice) {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.innerPrices = this.getInnerPrices();
  }

  private getInnerPrices() {
    const gap = this.getPriceGapUnit();
    const prices: string[] = [];
    let index = Math.ceil(this.minPrice / gap);

    while (index * gap < this.maxPrice) {
      prices.push((index * gap).toFixed(2));
      index++;
    }

    return prices;
  }

  private getPriceGapUnit() {
    const diff = this.maxPrice - this.minPrice;
    if (diff < 10) return 0.5;
    if (diff < 20) return 1;
    if (diff < 40) return 2;
    if (diff < 80) return 4;
    if (diff < 100) return 5;
    if (diff < 200) return 10;
    if (diff < 500) return 25;
    if (diff < 1000) return 50;
    if (diff < 2000) return 100;
    if (diff < 4000) return 200;
    return 400;
  }

  private drawBackground(ctx: CanvasRenderingContext2D) {
    drawHelper(ctx, () => {
      ctx.strokeStyle = this.colorOptions.textColor;
      ctx.fillStyle = this.colorOptions.bgColor;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.beginPath();
      ctx.moveTo(0.5, 0);
      ctx.lineTo(0.5, this.height);
      ctx.stroke();
    });
  }

  private getPriceLines() {
    this.priceLines = this.innerPrices.map((price) => {
      const priceY = Math.round(((+price - this.minPrice) / (this.maxPrice - this.minPrice)) * this.height);
      const lineY = crispPixel(this.height - priceY);
      return { y: lineY, text: price.toString() };
    });
  }

  private drawPrices() {
    const ctx = this.getCtx();

    this.priceLines.forEach(({ y, text }) => {
      drawHelper(ctx, () => {
        ctx.strokeStyle = this.colorOptions.textColor;
        ctx.fillStyle = this.colorOptions.textColor;
        ctx.font = this.font;
        ctx.textBaseline = this.textBaseline;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(6, y);
        ctx.stroke();
        ctx.fillText(`${text}`, 14, y);
      });
    });
  }
}
