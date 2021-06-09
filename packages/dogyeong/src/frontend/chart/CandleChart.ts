import Graph, { GraphColorOptions } from '@/chart/Graph';
import PriceAxis from '@/chart/PriceAxis';
import TimeAxis, { AxisColorOptions } from '@/chart/TimeAxis';
import { createCanvas, crispPixel } from '@/chart/utils';
import { CandleChartData } from '../../backend/service/MarketService';
import Line, { LineColorOptions } from '@/chart/Line';

export interface CandleChartColorOptions extends GraphColorOptions, AxisColorOptions, LineColorOptions {}

export interface Candle {
  date: string;
  low: number;
  high: number;
  open: number;
  close: number;
  bodyX?: number;
  bodyY?: number;
  bodyW?: number;
  bodyH?: number;
  wickCenter?: number;
  wickTop?: number;
  wickBottom?: number;
}

interface CandleChartProps {
  $container: HTMLElement;
  colorOptions?: CandleChartColorOptions;
}

const defaultColors: CandleChartColorOptions = {
  bgColor: '#131722',
  redColor: '#26a69a',
  blueColor: '#ef5350',
  textColor: '#efefef',
  lineStrokeColor: '#26a69a',
  lineFillColor: '#3b5351',
  graphLineColor: '#333',
};

export default class CandleChart {
  private readonly $container: HTMLElement;
  private candles: Candle[];
  private minPrice: number;
  private maxPrice: number;
  private firstCandleIndex: number;
  private lastCandleIndex: number;
  private graph: Graph;
  private priceAxis: PriceAxis;
  private timeAxis: TimeAxis;
  private line: Line;

  constructor({ $container, colorOptions = defaultColors }: CandleChartProps) {
    this.$container = $container;
    this.minPrice = 0;
    this.maxPrice = 1000;

    const $table = this.createTable(colorOptions);
    const $graphContainer = $table.querySelector<HTMLElement>('tr td:first-child');
    const $priceAxisContainer = $table.querySelector<HTMLElement>('tr td:last-child');
    const $timeAxisContainer = $table.querySelector<HTMLElement>('tr:last-child td:first-child');

    $container.appendChild($table);

    const graphCanvas = createCanvas($graphContainer);

    this.graph = new Graph({ canvas: graphCanvas, colorOptions });
    this.priceAxis = new PriceAxis({ canvas: createCanvas($priceAxisContainer), colorOptions });
    this.timeAxis = new TimeAxis({ canvas: createCanvas($timeAxisContainer), colorOptions });
    this.line = new Line(graphCanvas, colorOptions);

    this.graph.subscribe(this.draw.bind(this));
    this.timeAxis.subscribe(this.line.drawLines.bind(this.line));
    this.priceAxis.subscribe(this.line.drawLines.bind(this.line));
  }

  private createTable({ bgColor }: CandleChartColorOptions) {
    const $table = document.createElement('table');

    $table.style.width = '100%';
    $table.style.height = '100%';
    $table.style.backgroundColor = bgColor;
    $table.innerHTML = `
      <tr>
        <td></td><td style="width: 88px;"></td>
      </tr>
      <tr style="height: 60px;">
        <td></td><td style="width: 88px;"></td>
      </tr>
    `;

    return $table;
  }

  // 보이는 첫 캔들의 인덱스를 구함
  private getFirstVisibleCandleIndex() {
    let firstIndex = -1;

    for (let i = this.candles.length - 1; i >= 0; i--) {
      const index = this.candles.length - i;
      const left = this.graph.getCandleBodyLeft(index);
      const right = this.graph.getCandleBodyRight(index);

      if (right < 0) return i + 1;
      if (left < this.graph.width) firstIndex = i;
    }
    return firstIndex;
  }

  // 보이는 마지막 캔들의 인덱스를 구함
  private getLastVisibleCandleIndex() {
    for (let i = this.candles.length - 1; i >= 0; i--) {
      const index = this.candles.length - i;
      const left = this.graph.getCandleBodyLeft(index);
      const right = this.graph.getCandleBodyRight(index);

      if (left < this.graph.width) return right > 0 ? i : -1;
    }
    return -1;
  }

  private calculateScale() {
    const firstCandleIndex = (this.firstCandleIndex = this.getFirstVisibleCandleIndex());
    const lastCandleIndex = (this.lastCandleIndex = this.getLastVisibleCandleIndex());

    // 차트가 화면에 보이지 않는 경우
    if (firstCandleIndex < 0) return;

    const [min, max] = this.candles
      .slice(firstCandleIndex, lastCandleIndex + 1)
      .reduce(([min, max], { low, high }) => [Math.min(min, low), Math.max(max, high)], [Infinity, 0]);

    // 위아래로 전체 가격범위의 25%만큼 여백을 만든다
    const spacing = Math.abs((max - min) * 0.25);

    this.minPrice = Math.max(min - spacing, 0);
    this.maxPrice = max + spacing;
  }

  private calculateCoordinates() {
    for (let i = this.candles.length - 1; i >= 0; i--) {
      const index = this.candles.length - 1 - i;
      const { open, close, high, low } = this.candles[i];

      // body
      const height = this.graph.height;
      const bodyTop = Math.max(open ?? close, close ?? open);
      const bodyBottom = Math.min(open ?? close, close ?? open);
      const bodyTopY = Math.round(((bodyTop - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
      const bodyBottomY = Math.round(((bodyBottom - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
      const bodyLeft = this.graph.getCandleBodyLeft(index);
      const bodyRight = this.graph.getCandleBodyRight(index);

      // wick
      const wickTop = Math.max(high, low);
      const wickBottom = Math.min(high, low);
      const wickTopY = Math.round(((wickTop - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
      const wickBottomY = Math.round(((wickBottom - this.minPrice) / (this.maxPrice - this.minPrice)) * height);
      const wickCenter = crispPixel(bodyLeft + this.graph.barWidth * 0.5);

      this.candles[i] = {
        ...this.candles[i],
        bodyX: bodyLeft,
        bodyY: height - bodyTopY,
        bodyW: bodyRight - bodyLeft,
        bodyH: bodyTopY - bodyBottomY,
        wickCenter,
        wickTop: height - wickTopY,
        wickBottom: height - wickBottomY,
      };
    }
  }

  public setCandles(candles: CandleChartData[]) {
    this.candles = candles.reverse();
    this.draw();
  }

  private draw() {
    this.calculateScale();
    this.calculateCoordinates();
    this.graph.clearBg();
    this.timeAxis.draw(this.candles, this.firstCandleIndex, this.lastCandleIndex);
    this.priceAxis.draw(this.minPrice, this.maxPrice);
    this.graph.draw(this.candles);
  }

  public toggleGraphType() {
    this.graph.toggleGraphType();
    this.draw();
  }
}
