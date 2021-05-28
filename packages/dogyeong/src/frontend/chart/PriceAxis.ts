import { crispPixel, drawHelper } from '@/chart/utils';
import { AxisColorOptions } from '@/chart/TimeAxis';

interface PriceAxisProps {
  canvas: HTMLCanvasElement;
  colorOptions: AxisColorOptions;
}

interface DrawPriceProps {
  ctx: CanvasRenderingContext2D;
  price: number;
  minPrice: number;
  maxPrice: number;
}

export default class PriceAxis {
  private readonly canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  private minPrice: number;
  private maxPrice: number;
  private innerPrices: number[];
  private colorOptions: AxisColorOptions;
  private readonly font = '12px sans-serif';
  private readonly textBaseline = 'middle';

  constructor({ canvas, colorOptions }: PriceAxisProps) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.colorOptions = colorOptions;
  }

  public draw(minPrice: number, maxPrice: number) {
    this.setPrices(minPrice, maxPrice);

    const ctx = this.getCtx();

    this.drawBackground(ctx);

    this.innerPrices.forEach((price) => this.drawPrice({ ctx, price, minPrice, maxPrice }));
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
    const prices = [];
    let index = Math.ceil(this.minPrice / gap);

    while (index * gap < this.maxPrice) {
      prices.push((index * gap).toFixed(2));
      index++;
    }

    return prices;
  }

  private getPriceGapUnit() {
    const diff = this.maxPrice - this.minPrice;
    if (diff < 10) return 1;
    if (diff < 100) return 10;
    if (diff < 1000) return 100;
    return 1000;
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

  private drawPrice({ ctx, price, minPrice, maxPrice }: DrawPriceProps) {
    const priceY = Math.round(((price - minPrice) / (maxPrice - minPrice)) * this.height);
    const lineY = crispPixel(this.height - priceY);

    drawHelper(ctx, () => {
      ctx.strokeStyle = this.colorOptions.textColor;
      ctx.fillStyle = this.colorOptions.textColor;
      ctx.font = this.font;
      ctx.textBaseline = this.textBaseline;
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      ctx.lineTo(10, lineY);
      ctx.stroke();
      ctx.fillText(`${price}`, 14, lineY);
    });
  }
}
