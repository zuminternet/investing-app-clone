<template>
  <Layout>
    <Header>
      <HeaderTitle>
        <template #left>
          <HeaderButton @clickHeaderButton="back">🠔</HeaderButton>
        </template>
        <template #right>
          <RouterLink to="/search">&#128269;</RouterLink>
        </template>
        {{ name }}
      </HeaderTitle>
    </Header>
    <main>
      <section class="chart-section">
        <div ref="chartContainer" class="chart-container"></div>
        <div class="button-container">
          <button @click="changeChartPeriod('1d')">1일</button>
          <button @click="changeChartPeriod('1w')">1주</button>
          <button @click="changeChartPeriod('1m')">1달</button>
          <button @click="changeChartPeriod('1y')">1년</button>
          <button @click="changeChartPeriod('5y')">5년</button>
          <button @click="changeChartPeriod('max')">최대</button>
          <button class="chart-btn" @click="toggleGraphType">&#128480;</button>
        </div>
      </section>
      <section v-if="summaryDetail" class="summary-section">
        <h2>개요</h2>
        <table>
          <tbody>
            <tr>
              <td>일일 변동폭</td>
              <td>{{ summaryDetail.dayLow }} - {{ summaryDetail.dayHigh }}</td>
            </tr>
            <tr>
              <td>52주 가격변동폭</td>
              <td>{{ summaryDetail.fiftyTwoWeekLow }} - {{ summaryDetail.fiftyTwoWeekHigh }}</td>
            </tr>
            <tr>
              <td>총 시가</td>
              <td>{{ summaryDetail.marketCap }}</td>
            </tr>
            <tr>
              <td>매수가/매도가</td>
              <td>{{ summaryDetail.bid }}/{{ summaryDetail.ask }}</td>
            </tr>
            <tr>
              <td>거래량</td>
              <td>{{ summaryDetail.volume }}</td>
            </tr>
            <tr>
              <td>평균 거래량</td>
              <td>{{ summaryDetail.averageVolume }}</td>
            </tr>
            <tr>
              <td>이전 종가</td>
              <td>{{ summaryDetail.previousClose }}</td>
            </tr>
            <tr>
              <td>시가</td>
              <td>{{ summaryDetail.open }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <ArticleTemplate section-title="뉴스" :articles="news" url-prefix="/news/new" />
      <ArticleTemplate section-title="의견" :articles="opinions" url-prefix="/news/new" />
    </main>
    <BottomNav></BottomNav>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { getSummary, getChart } from '@/services/financeService';
import { getNewNews, getNewOpinions } from '@/services/articleService';
import Layout from '@/components/Layout/Layout.vue';
import { Header, HeaderTitle, HeaderButton } from '@/components/Header';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { createChart } from '@/chart';
// import ReplySection from 'common/frontend/components/ReplySection/index.vue';
import ArticleTemplate from '@/components/ArticleTemplate/ArticleTemplate.vue';

const chartLightThemeOption = {
  bgColor: '#fafffa',
  blueColor: 'blue',
  redColor: 'red',
  textColor: 'black',
  lineFillColor: '#f0f4ff',
  lineStrokeColor: '#84bbf3',
  graphLineColor: '#eee',
};

export default Vue.extend({
  name: 'MarketDetail',

  components: {
    Layout,
    Header,
    HeaderTitle,
    BottomNav,
    HeaderButton,
    ArticleTemplate,
    // ReplySection,
  },

  data() {
    return {
      summaryDetail: null,
      chartData: null,
      chart: null,
      name: '',
      news: null,
      opinions: null,
      symbol: '',
    };
  },

  watch: {
    chartData(newData) {
      if (!this.chart) return;
      this.chart.setCandles([...newData]);
    },
  },

  created() {
    this.symbol = this.$route.params.id;

    getSummary(this.symbol)
      .then((summaryDetail) => (this.summaryDetail = summaryDetail))
      .catch(console.error);

    getChart({ symbol: this.symbol, period: '1y' })
      .then((chart) => {
        this.chartData = chart.data;
        this.name = chart.display_name;
      })
      .catch(console.error);

    getNewNews({ tickers: this.symbol })
      .then((news) => (this.news = news))
      .catch(console.error);

    getNewOpinions({ tickers: this.symbol })
      .then((opinions) => (this.opinions = opinions))
      .catch(console.error);
  },

  mounted() {
    const colorOption = this.$store.state.isDarkTheme ? undefined : chartLightThemeOption;
    const chartContainer = this.$refs.chartContainer;
    chartContainer.style.height = chartContainer.offsetWidth / 1.5 + 'px';
    this.chart = createChart(chartContainer, colorOption);
  },

  methods: {
    back() {
      this.$router.back();
    },
    changeChartPeriod(period) {
      getChart({ symbol: this.symbol, period })
        .then((chart) => (this.chartData = chart.data))
        .catch(console.error);
    },
    toggleGraphType() {
      this.chart.toggleGraphType();
    },
  },
});
</script>

<style lang="scss">
.chart-section {
  margin-bottom: 60px;

  .chart-container {
    margin-bottom: 12px;
  }

  .button-container {
    padding: 0 12px;

    button {
      padding: 4px 6px;
      font-size: 15px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      margin-right: 4px;
      color: var(--text-color);

      &:hover {
        background-color: var(--border-color);
      }
    }
  }
}

.summary-section {
  padding: 0 12px;
  margin-bottom: 60px;

  h2 {
    margin-bottom: 8px;
  }

  table {
    width: 100%;

    tbody {
      tr {
        td {
          padding: 8px 0;
          font-weight: bold;
          font-size: 16px;

          &:first-child {
            padding-right: 8px;
            width: 30%;
            min-width: 160px;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
