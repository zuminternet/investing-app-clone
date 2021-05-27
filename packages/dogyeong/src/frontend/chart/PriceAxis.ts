interface ColorOptions {
  bgColor: string;
  textColor: string;
}

export default class PriceAxis {
  private readonly canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  private minPrice: number;
  private maxPrice: number;
  private innerPrices: number[];
  private colorOptions: ColorOptions;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  public draw(minPrice, maxPrice) {
    this.setPrices(minPrice, maxPrice);

    const width = this.canvas.width;
    const height = this.canvas.height;
    const ctx = this.getCtx();
    ctx.strokeStyle = 'black';
    ctx.font = '12px sans-serif';
    ctx.textBaseline = 'middle';

    ctx.clearRect(0, 0, width, height);

    this.innerPrices.forEach((price) => {
      const priceY = Math.round(((price - minPrice) / (maxPrice - minPrice)) * height);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height - priceY);
      ctx.lineTo(10, height - priceY);
      ctx.stroke();
      ctx.fillText(`${price}`, 12, height - priceY);
      ctx.restore();
    });
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
}
