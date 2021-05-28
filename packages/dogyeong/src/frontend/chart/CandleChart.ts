import Graph from '@/chart/Graph';
import PriceAxis from '@/chart/PriceAxis';
import TimeAxis from '@/chart/TimeAxis';
import { createCanvas } from '@/chart/utils';
import { CandleChartData } from '../../backend/service/MarketService';

export default class CandleChart {
  private readonly $container: HTMLElement;
  private candles: any[];
  private minPrice: number;
  private maxPrice: number;
  private minTime: number;
  private maxTime: number;
  private graph: Graph;
  private priceAxis: PriceAxis;
  private timeAxis: TimeAxis;

  constructor($container: HTMLElement) {
    this.$container = $container;
    this.minPrice = 0;
    this.maxPrice = 1000;

    const $table = this.createTable();
    const $graphContainer = $table.querySelector<HTMLElement>('tr td:first-child');
    const $priceAxisContainer = $table.querySelector<HTMLElement>('tr td:last-child');
    const $timeAxisContainer = $table.querySelector<HTMLElement>('tr:last-child td:first-child');

    $container.appendChild($table);

    this.graph = new Graph(createCanvas($graphContainer));
    this.priceAxis = new PriceAxis(createCanvas($priceAxisContainer));
    this.timeAxis = new TimeAxis(createCanvas($timeAxisContainer));

    this.graph.subscribe(this.draw.bind(this));
  }

  private createTable() {
    const $table = document.createElement('table');

    $table.style.width = '100%';
    $table.style.height = '100%';
    $table.innerHTML = `
      <tr>
        <td></td><td style="width: 100px;"></td>
      </tr>
      <tr style="height: 80px;">
        <td></td><td style="width: 100px;"></td>
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

  private caculateScale() {
    const firstCandleIndex = this.getFirstVisibleCandleIndex();
    const lastCandleIndex = this.getLastVisibleCandleIndex();

    // 차트가 화면에 보이지 않는 경우
    if (firstCandleIndex < 0) return;

    const [min, max] = this.candles
      .slice(firstCandleIndex, lastCandleIndex + 1)
      .reduce(([min, max], { low, high }) => [Math.min(min, low), Math.max(max, high)], [Infinity, 0]);

    // 위아래로 전체 가격범위의 25%만큼 여백을 만든다
    const spacing = Math.abs((max - min) * 0.25);

    this.minPrice = Math.max(min - spacing, 0);
    this.maxPrice = max + spacing;
    this.minTime = this.candles[firstCandleIndex]?.date ?? this.minTime;
    this.maxTime = this.candles[lastCandleIndex]?.date ?? this.maxTime;
  }

  public setCandles(candles: CandleChartData[]) {
    this.candles = candles.reverse();
    this.draw();
  }

  private draw() {
    this.caculateScale();
    this.graph.draw(this.candles, this.minPrice, this.maxPrice);
    this.priceAxis.draw(this.minPrice, this.maxPrice);
    this.timeAxis.draw(this.minTime, this.maxTime);
  }
}
