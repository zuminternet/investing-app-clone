<template>
  <div class="chart-container">
    <loading v-if="isLoading" :loadingHeight="348" />

    <div v-show="!isLoading">
      <div>
        <canvas ref="graph" :width="canvasWidth" :height="canvasHeight"></canvas>
        <y-axis
          :valueData="valueData"
          :graphBoxHeight="graphBoxHeight"
          :canvasHeight="canvasHeight"
          :canvasWidth="yAxisWidth"
          :floorValue="floorValue"
          :graphBoxMargin="graphBoxMargin"
          :currentValue="currentValue"
          :currentHeight="currentHeight"
          :selectedHeight="selectedHeight"
          :selectedValue="selectedValue"
          :isDarkTheme="isDarkTheme"
        ></y-axis>
      </div>

      <x-axis
        :timeData="timeData"
        :unitWidth="unitWidth"
        :startIndex="startIndex"
        :graphBoxMargin="graphBoxMargin"
        :canvasWidth="canvasWidth + yAxisWidth"
        :isDarkTheme="isDarkTheme"
        :selectedDate="selectedDate"
        :selectedIndex="selectedIndex"
      ></x-axis>
      <chart-menu
        :canvasWidth="canvasWidth + yAxisWidth"
        :isDarkTheme="isDarkTheme"
        :isCandle="isCandle"
        :period="period"
        @handle-chart-menu-button-click="handleChartMenuButtonClick"
      />
    </div>
  </div>
</template>

<script>
import XAxis from './XAxis.vue';
import YAxis from './YAxis.vue';
import ChartMenu from './ChartMenu.vue';
import Loading from '../components/Loading.vue';

import { getHistoricalData } from '../apis';

