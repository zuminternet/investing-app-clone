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
      <section ref="chartContainer" class="chart-container"></section>
      <section v-if="summaryDetail">
        <h3>개요</h3>
        <p>금일 저가 {{ summaryDetail.dayLow }}</p>
        <p>금일 고가 {{ summaryDetail.dayHigh }}</p>
        <p>금일 시가 {{ summaryDetail.open }}</p>
        <p>52주 최고가 {{ summaryDetail.fiftyTwoWeekLow }}</p>
        <p>52주 최저가 {{ summaryDetail.fiftyTwoWeekHigh }}</p>
      </section>
      <div>
        <NewsTemplate v-if="news" :news="news" :opinions="opinions" url-prefix="/news/new" />
      </div>
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
import NewsTemplate from '@/components/NewsTemplate/NewsTemplate.vue';
// import ReplySection from 'common/frontend/components/ReplySection/index.vue';

const chartLightThemeOption = {
  bgColor: '#fafffa',
  blueColor: 'blue',
  redColor: 'red',
  textColor: 'black',
};

export default Vue.extend({
  name: 'MarketDetail',

  components: {
    Layout,
    Header,
    HeaderTitle,
    BottomNav,
    HeaderButton,
    NewsTemplate,
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

    getChart(this.symbol)
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
  },
});
</script>

<style lang="scss" scoped></style>
