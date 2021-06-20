<template>
  <div class="area">
    <!-- 상단 시세 요약 -->
    <Header v-bind="{ ...headerInfo }" />
    <PriceSummary v-bind="{ ...priceSummary }" />
    <Chart class="card" :typeName="`stock`" :apiType="`es`" :ticker="ticker" />

    <CompanyInfo v-bind="{ ...companyInfo }" />

    <!-- 뉴스 일부 표시 -->

    <ReplySection :ticker="ticker" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

import Chart from '@/components/molecules/Chart.vue';
import Header from '@/components/organisms/StockDetailHeader.vue';
import PriceSummary from '@/components/organisms/StockDetailPriceSummary.vue';
import CompanyInfo from '@/components/organisms/StockDetailCompanyInfo.vue';
import ReplySection from '@/components/organisms/ReplySection.vue';
import { StoreNames } from '@/store';

const { mapState } = createNamespacedHelpers(StoreNames.Market);
const phoneReplacer = (_phone: string) => {
  const phone = _phone.split('.')[0];
  const len = phone.length;
  /**
   * 10자리: 82 2 200 1114
   * 11자리_1: 82 31 200 1114
   * 11자리_2: 82 2 6100 2114
   * 12자리: 82 31 2000 1114
   */
  let phoneReg;
  if (len === 10) phoneReg = /(82)(\d{1})(\d{3})(\d{4})/;
  if (len === 11) phoneReg = phone[2] === '2' ? /(82)(\d{1})(\d{4})(\d{4})/ : /(82)(\d{2})(\d{3})(\d{4})/;
  if (len === 12) phoneReg = /(82)(\d{2})(\d{4})(\d{4})/;

  return phone.replace(phoneReg, (_, n1, n2, n3, n4) => `+${n1}) ` + [`0${n2}`, n3, n4].join('-'));
};
const adjMarketCap = (cap: number) =>
  cap > 1000000
    ? Math.floor(cap / 100)
        .toString()
        .replace(/(\d+)(\d{4})/, (_, n1, n2) => `${n1}조 ${Number(n2).toLocaleString()}억원`)
    : `${(cap / 100).toLocaleString()} 억원`;

export default Vue.extend({
  components: {
    Header,
    PriceSummary,
    Chart,
    CompanyInfo,
    ReplySection,
  },

  props: {
    /** router로 전달받음 */
    ticker: {
      type: String,
    },
  },

  data() {
    return {
      headerInfo: {},
      priceSummary: {},
      companyInfo: {},
    };
  },

  computed: {
    ...mapState(['stockOverviews', 'stockData']),

    tickerName() {
      return this.stockData[this.ticker].tickerName;
    },

    price() {
      return this.stockData[this.ticker].price;
    },

    volume() {
      return this.stockData[this.ticker].volume;
    },

    change() {
      return this.stockData[this.ticker].change;
    },
  },

  beforeMount() {
    const { ticker, tickerName, price, change, volume, stockOverviews } = this;
    const {
      metric: {
        metric,
        series: { annual },
      },
      peer,
      profile: { ipo, phone, weburl, marketCapitalization, logo, exchange },
    } = stockOverviews[ticker];

    const { epsGrowth3Y, pbAnnual, roeRfy, roiAnnual, dividendPerShareAnnual, dividendYieldIndicatedAnnual } = metric;
    const { eps } = annual;

    this.headerInfo = {
      logo,
      tickerName,
      price,
      volume,
      change,
    };

    this.priceSummary = {
      marketCapitalization: adjMarketCap(marketCapitalization),
      week52High: metric['52WeekHigh'].toLocaleString(),
      week52Low: metric['52WeekLow'].toLocaleString(),
    };

    this.companyInfo = {
      ipo,
      phone: phoneReplacer(phone),
      weburl,
      exchange,
      peer,
      eps: eps[0],
      epsGrowth3Y: epsGrowth3Y.toFixed(2),
      pbAnnual: pbAnnual.toFixed(2),
      roeRfy: roeRfy.toFixed(2),
      roiAnnual: roiAnnual.toFixed(2),
      dps: dividendPerShareAnnual.toLocaleString(),
      dpsRate: dividendYieldIndicatedAnnual.toFixed(2),
    };
  },
});
</script>

<style lang="scss" scoped>
main.area {
  display: grid;
  place-content: center;
}
</style>
