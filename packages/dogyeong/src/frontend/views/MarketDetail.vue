<template>
  <Layout>
    <Header>
      <HeaderTitle>시장</HeaderTitle>
      <HeaderNav>
        <HeaderNavItem v-for="route in navRoutes" :key="route.id" :active="route.id === currentNavId">
          {{ route.title }}
        </HeaderNavItem>
      </HeaderNav>
    </Header>
    <main>
      <section class="chart-container" ref="chartContainer"></section>
      <section v-if="summaryDetail">
        <p>금일 저가 {{ summaryDetail.dayLow }}</p>
        <p>금일 고가 {{ summaryDetail.dayHigh }}</p>
        <p>금일 시가 {{ summaryDetail.open }}</p>
        <p>52주 최고가 {{ summaryDetail.fiftyTwoWeekLow }}</p>
        <p>52주 최저가 {{ summaryDetail.fiftyTwoWeekHigh }}</p>
      </section>
    </main>
    <BottomNav></BottomNav>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { getSummary, getChart } from '@/services/financeService';
import Layout from '@/components/Layout/Layout.vue';
import { Header, HeaderTitle, HeaderNav, HeaderNavItem } from '@/components/Header';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import { createChart } from '@/chart';

const chartLightThemeOption = {
  bgColor: 'white',
  blueColor: 'blue',
  redColor: 'red',
  textColor: 'black',
};

export default Vue.extend({
  name: 'MarketDetail',

  data() {
    return {
      summaryDetail: null,
      chartData: null,
      chart: null,
      navRoutes: [
        { id: 'summary', title: '개요', index: 0 },
        { id: 'news', title: '뉴스', index: 1 },
      ],
      currentNavId: 'summary',
    };
  },

  components: { Layout, Header, HeaderTitle, HeaderNav, HeaderNavItem, BottomNav },

  created() {
    getSummary()
      .then(({ summaryDetail }) => (this.summaryDetail = summaryDetail))
      .catch(console.error);
    getChart()
      .then(({ chart }) => (this.chartData = chart))
      .catch(console.error);
  },

  mounted() {
    const colorOption = this.$store.state.isDarkTheme ? undefined : chartLightThemeOption;
    const chartContainer = this.$refs.chartContainer;
    chartContainer.style.height = chartContainer.offsetWidth / 1.5 + 'px';
    this.chart = createChart(chartContainer, colorOption);
  },

  watch: {
    chartData(newData) {
      if (!this.chart) return;
      this.chart.setCandles([...newData]);
    },
  },
});
</script>

<style lang="scss" scoped></style>
