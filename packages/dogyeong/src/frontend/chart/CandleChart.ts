import Graph from '@/chart/Graph';
import PriceAxis from '@/chart/PriceAxis';
import { createCanvas } from '@/chart/utils';
import { CandleChartData } from '../../backend/service/MarketService';

export default class CandleChart {
  private minPrice: number;
  private maxPrice: number;
  private graph: Graph;
  private priceAxis: PriceAxis;

  constructor($container: HTMLElement) {
    this.minPrice = 0;
    this.maxPrice = 1000;

    const $table = document.createElement('table');

    $table.style.width = '100%';
    $table.style.height = '100%';
    $table.style.borderCollapse = 'collapse';
    $table.innerHTML = '<tbody><tr><td></td><td></td></tr></tbody>';

    const $graphContainer = $table.querySelector<HTMLElement>('tr td:first-child');
    const $priceAxisContainer = $table.querySelector<HTMLElement>('tr td:last-child');

    $priceAxisContainer.style.width = '100px';

    $container.appendChild($table);

    this.graph = new Graph(createCanvas($graphContainer));
    this.priceAxis = new PriceAxis(createCanvas($priceAxisContainer));

    this.graph.subscribe(this.draw.bind(this));
  }

  private caculatePriceScale() {
    // 보이는 첫 캔들 구함 (right > 0)
    // -1이면 차트가 화면 위에 없음
    const firstCandleIndex = this.graph.getFirstCandleIndex();

    // 보이는 마지막 캔들 구함 (left > width)
    // 인덱스가 음수면 차트 끝이 화면 안에 있음
    let lastCandleIndex = this.graph.getLastCandleIndex();

    // 차트가 화면 바깥에 있는 경우
    if (firstCandleIndex < 0) return;

    // 차트의 마지막 캔들이 화면 안에 있는 경우
    if (lastCandleIndex < 0) lastCandleIndex = this.graph.candles.length - 1;

    const [min, max] = this.graph.candles
      .slice(firstCandleIndex, lastCandleIndex + 1)
      .reduce(([min, max], { low, high }) => [Math.min(min, low), Math.max(max, high)], [Infinity, 0]);

    this.minPrice = Math.max(min - 100, 0);
    this.maxPrice = max + 100;
  }

  public setCandles(candles: CandleChartData[]) {
    this.graph.setCandles(candles);
    this.draw();
  }

  private draw() {
    this.caculatePriceScale();
    this.graph.draw(this.minPrice, this.maxPrice);
    this.priceAxis.draw(this.minPrice, this.maxPrice);
  }
}