export default {
  name: 'Chart',
  components: {
    XAxis,
    YAxis,
    ChartMenu,
    Loading,
  },

  props: {
    canvasWidth: {
      type: Number,
      required: true,
    },

    canvasHeight: {
      type: Number,
      required: true,
    },

    symbol: {
      type: String,
      required: true,
    },

    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      ctx: null,
      graphBoxMargin: 10,
      yAxisWidth: 40,
      unitHeight: null,
      currentHeight: 0,

      data: [],
      baseStartIndex: 0,
      baseEndIndex: null,
      targetStartIndex: null,
      targetEndIndex: null,
      startIndex: null,
      selectedIndex: null,
      selectedValue: null,
      selectedDate: null,
      endIndex: null,
      timeData: [],
      valueData: [],
      tpCache: [],
      isCandle: true,
      period: 'd',
      isLoading: false,
    };
  },

  computed: {
    graphBoxColor() {
      return this.isDarkTheme ? 'white' : 'green';
    },

    graphColor() {
      return this.isDarkTheme ? 'white' : 'green';
    },

    graphBoxWidth() {
      return this.canvasWidth - 2 * this.graphBoxMargin;
    },

    graphBoxHeight() {
      return this.canvasHeight - 2 * this.graphBoxMargin;
    },

    ceilValue() {
      return this.getCeilAndFloorValue().ceilValue;
    },

    floorValue() {
      return this.getCeilAndFloorValue().floorValue;
    },

    unitWidth() {
      return this.graphBoxWidth / (this.endIndex - this.startIndex);
    },

    heightRatio() {
      return this.graphBoxHeight / (this.ceilValue - this.floorValue);
    },

    currentValue() {
      if (this.endIndex !== null && this.endIndex < this.data.length) {
        return this.data[this.endIndex].close;
      }

      return 0;
    },

    selectedHeight() {
      return this.graphBoxMargin + this.graphBoxHeight - (this.selectedValue - this.floorValue) * this.heightRatio;
    },
  },

  methods: {
    getCeilAndFloorValue() {
      let ceilValue = Number.MIN_VALUE;
      let floorValue = Number.MAX_VALUE;

      for (let i = 0; i < this.data.length; i++) {
        let { close: value } = this.data[i];

        ceilValue = Math.max(ceilValue, value);
        floorValue = Math.min(floorValue, value);
      }

      const diff = ceilValue - floorValue;
      ceilValue = ceilValue + 5 * 10 ** (parseInt(Math.log10(diff)) - 1);
      floorValue = floorValue - 5 * 10 ** (parseInt(Math.log10(diff)) - 1);

      if (floorValue < 0) {
        floorValue = 0;
      }

      return { ceilValue, floorValue };
    },

    setIsloading(isLoading) {
      this.isLoading = isLoading;
    },

    drawGraph() {
      this.ctx.strokeStyle = this.graphColor;
      this.ctx.beginPath();

      let interval = Math.floor((this.endIndex - this.startIndex) / 7);

      if (interval === 1) {
        interval = 2;
      } else if (interval === 0) {
        interval = 1;
      }

      if (this.isCandle && this.data.length) {
        for (let i = this.startIndex; i < this.endIndex + 1; i++) {
          const { date: time, close, open, high, low } = this.data[i];

          this.unitHeight = this.graphBoxMargin + this.graphBoxHeight - (close - this.floorValue) * this.heightRatio;
          let unitOpen = this.graphBoxMargin + this.graphBoxHeight - (open - this.floorValue) * this.heightRatio;
          let unitHigh = this.graphBoxMargin + this.graphBoxHeight - (high - this.floorValue) * this.heightRatio;
          let unitLow = this.graphBoxMargin + this.graphBoxHeight - (low - this.floorValue) * this.heightRatio;

          this.ctx.beginPath();
          this.ctx.moveTo(this.graphBoxMargin + this.unitWidth * (i - this.startIndex), unitHigh);
          this.ctx.lineTo(this.graphBoxMargin + this.unitWidth * (i - this.startIndex), unitLow);
          this.ctx.closePath();
          this.ctx.stroke();

          this.ctx.fillStyle = close >= open ? 'red' : 'blue';
          this.ctx.strokeStyle = close >= open ? 'red' : 'blue';

          let candleWidth;

          if (this.period === 'd') candleWidth = 4;

          if (this.period === 'w') candleWidth = 3;

          if (this.period === 'm') candleWidth = 3;

          this.ctx.fillRect(
            this.graphBoxMargin + this.unitWidth * (i - this.startIndex) - candleWidth / 2,
            this.unitHeight,
            candleWidth,
            Math.abs(this.unitHeight - unitOpen),
          );

          this.ctx.strokeStyle = this.graphColor;

          if (i % interval === 0) {
            this.timeData.push([time, i]);
          }
        }
      }

      if (!this.isCandle && this.data.length) {
        for (let i = this.startIndex; i < this.endIndex + 1; i++) {
          const { date: time, close: value } = this.data[i];

          this.unitHeight = this.graphBoxMargin + this.graphBoxHeight - (value - this.floorValue) * this.heightRatio;

          this.ctx.lineTo(this.graphBoxMargin + this.unitWidth * (i - this.startIndex), this.unitHeight);

          if (i % interval === 0) {
            this.timeData.push([time, i]);
          }
        }
      }

      this.ctx.stroke();

      this.drawCurrentLine(this.unitHeight);
      this.currentHeight = this.unitHeight;

      const quintile = (this.ceilValue - this.floorValue) / 5;

      for (let i = 5; i > 0; i--) {
        this.valueData.push(quintile * i);

        if (i !== 5) {
          this.drawQuintileLine(i);
        }
      }
    },

    drawQuintileLine(index) {
      this.ctx.globalAlpha = 0.2;

      this.ctx.beginPath();
      this.ctx.moveTo(this.graphBoxMargin, this.graphBoxMargin + (this.graphBoxHeight / 5) * index + 4);
      this.ctx.lineTo(this.graphBoxMargin + this.graphBoxWidth, this.graphBoxMargin + (this.graphBoxHeight / 5) * index + 4);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.globalAlpha = 1.0;
    },

    drawCurrentLine(currentHeight) {
      this.ctx.globalAlpha = 0.6;

      this.ctx.setLineDash([10, 20]);
      this.ctx.beginPath();
      this.ctx.moveTo(this.graphBoxMargin, currentHeight);
      this.ctx.lineTo(this.graphBoxMargin + this.graphBoxWidth, currentHeight);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.setLineDash([]);

      this.ctx.globalAlpha = 1.0;
    },

    drawVerticalLines() {
      this.ctx.globalAlpha = 0.2;

      for (let i = 0; i < this.timeData.length; i++) {
        let index = this.timeData[i][1];
        this.ctx.beginPath();
        this.ctx.moveTo(this.graphBoxMargin + this.unitWidth * (index - this.startIndex), this.graphBoxMargin);
        this.ctx.lineTo(
          this.graphBoxMargin + this.unitWidth * (index - this.startIndex),
          this.graphBoxMargin + this.graphBoxHeight,
        );
        this.ctx.closePath();
        this.ctx.stroke();
      }

      this.ctx.globalAlpha = 1.0;
    },
    drawSelectedLine() {
      if (this.selectedIndex !== null) {
        // X 축
        this.ctx.beginPath();
        this.ctx.moveTo(this.graphBoxMargin, this.selectedHeight);
        this.ctx.lineTo(this.graphBoxMargin + this.graphBoxWidth, this.selectedHeight);
        this.ctx.closePath();
        this.ctx.stroke();

        // Y 축
        this.ctx.beginPath();
        this.ctx.moveTo(this.graphBoxMargin + this.unitWidth * (this.selectedIndex - this.startIndex), this.graphBoxMargin);
        this.ctx.lineTo(
          this.graphBoxMargin + this.unitWidth * (this.selectedIndex - this.startIndex),
          this.graphBoxMargin + this.graphBoxHeight,
        );
        this.ctx.closePath();
        this.ctx.stroke();
      }
    },

    touchStartHandler(event) {
      event.preventDefault();
      console.log('start');

      const touches = event.targetTouches;
      this.tpCache = [];

      for (let i = 0; i < touches.length; i++) {
        this.tpCache.push(touches[i]);
      }

      if (event.targetTouches.length === 1) {
        this.selectedIndex =
          this.startIndex + Math.round((event.targetTouches[0].clientX - this.graphBoxMargin) / this.unitWidth) - 1;

        this.selectedValue = this.data[this.selectedIndex].close;
        this.selectedDate = this.data[this.selectedIndex].date;
      } else if (event.targetTouches.length === 2) {
        this.selectedIndex = null;

        const pointIndex1 = Math.round((touches[0].clientX - this.graphBoxMargin) / this.unitWidth);
        const pointIndex2 = Math.round((touches[1].clientX - this.graphBoxMargin) / this.unitWidth);

        this.targetStartIndex = Math.min(pointIndex1, pointIndex2) + this.startIndex;
        this.targetEndIndex = Math.max(pointIndex1, pointIndex2) + this.startIndex;
      }
    },

    touchMoveHandler(event) {
      event.preventDefault();

      this.handlePinchZoom(event);
    },

    touchEndhandler(event) {
      event.preventDefault();

      if (event.targetTouches.length === 0) {
        console.log('touch end');

        this.baseStartIndex = this.startIndex;
        this.baseEndIndex = this.endIndex;
        this.targetStartIndex = null;
        this.targetEndIndex = null;
        this.tpCache = [];
      }
    },

    handlePinchZoom(event) {
      if (event.targetTouches.length === 2 && event.changedTouches.length === 2) {
        let leftBasePointClientX = -1;
        let rightBasePointClientX = -1;
        let leftBasePoint = -1;
        let rightBasePoint = -1;

        for (let i = 0; i < this.tpCache.length; i++) {
          if (this.tpCache[i].identifier === event.targetTouches[0].identifier) {
            leftBasePoint = i;
            leftBasePointClientX = this.tpCache[i].clientX;
          }

          if (this.tpCache[i].identifier === event.targetTouches[1].identifier) {
            rightBasePoint = i;
            rightBasePointClientX = this.tpCache[i].clientX;
          }
        }

        if (leftBasePointClientX > rightBasePointClientX) {
          const tempPoint = leftBasePoint;
          leftBasePoint = rightBasePoint;
          rightBasePoint = tempPoint;
        }

        if (leftBasePoint >= 0 && rightBasePoint >= 0) {
          const leftDiff = this.tpCache[leftBasePoint].clientX - event.targetTouches[leftBasePoint].clientX;

          const rightDiff = this.tpCache[rightBasePoint].clientX - event.targetTouches[rightBasePoint].clientX;

          const totalDiff = Math.abs(leftDiff) + Math.abs(rightDiff);
          const diffIndex = Math.round(totalDiff / 20);

          if (leftDiff > 0 && rightDiff < 0 && this.endIndex - this.startIndex > 5) {
            if (this.startIndex < this.targetStartIndex) {
              if (this.baseStartIndex + diffIndex > this.targetStartIndex) {
                this.startIndex = this.targetStartIndex;
              } else {
                this.startIndex = this.baseStartIndex + diffIndex;
              }
            }

            if (this.endIndex > this.targetEndIndex) {
              if (this.baseEndIndex - diffIndex < this.targetEndIndex) {
                this.endIndex = this.targetEndIndex;
              } else {
                this.endIndex = this.baseEndIndex - diffIndex;
              }
            }
          } else if (leftDiff < 0 && rightDiff > 0) {
            if (this.startIndex > 0) {
              if (this.baseStartIndex - diffIndex < 0) {
                this.startIndex = 0;
              } else {
                this.startIndex = this.baseStartIndex - diffIndex;
              }
            }

            if (this.endIndex < this.data.length - 1) {
              if (this.baseEndIndex + diffIndex > this.data.length - 1) {
                this.endIndex = this.data.length - 1;
              } else {
                this.endIndex = this.baseEndIndex + diffIndex;
              }
            }
          }
        }
      } else if (event.targetTouches.length === 1 && event.changedTouches.length === 1) {
        const diff = this.tpCache[0].clientX - event.targetTouches[0].clientX;
        const diffIndex = Math.round(Math.abs(diff) / 20);

        if (diff > 0 && this.baseEndIndex + diffIndex <= this.data.length - 1) {
          this.startIndex = this.baseStartIndex + diffIndex;
          this.endIndex =
            this.baseEndIndex + diffIndex > this.data.length - 1 ? this.data.length - 1 : this.baseEndIndex + diffIndex;
        }

        if (diff < 0 && this.baseStartIndex - diffIndex >= 0) {
          this.startIndex = this.baseStartIndex - diffIndex < 0 ? 0 : this.baseStartIndex - diffIndex;
          this.endIndex = this.baseEndIndex - diffIndex;
        }
      }
    },

    handleChartMenuButtonClick(event) {
      const { value } = event.target.value ? event.target : event.path[1];

      if (value === 'Linear') {
        this.isCandle = false;
      } else if (value === 'Candle') {
        this.isCandle = true;
      } else {
        this.period = value;
      }
    },

    redrawChart() {
      this.unitHeight = null;
      this.timeData = [];
      this.valueData = [];

      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.drawGraph();
      this.drawVerticalLines();

      this.$refs.graph.ontouchstart = this.touchStartHandler;
      this.$refs.graph.ontouchmove = this.touchMoveHandler;
      this.$refs.graph.ontocuhcancel = this.touchEndhandler;
      this.$refs.graph.ontouchend = this.touchEndhandler;

      this.drawSelectedLine();
    },

    getFromAndTo(period, isCandle) {
      const today = new Date();
      let from = null;
      let to = null;
      let diff;

      if (period === 'd') {
        diff = isCandle ? 5184000000 : 20736000000;
      }

      if (period === 'w') {
        diff = isCandle ? 62208000000 : 124416000000;
      }

      if (period === 'm') {
        diff = isCandle ? 248832000000 : 497664000000;
      }

      const fromDay = new Date();
      fromDay.setTime(today.getTime() - diff);
      from = `${fromDay.getFullYear()}`;

      from += fromDay.getMonth() + 1 >= 10 ? `-${fromDay.getMonth() + 1}` : `-0${fromDay.getMonth() + 1}`;
      from += fromDay.getDate() >= 10 ? `-${fromDay.getDate()}` : `-0${fromDay.getDate()}`;

      to = `${today.getFullYear()}`;

      to += today.getMonth() + 1 >= 10 ? `-${today.getMonth() + 1}` : `-0${today.getMonth() + 1}`;
      to += today.getDate() >= 10 ? `-${today.getDate()}` : `-0${today.getDate()}`;

      console.log(from);
      console.log(to);

      return { from, to };
    },

    async getHistoricalDataForPeriod(period, isCandle) {
      const { from, to } = this.getFromAndTo(period, isCandle);
      this.data = await getHistoricalData({ symbol: this.symbol, from, to, period });
      this.data.reverse();
      this.data = this.addRandom(this.data);
    },

    createRandom() {
      return (Math.random() > 0.5 ? 2 : -2) * Math.random();
    },

    addRandom(data) {
      const random = this.createRandom();
      const endData = data[data.length - 1];

      data.push({ ...endData, close: endData.close + random });

      return data;
    },
  },

  watch: {
    startIndex() {
      this.redrawChart();
    },

    isCandle() {
      this.redrawChart();
    },

    selectedIndex() {
      this.redrawChart();
    },

    data() {
      if (this.afterDataFetch) {
        this.redrawChart();
      }
    },

    async period() {
      this.afterDataFetch = false;

      if (this.intervalForHistoricalData) {
        clearInterval(this.intervalForHistoricalData);
      }

      this.setIsloading(true);
      await this.getHistoricalDataForPeriod(this.period, this.isCandle);
      this.setIsloading(false);

      const fetcher = this.getHistoricalDataForPeriod.bind(this, this.period, this.isCandle);
      this.intervalForHistoricalData = setInterval(fetcher, 2675);

      this.endIndex = this.data.length - 1;
      this.startIndex = 0;

      this.redrawChart();
      this.selectedIndex = null;
      this.selectedValue = null;
      this.selectedDate = null;

      this.afterDataFetch = true;
    },

    async isCandle() {
      this.afterDataFetch = false;

      if (this.intervalForHistoricalData) {
        clearInterval(this.intervalForHistoricalData);
      }

      this.setIsloading(true);
      await this.getHistoricalDataForPeriod(this.period, this.isCandle);
      this.setIsloading(false);

      const fetcher = this.getHistoricalDataForPeriod.bind(this, this.period, this.isCandle);
      this.intervalForHistoricalData = setInterval(fetcher, 2675);

      this.endIndex = this.data.length - 1;
      this.startIndex = 0;

      this.redrawChart();
      this.selectedIndex = null;
      this.selectedValue = null;
      this.selectedDate = null;

      this.afterDataFetch = true;
    },
  },

  async mounted() {
    this.setIsloading(true);
    await this.getHistoricalDataForPeriod(this.period, this.isCandle);
    this.setIsloading(false);

    this.ctx = this.$refs.graph.getContext('2d');

    const fetcher = this.getHistoricalDataForPeriod.bind(this, this.period, this.isCandle);
    this.intervalForHistoricalData = setInterval(fetcher, 2675);

    this.endIndex = this.data.length - 1;
    this.startIndex = 0;

    this.baseStartIndex = 0;
    this.baseEndIndex = this.data.length - 1;

    this.drawGraph();
    this.drawVerticalLines();

    this.$refs.graph.ontouchstart = this.touchStartHandler;
    this.$refs.graph.ontouchmove = this.touchMoveHandler;
    this.$refs.graph.ontocuhcancel = this.touchEndhandler;
    this.$refs.graph.ontouchend = this.touchEndhandler;

    this.afterDataFetch = true;
  },

  beforeDestroy() {
    if (this.intervalForHistoricalData) {
      clearInterval(this.intervalForHistoricalData);
    }
  },
};
</script>

<style>
.chart-container {
  margin: 10px;
}
</style>
