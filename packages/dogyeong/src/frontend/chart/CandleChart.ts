import Graph from '@/chart/Graph';
import PriceAxis from '@/chart/PriceAxis';
import TimeAxis from '@/chart/TimeAxis';
import { createCanvas } from '@/chart/utils';
import { CandleChartData } from '../../backend/service/MarketService';

export default class CandleChart {
  private readonly $container: HTMLElement;
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

    const $graphContainer = $table.querySelector<HTMLElement>('tr td:first-child');
    const $priceAxisContainer = $table.querySelector<HTMLElement>('tr td:last-child');
    const $timeAxisContainer = $table.querySelector<HTMLElement>('tr:last-child td:first-child');

    $container.appendChild($table);

    console.log($graphContainer.getBoundingClientRect());

    this.graph = new Graph(createCanvas($graphContainer));
    this.priceAxis = new PriceAxis(createCanvas($priceAxisContainer));
    this.timeAxis = new TimeAxis(createCanvas($timeAxisContainer));

    this.graph.subscribe(this.draw.bind(this));
  }

  private caculateScale() {
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

    // 위아래로 전체 가격범위의 25%만큼 여백을 만든다
    const spacing = Math.abs((max - min) * 0.25);

    this.minPrice = Math.max(min - spacing, 0);
    this.maxPrice = max + spacing;
    this.minTime = this.graph.getCandle(firstCandleIndex).date;
    this.maxTime = this.graph.getCandle(lastCandleIndex).date;
  }

  public setCandles(candles: CandleChartData[]) {
    this.graph.setCandles(candles);
    this.draw();
  }

  private draw() {
    this.caculateScale();
    this.graph.draw(this.minPrice, this.maxPrice);
    this.priceAxis.draw(this.minPrice, this.maxPrice);
    this.timeAxis.draw(this.minTime, this.maxTime);
  }
}
